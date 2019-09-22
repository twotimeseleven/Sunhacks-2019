
def care_score(res: dict):
    a = {}
    if res['outdoors'] == 0 and res['population'] != 2:
        a['salary'] = 25
        a['weather'] = 25
        a['kids'] = 25
        a['outdoors'] = 0
        a['population'] = 25

    elif res['population'] == 2 and res['outdoors'] != 0:
        a['salary'] = 25
        a['weather'] = 25
        a['kids'] = 25
        a['outdoors'] = 25
        a['population'] = 0

    elif res['outdoors'] == 0 and res['population'] == 2:
        a['salary'] = 33.33
        a['weather'] = 33.33
        a['kids'] = 33.33
        a['outdoors'] = 0
        a['population'] = 0

    else:
        a['salary'] = 20
        a['weather'] = 20
        a['kids'] = 20
        a['outdoors'] = 20
        a['population'] = 20
    return a


if __name__ == '__main__':
    test = care_score({"salary": 50000, "weather": 1, "kids": 1, "outdoors": 0, "population": 2})
pass
