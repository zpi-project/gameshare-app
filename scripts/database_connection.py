import psycopg2

# Set db credentials
HOST = "localhost"
PORT = 5432
USER = "game"
PASSWORD = "share"
DBNAME = "gamesharetest"

select_categories = "select * from categories"
insert_category = "INSERT INTO categories (name) VALUES ('%s');"
insert_game = """
INSERT INTO games 
(name, short_description, min_players, max_players, playing_time, age, image, is_accepted) 
VALUES ('%s', '%s', %i, %i, %i, %i, '%s', true);
"""
insert_category_game = """
INSERT INTO games_categories (game_id, category_id) VALUES 
((select id from games where name = '%s'), 
(select id from categories where name = '%s'));
"""

def connect(insert, *args):
    conn = None
    try:
        # connecting to postresql 
        conn = psycopg2.connect(
            host=HOST,
            database=DBNAME,
            user=USER,
            password=PASSWORD,
            port=PORT)
        
        # creating cursor
        cur = conn.cursor()
        query = insert % args
        # execute a statement
        cur.execute(query)
        conn.commit()
        
        # close the communication with the PostgreSQL
        cur.close()
    except (Exception, psycopg2.DatabaseError) as error:
        print(error)
        print(query)
    finally:
        if conn is not None:
            conn.close()
    

# connect(select_categories)
# connect(insert_category, "RPG")