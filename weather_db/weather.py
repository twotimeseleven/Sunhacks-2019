import ssl

from pymongo import MongoClient

client = MongoClient("mongodb+srv://{}:{}@sunhackscluster-ijexw.gcp.mongodb.net/test?retryWrites=true&w=majority".
                     format("sunhacks", "sunhacks"), ssl_cert_reqs=ssl.CERT_NONE)
cities_db = client.newCitiesDatabase
cities_collection = cities_db.newCities
# cities_list = []
#
# ids = cities_collection.find()
#
# with open('/Users/ZachsMac/Sunhacks 2019/weather_db/Sunhacks-2019/weather_db/temp_max.txt', 'r') as data:
#     line = data.readline()
#     san_jaun = False
#     while line:
#         if not san_jaun:
#             line = data.readline()
#             mod_1 = line.split(",")
#             mod_2 = mod_1[2].replace(' ', '')
#             midPoint = len(mod_2) // 2
#             mod_3 = mod_2[:midPoint] + '  ' + mod_2[midPoint:]
#             mod_1.pop(2)
#             mod_4 = mod_1.insert(2, mod_3)
#             mod_5 = "  ".join(mod_1)
#             mod_6 = mod_5.replace("  ", ",")
#             mylist = mod_6.split(",")
#             city = mylist[1]
#             state = mylist[2]
#             weather = mylist[4:]
#             weather = [w.strip() for w in weather]
#             fullline = [city, state] + weather
#             update = {
#             "Jan": fullline[2],
#             "Feb": fullline[3],
#             "Mar": fullline[4],
#             "Apr": fullline[5],
#             "May": fullline[6],
#             "Jun": fullline[7],
#             "Jul": fullline[8],
#             "Aug": fullline[9],
#             "Sep": fullline[10],
#             "Oct": fullline[11],
#             "Nov": fullline[12],
#             "Dec": fullline[13],
#             "Annual": fullline[14]
#
#             }
#             for id in ids:
#                 if city.lower() == id['city'].lower():
#                     cities_collection.update_one({'_id': id['_id']}, {"$set": {"Max Temps": update}},
#                                                  upsert=False)
#                 if city == "SAN JUAN":
#                     san_jaun = True
#                 break

cities_collection.update_one({'_id': "5d85c4fbc06be8163e1e25f3"}, {"$set": {}})
