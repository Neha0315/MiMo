import pyodbc 
import os
from dotenv import load_dotenv

class db_helper:

    def __init__(self):
        load_dotenv()
        connection_str = os.environ['connection_string']
        self.connection = pyodbc.connect(connection_str)
        self.cursor = self.connection.cursor()

    def query_accounts(self):

    def query(self, query):
        self.cursor.execute(query)
        response = self.cursor.fetchall()
        return_me = []
        for account in response:
            acc = {}
            acc['account_id'] = account[0]
            acc['first_name'] = account[1]
            acc['last_name'] = account[2]
            acc['user_name'] = account[3]
            return_me.append(acc)

        return return_me


db = db_helper()
print(db.query("SELECT * FROM ACCOUNTS;"))