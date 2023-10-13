import requests
import xmltodict
import database_connection as db
 
# api-endpoint
URL = "https://boardgamegeek.com/xmlapi"

# /xmlapi/search
# Parameters
# search: String to search for (required)
# exact: Exact name/aka search only (set it to 1, absent by default)
SEARCH_URL = URL + "/search"

# /xmlapi/boardgame/<gameid>,<gameid2>...
# Parameters
# comments: Show brief user comments on games (set it to 1, absent by default)
# stats: Include game statistics (set it to 1, absent by default)
# historical: Include historical game statistics (set it to 1, absent by default) - Use from/end parameters to set starting and ending dates. Returns all data starting from 2006-03-18.
# from: Set the start date to include historical data (format: YYYY-MM-DD, absent by default )
# to: Set the end date to include historical data (format: YYYY-MM-DD, absent by default )
# pricehistory: retrieve the marketplace history for this item (set it to 1, absent by default)
# marketplace: retrieve the current marketplace listings (set it to 1, absent by default)
BOARDGAME_URL = URL + "/boardgame"
 
# Opening file with ids
file = open("scripts/top_100_games_ids.txt", "r")

for id in file:
    print("Game:", id)
    sending_url = BOARDGAME_URL + "/" + id
    r = requests.get(url = sending_url)
 
    # extracting data in xml
    data = xmltodict.parse(r.content)
    # saving_file = open("scripts/game.json", "a")
    # saving_file.write(str(data))
    # saving_file.flush()

    names_json = data['boardgames']['boardgame']['name']
    name = ""
    age = int(data['boardgames']['boardgame']['age'])
    max_players = int(data['boardgames']['boardgame']['maxplayers'])
    min_players = int(data['boardgames']['boardgame']['minplayers'])
    playing_time = int(data['boardgames']['boardgame']['playingtime'])
    description = data['boardgames']['boardgame']['description']
    description = description.replace("'", "")
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
        
    # print(name)
    # print(age)
    # print(max_players)
    # print(min_players)
    # print(playing_time)
    # print(description)
    # print(image)
    # print(categories)

    db.connect(db.insert_game, name, description, min_players, max_players, playing_time, age, image)
    for c in categories:
        db.connect(db.insert_category, c)
        db.connect(db.insert_category_game, name, c)

print("All data inserted.")