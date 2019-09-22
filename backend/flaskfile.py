#!flask/bin/python
from flask import Flask, request, jsonify
from pymongo import MongoClient
import requests
import json

with open("keys.json", "r") as file:
    data = json.load(file)
    uname = data['UNAME']
    pw = data['PWORD']
    key = data['api_key']

app = Flask(__name__)
client = MongoClient(
    "mongodb+srv://{}:{}@sunhackscluster-ijexw.gcp.mongodb.net/test?retryWrites=true&w=majority".format(uname, pw))
cities_db = client.NewCitiesDB
cities_collection = cities_db.newCities


@app.route('/score', methods=['GET'])
def do_everything():
    """
    Workflow:
    Unpack all params -> Get the location from coordinates -> Get DB value from location -> Use counts, survey values,
    and DB data to find overall score for the user -> Return the DB record alongside their received score.
    :return: Dictionary, hopefully.
    """
    # Unpack all values into memory
    arguments = request.args.items()
    dict_to_query = {}
    for arg in arguments:
        dict_to_query[arg[0]] = arg[1]
    lat = dict_to_query['lat']
    lon = dict_to_query['lon']
    job = dict_to_query['job']
    salary_opinion = float(dict_to_query['salary'])
    weather_opinion = float(dict_to_query['weather'])
    kids_opinion = int(dict_to_query['kids'])
    outdoors_opinion = int(dict_to_query['outdoors'])
    population_opinion = int(dict_to_query['population'])
    num_schools = float(dict_to_query['num_schools'])
    num_parks = float(dict_to_query['num_parks'])

    do_i_give_a_shit = {"salary": salary_opinion,
                        "weather": weather_opinion,
                        "kids": kids_opinion,
                        "outdoors": outdoors_opinion,
                        "population": population_opinion}

    # Get the weight of each category based on "care" values
    scores = care_score(do_i_give_a_shit)

    # Get the record from the DB based on closest location
    record = get_record(lat, lon)
    city_name = record['city']
    state_id = record['state_id']
    city_population = int(record['population']['numberDouble'])
    city_col = float(record['Cost of Living Index']['numberDouble'])
    city_temp = float(record["Max Temps"]['Annual'])
    city_density = float(record['density']['numberDouble'])
    city_school_rank = [float(record['Collegiate School Rank']["numberInt"]), float(record['Pre-K Rank']["numberInt"]), float(record['Total School Rank']["numberInt"])]

    # Find each score for the user
    outdoor_score = process_outdoor_score(scores['outdoors'], num_parks, outdoors_opinion)
    salary_score = process_salary_score(scores['salary'], salary_opinion, city_col)
    temperature_score = process_temperature_score(scores['temperature'], weather_opinion, city_temp)
    kids_score = process_kids_score(scores['kids'], kids_opinion, num_schools, city_school_rank)
    size_score = process_size_score(scores['population'], population_opinion, city_population, city_density)
    location_score, grade = process_all_scores(outdoor_score, salary_score, temperature_score, kids_score, size_score)

    dictionary_to_return = {"total_score": location_score,
                            "grade": grade,
                            "map_lat": lat,
                            "map_lng": lon,
                            "population": city_population,
                            "density": city_density,
                            "city_name": city_name,
                            "state_id": state_id,
                            "cost_of_living": city_col,
                            "total_school_rank": city_school_rank[2],
                            "average_weather": city_temp}
    return dictionary_to_return


def care_score(res: dict):
    """
    Zach's function calculating score weights for each category.
    :return: A dictionary containing each category and it's weight.
    """
    score_weights = {}
    outdoors_flag = False
    size_flag = False
    kids_flag = False
    count = 2

    if res['outdoors'] != 0:
        count += 1
        outdoors_flag = True
    if res['population'] != 2:
        count += 1
        size_flag = True
    if res['kids'] != 0:
        count += 1
        kids_flag = True

    weight = 100 / count
    score_weights['outdoors'] = weight if outdoors_flag else 0
    score_weights['salary'] = weight
    score_weights['temperature'] = weight
    score_weights['kids'] = weight if kids_flag else 0
    score_weights['population'] = weight if size_flag else 0

    return score_weights


def get_record(lat, lon):
    """
    This will take a latitude and longitude, and return the DB record associated with that city location.
    :param: A latitude and a longitude.
    :return: A DB value for the nearest town.
    """

    # Make the API call
    params = {"apiKey": "{}".format(key), "lat": lat, "lon": lon, "version": 4.10}
    r = requests.get(url="https://geoservices.tamu.edu/Services/ReverseGeocoding/WebService/v04_01/Rest", params=params)
    db_record = cities_collection.find_one({'city': r.text.split(",")[6]})
    return db_record


