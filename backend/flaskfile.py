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
client = MongoClient("mongodb+srv://{}:{}@sunhackscluster-ijexw.gcp.mongodb.net/test?retryWrites=true&w=majority".format(uname, pw))
cities_db = client.NewCitiesDB
cities_collection = cities_db.newCities

@app.route('/sunhacks/api/v1.0/cities', methods=['GET'])
def get_records():
    '''
    This endppoint will take a latitude and longitude, and return the DB record associated with that city location.
    :param: A latitude and a longitude.
    :return: A DB value for the nearest town.
    '''
    arguments = request.args.items()
    dict_to_query = {}
    for arg in arguments:
        dict_to_query[arg[0]] = arg[1]
    lat = dict_to_query['lat']
    lon = dict_to_query['lon']
    # Make the API call
    params = {"apiKey": "{}".format(key), "lat": lat, "lon": lon, "version": 4.10}
    r = requests.get(url="https://geoservices.tamu.edu/Services/ReverseGeocoding/WebService/v04_01/Rest", params=params)
    db_record = cities_collection.find_one({'city': r.text.split(",")[6]})
    return db_record





if __name__ == '__main__':
    app.run(debug=True)