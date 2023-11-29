import dataclasses
import os

import psycopg2
import requests
import xmltodict
import scripts.gpt_request as gpt


@dataclasses.dataclass
class BoardGameData:
    original_id: int
    name: str
    name_pl: str
    age: int
    max_players: int
    min_players: int
    playing_time: int
    description: str
    description_pl: str
    image: str
    categories: list
    categories_pl: list


class ExtractData:
    def __init__(self, file_path, url):
        self.file_path = file_path
        self.url = url
        self.boardgame_url = self.url + "/boardgame"
        self.file = open(self.file_path, "r")

    def make_request(self, original_id_str):
        sending_url = self.boardgame_url + "/" + original_id_str
        r = requests.get(url=sending_url)
        return r

    def get_board_games(self):
        boardGames = []
        for original_id_str in self.file:
            data = xmltodict.parse(self.make_request(original_id_str).content)
            print("Game:", original_id_str)
            categories, categories_pl = self.get_categories(data['boardgames']['boardgame']['boardgamecategory'])
            original_id = int(original_id_str)
            name = self.get_names(data['boardgames']['boardgame']['name'])
            name_pl = gpt.get_names_pl(name)
            age = int(data['boardgames']['boardgame']['age'])
            max_players = int(data['boardgames']['boardgame']['maxplayers'])
            min_players = int(data['boardgames']['boardgame']['minplayers'])
            playing_time = int(data['boardgames']['boardgame']['playingtime'])
            short_description = gpt.get_short_description(data['boardgames']['boardgame']['description'])
            short_description_pl = gpt.get_short_description_pl(short_description)
            image = data['boardgames']['boardgame']['image']
            boardGame = BoardGameData(original_id, name, name_pl, age, max_players, min_players, playing_time,
                                      short_description,
                                      short_description_pl, image, categories, categories_pl)
            boardGames.append(boardGame)
        return boardGames

    def get_names(self, names_json):
        name = ""
        if type(names_json) is list:
            for n in names_json:
                try:
                    if n['@primary'] == 'true':
                        name = n["#text"]
                        break
                except KeyError as e:
                    pass
        else:
            name = names_json["#text"]
        return str(name)

    def get_categories(self, categories_json):
        categories = []
        categories_pl = []
        if type(categories_json) is list:
            for c in categories_json:
                c_pl = gpt.get_category_pl(c['#text'])
                categories.append(c['#text'])
                categories_pl.append(c_pl)

        else:
            c_pl = gpt.get_category_pl(categories_json['#text'])
            categories_pl.append(c_pl)
            categories.append(categories_json['#text'])
        return categories, categories_pl


class PersistData:
    def __init__(self):
        self.connection = None
        self.connect()
        self.cursor = self.connection.cursor()
        self.category_id = 0
        self.game_id=0
        self.categories_inserted= []

    def __del__(self):
        self.connection.close()

    def connect(self):
        conn = psycopg2.connect(
            host=os.getenv("DB_HOST"),
            database=os.getenv("DB_NAME"),
            user=os.getenv("DB_USER"),
            password=os.getenv("DB_PASSWORD"),
            port=os.getenv("DB_PORT"))
        self.connection = conn

    def insert_game(self, game):
        insert_game = \
            """
    INSERT INTO games (id,original_id, name, name_pl, short_description, short_description_pl, min_players, max_players, playing_time, age, image)
    VALUES (%s,%s, %s, %s, %s, %s, %s, %s, %s, %s, %s) 
"""
        self.cursor.execute(insert_game, (self.game_id, game.original_id, game.name, game.name_pl, game.description,
                                          game.description_pl,
                                          game.min_players, game.max_players, game.playing_time, game.age, game.image))
        self.game_id +=1

    def insert_category(self, game):
        insert_category = "INSERT INTO categories (id,name,name_pl) VALUES (%s,%s,%s);"
        for category, category_pl in zip(game.categories, game.categories_pl):
            if category not in self.categories_inserted:
                self.cursor.execute(insert_category, (self.category_id, category, category_pl))
                self.categories_inserted.append(category)
                self.category_id += 1

    def insert_games_categories(self, game):
        insert_category_game = """
        INSERT INTO games_categories (game_id, category_id) VALUES 
        ((select id from games where name = %s), 
        (select id from categories where name = %s));
        """
        for category in game.categories:
            self.cursor.execute(insert_category_game, (game.name, category))

    def persist_data(self, boardGames):
        for i, boardGame in enumerate(boardGames):
            self.insert_game(boardGame)
            self.insert_category(boardGame)
            self.insert_games_categories(boardGame)
            self.connection.commit()
            print("Game inserted:", boardGame.name)


if __name__ == '__main__':
    FILE_PATH = "top_100_games_ids.txt"
    URL = "https://boardgamegeek.com/xmlapi"
    import_data = ExtractData(FILE_PATH, URL)
    data = import_data.get_board_games()
    persist_data = PersistData()
    persist_data.persist_data(data)