def process_outdoor_score(outdoor_care_score, num_parks, outdoors_opinion):
    """
    If we care about the outdoors, we should set thresholds for what is "good", or a 50% score of the weight, based on
    the number of parks nearby. We assume they care about the score.
    Let's say that 3 parks is a "good" outdoor score. An "Excellent" score of 100% of the weight is 6+ parks. So, we
    should scale things to 6.
    :param outdoor_care_score: Weight to scale result to
    :param num_parks:
    :param outdoors_opinion:
    :return:
    """
    if outdoor_care_score != 0:
        score = (num_parks * outdoor_care_score) / 6
        if score > outdoor_care_score:
            return outdoor_care_score
        else:
            return score
    return 0


def process_salary_score(salary_care_score, salary_opinion, city_col):
    """
    For salary, we should have a 50% score if the salary opinion is the same as the CoL. So, if our ratio is somewhere
    near 2.0, we should approach a perfect score.
    :param salary_care_score: Weight to scale result to
    :param salary:
    :return:
    """
    salary_opinion = salary_opinion / 1000  # Scale this down to the same as the CoL
    if salary_care_score != 0:
        ratio = salary_opinion / city_col

        if ratio == 1:
            # 50% score, right at the cost of living.
            return salary_care_score / 2
        elif ratio >= 2:
            return salary_care_score
        elif ratio > 1:
            return ((((ratio - 1) * 50) + 50) * salary_care_score) / 100
        elif ratio < 1:
            return ((ratio * 50) * salary_care_score) / 100
    return 0


def process_temperature_score(temperature_care_score, weather_opinion, city_temp):
    """
    If the average is +- 2.5 degrees, score 100%. If +- 5, score 75%. +- 10, 50%. +-15, 25%. Otherwise, If way out of
    that range, score 0.
    :param temperature_care_score: Weight to scale result to
    :param weather:
    :return:
    """
    if temperature_care_score != 0:
        if weather_opinion - 3.5 <= city_temp <= weather_opinion + 3.5:
            return temperature_care_score
        elif weather_opinion - 7 <= city_temp <= weather_opinion + 7:
            return (temperature_care_score * 75) / 100
        elif weather_opinion - 12.0 <= city_temp <= weather_opinion + 12.0:
            return temperature_care_score / 2
        elif weather_opinion - 15.0 <= city_temp <= weather_opinion + 15.0:
            return (temperature_care_score * 25) / 100
        else:
            return 0
    return 0


def process_kids_score(kids_care_score, kids, num_schools, city_school_rank):
    """
    This one is easy. Let's just get a raw count, and scale it to the score.
    :param kids_care_score: Weight to scale result to
    :param kids:
    :param num_schools:
    :return:
    """
    if kids_care_score != 0:
        if num_schools >= 15:
            num_schools = 15

        score = (num_schools * 5) + (50 - city_school_rank[0]) + (50 - city_school_rank[1]) + (50 - city_school_rank[2])

        return (score * kids_care_score) / 200
    return 0


def process_size_score(size_care_score, population_opinion, city_population, city_density):
    """
    :param size_care_score: Weight to scale result to
    :param population:
    :return:
    """
    if size_care_score != 2:
        if population_opinion == 1:
            pop_score = ((city_population / 7000000) * (size_care_score / 2))  # Gives a score out of 10
            if pop_score > 1:
                pop_score = 10
            density_score = ((city_density / 3500) * (size_care_score / 2))  # Gives a score out of 10
            if density_score > 1:
                density_score = 10
            return pop_score + density_score
        elif size_care_score == 0:
            ratio = city_population / 250000
            if ratio >= 1:
                pop_score = 0
            else:
                pop_score = (1 - ratio) * (size_care_score / 2)
            density_ratio = city_density / 4000
            if density_ratio >= 1:
                density_score = 0
            else:
                density_score = (1 - density_ratio) * (size_care_score / 2)
            return pop_score + density_score
    return 0

def process_all_scores(outdoor_score, salary_score, temperature_score, kids_score, size_score):
    """
    Throws out a final result.
    :param outdoor_score:
    :param salary_score:
    :param temperature_score:
    :param kids_score:
    :param size_score:
    :return:
    """
    total_score = outdoor_score + salary_score + temperature_score + kids_score + size_score
    grade = 'A'
    if 80 <= total_score <= 100:
        grade = 'A'
    elif 60 <= total_score <= 80:
        grade = 'B'
    elif 40 <= total_score <= 60:
        grade = 'C'
    elif 20 <= total_score <= 40:
        grade = 'D'
    elif 0 <= total_score <= 20:
        grade = 'E'
    return total_score, grade

if __name__ == '__main__':
    app.run(debug=True)
