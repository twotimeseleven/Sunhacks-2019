with open('/Users/ZachsMac/Sunhacks 2019/weather_db/Sunhacks-2019/weather_db/temp_max.txt', 'r') as data:
    line = data.readline()
    update_list = []
    while line:
        line = data.readline()
        mod_1 = line.split(",")
        mod_2 = mod_1[2].replace(' ', '')
        midPoint = len(mod_2) // 2
        mod_3 = mod_2[:midPoint] + '  ' + mod_2[midPoint:]
        mod_1.pop(2)
        mod_4 = mod_1.insert(2, mod_3)
        mod_5 = "  ".join(mod_1)
        mod_6 = mod_5.replace("  ", ",") + "\n"
        mylist = mod_6.split(",")
        city = mylist[1]
        state = mylist[2]
        weather = mylist[4:]
        weather = [float(w.strip()) for w in weather]
        fullline = [city, state] + weather
        update = {"name": fullline[0],
                  "Jan": fullline[2],
                  "Feb": fullline[3],
                  "Mar": fullline[4],
                  "Apr": fullline[5],
                  "May": fullline[6],
                  "Jun": fullline[7],
                  "Jul": fullline[8],
                  "Aug": fullline[9],
                  "Sep": fullline[10],
                  "Oct": fullline[11],
                  "Nov": fullline[12],
                  "Dec": fullline[13],
                  "Annual": fullline[14]}
