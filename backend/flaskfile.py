#!flask/bin/python
from flask import Flask, request, jsonify
from pymongo import MongoClient
import json

with open("keys.json", "r") as file:
    data = json.load(file)
    uname = data['UNAME']
    pw = data['PWORD']

app = Flask(__name__)
client = MongoClient("mongodb+srv://{}:{}@sunhackscluster-ijexw.gcp.mongodb.net/test?retryWrites=true&w=majority".format(uname, pw))
cities_db = client.CitiesDatabase
cities_collection = cities_db.cities

@app.route('/sunhacks/api/v1.0/cities', methods=['GET'])
def get_records():
    '''
    Specification for the API:
    Parameters to query on:
    {"_id"
    "city":"Buckley",
    "city_ascii":"Buckley",
    "state_id":"WA",
    "state_name":"Washington",
    "county_fips":{"$numberInt":"53053"},
    "county_name":"Pierce",
    "county_fips_all":"53053",
    "county_name_all":"Pierce",
    "lat":{"$numberDouble":"47.1615"},
    "lng":{"$numberDouble":"-122.02"},
    "population":{"$numberDouble":"4819"},
    "density":{"$numberDouble":"482"},
    "source":"polygon",
    "military":false,
    "incorporated":true,
    "timezone":"America/Los_Angeles",
    "ranking":{"$numberInt":"3"},
    "zips":"98321",
    "id":{"$numberInt":"1840097435"},
    "Total Trails":{"$numberInt":"12"},
    "Trail Locations": []
    :return: A JSON object response of the city data queried.


    How to query:

    http://127.0.0.1:5000/sunhacks/api/v1.0/cities?<PARAMETERS>

    '''
    arguments = request.args.items()
    dict_to_query = {}
    for arg in arguments:
        dict_to_query[arg[0]] = arg[1]

    query = cities_collection.find(dict_to_query)

    list_to_return = []
    for cursor in query:
        cursor['_id'] = str(cursor['_id'])
        list_to_return.append(cursor)
    update_dict = {}
    update_dict.update({'Cities': list_to_return} )
    return update_dict


if __name__ == '__main__':
    app.run(debug=True)