import pyodbc 
import os
from dotenv import load_dotenv

load_dotenv()

connection_str = os.environ['connection_string']
connection = pyodbc.connect(connection_str)
cursor = connection.cursor()
query = 'select *  from Persons;'
cursor.execute(query)
data = cursor.fetchall()
print(data)