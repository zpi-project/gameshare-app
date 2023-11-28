import os

import psycopg2

select_categories = "select * from categories"
insert_category = "INSERT INTO categories (name,name_pl) VALUES (%s,%s);"
insert_game = """
INSERT INTO games 
(original_id, name, name_pl,short_description,short_description_pl, min_players, max_players, playing_time, age, image) 
VALUES (%s, %s, %s,%s,%s, %s, %s, %s, %s, %s, true);
"""
insert_category_game = """
INSERT INTO games_categories (game_id, category_id) VALUES 
((select id from games where name = %s), 
(select id from categories where name = %s));
"""

def connect(insert, *args):
    conn = None
    try:
        # connecting to postresql 
        conn = psycopg2.connect(
            host=os.getenv("DB_HOST"),
            database=os.getenv("DB_NAME"),
            user=os.getenv("DB_USER"),
            password=os.getenv("DB_PASSWORD"),
            port=os.getenv("DB_PORT"))
        
        # creating cursor
        cur = conn.cursor()
        cur.execute(insert, (args))
        conn.commit()
        
        # close the communication with the PostgreSQL
        cur.close()
    except psycopg2.DatabaseError as db_error:
        # If error is different than dupicate key
        if db_error.pgcode!='23505':
            print(db_error)
    except Exception as error:
        print(error)
    
    finally:
        if conn is not None:
            conn.close()
    