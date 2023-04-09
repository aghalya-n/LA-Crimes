from flask import Flask, request, jsonify
from flask_cors import CORS
import mysql.connector

app = Flask(__name__)
CORS(app)

@app.route('/', methods=['GET'])

def handle_request():
    response = show_reports()
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response

mydb = mysql.connector.connect(
    host="34.172.187.158",
    user="root",
    password="nncw",
    database="SafeLA"
)

def show_reports():
    data = request.get_json()
    neighborhood = data['AreaName']
    mycursor = mydb.cursor()
    sql = "SELECT * FROM Report NATURAL JOIN Location JOIN AreaInLA USING (AreaID) WHERE AreaName = neighborhood"
    val = (neighborhood)
    mycursor.execute(sql, val)