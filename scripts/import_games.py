import requests
import xmltodict
import database_connection as db
import gpt_request as gpt
 
# file
FILE_PATH = "scripts/top_300_games_ids.txt"

# api-endpoint
URL = "https://boardgamegeek.com/xmlapi"
BOARDGAME_URL = URL + "/boardgame"
 
# Opening file with ids
file = open(FILE_PATH, "r")

for original_id_str in file:
    original_id = int(original_id_str)

    print("Game:", original_id_str)
    sending_url = BOARDGAME_URL + "/" + original_id_str
    r = requests.get(url = sending_url)
 
    # extracting data in xml
    data = xmltodict.parse(r.content)

    names_json = data['boardgames']['boardgame']['name']
    name = ""
    age = int(data['boardgames']['boardgame']['age'])
    max_players = int(data['boardgames']['boardgame']['maxplayers'])
    min_players = int(data['boardgames']['boardgame']['minplayers'])
    playing_time = int(data['boardgames']['boardgame']['playingtime'])
    description = data['boardgames']['boardgame']['description']
    image = data['boardgames']['boardgame']['image']
    categories_json = data['boardgames']['boardgame']['boardgamecategory']
    categories = []

    if type(names_json) is list:
        for n in names_json:
            try:
                if n['@primary'] == 'true':
                    name = n["#text"]
                    break
            except:
                # Not primary name
                next
    else:
        name = names_json["#text"]

    if type(categories_json) is list:
        for c in categories_json:   
            categories.append(c['#text'])
    else:
        categories.append(categories_json['#text'])

    description = gpt.get_short_description(description)

    db.connect(db.insert_game, original_id, name, description, min_players, max_players, playing_time, age, image)
    for c in categories:
        db.connect(db.insert_category, c)
        db.connect(db.insert_category_game, name, c)

print("All data inserted.")