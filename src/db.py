import sqlite3
import os
import sys

class DBController:
    def __init__(self):
        db_dir = os.path.dirname(os.path.abspath(__file__)) + '/database'
        print(db_dir)
        db_file = db_dir + '/dl.db'
        if not os.path.exists(db_file):
            print("db file doesn't exist, create it")
            if not os.path.exists(db_dir):
                os.mkdir(db_dir)
            os.mknod(db_file)

            db_connection = sqlite3.connect(db_file,check_same_thread=False)
            db_cursor = db_connection.cursor()

            db_cursor.execute("""
                CREATE TABLE queue(
                    url text,
                    backend text
                )
            """)

            db_cursor.execute("""
                CREATE TABLE done(
                    url text,
                    backend text
                )
            """)

            db_connection.commit()
            db_connection.close()

        self.db_connection = sqlite3.connect(db_file,check_same_thread=False)
    
    def __del__(self):
        self.db_connection.commit()
        self.db_connection.close()

    def if_url_is_added(self,url: str):
        def check_db(db: str):
            sql = "SELECT * FROM %s WHERE %s.url = \"%s\""%(db,db,url)
            cursor = self.db_connection.cursor()
            db_cursor = cursor.execute(sql)
            for _ in db_cursor:
                return True
            return False
        if check_db("queue") == True:
            return True
        if check_db("done") == True:
            return True
        return False
    
    def add_url_to_queue(self, url: str, backend: str):
        sql = "INSERT INTO queue(url,backend) VALUES(\"%s\",\"%s\")"%(url,backend)
        cursor = self.db_connection.cursor()
        cursor.execute(sql)
        self.db_connection.commit()

    def pop_url(self, url: str):
        cursor = self.db_connection.cursor()

        sql = "SELECT url,backend FROM queue WHERE queue.url = \"%s\""%(url)
        res = cursor.execute(sql)
        poped_data = res.fetchone()
        print(poped_data)

        sql = "DELETE FROM queue WHERE queue.url = \"%s\""%(url)
        cursor.execute(sql)
        sql = "INSERT INTO done(url,backend) VALUES(\"%s\",\"%s\")"%(poped_data[0],poped_data[1])
        cursor.execute(sql)

        self.db_connection.commit()

db_controller = DBController()

if __name__ == '__main__':
    if len(sys.argv) > 2:
        cmd = sys.argv[1]
        if cmd == "pop":
            url = sys.argv[2]
            db_controller.pop_url(url)
