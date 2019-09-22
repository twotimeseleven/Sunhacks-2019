def care_score(res: dict) -> dict:
    score_weights = {}
    outdoors_flag = False
    size_flag = False
    kids_flag = False
    count = 2

    if res['outdoors'] != 0:
        count += 1
        outdoors_flag = True
    if res['size'] != 2:
        count += 1
        population_flag = True
    if res['kids'] != 0:
        count += 1
        kids_flag = True

    weight = 100 / count
    score_weights['outdoors'] = weight if outdoors_flag else 0
    score_weights['salary'] = weight
    score_weights['temperature'] = weight
    score_weights['kids'] = weight if kids_flag else 0
    score_weights['size'] = weight if size_flag else 0

    return score_weights
