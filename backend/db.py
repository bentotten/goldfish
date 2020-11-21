#!/usr/bin/env python3

import sqlite3
from sqlite3 import Error
import json

# Connect to db
def create_connection(db_file):
    """ create a database connection to a SQLite database """
    conn = None
    try:
        conn = sqlite3.connect(db_file)
        print(sqlite3.version)
    except Error as e:
        print(e)
    finally:
        if conn:
            conn.close()

# Import json into sqlite
def json_to_sqlite(json_file):
    with open(json_file) as json_data: 
        d = json.load(json_data)
        print(d)



if __name__ == '__main__':
    create_connection(r"/home/tottenbs/goldfish.db")