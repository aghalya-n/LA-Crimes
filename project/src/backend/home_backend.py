from flask import Flask, request, jsonify, render_template
from flask_cors import CORS
from flask_marshmallow import Marshmallow
import mysql.connector
import requests

app = Flask(__name__)
CORS(app)


mydb = mysql.connector.connect(
    host="34.172.187.158",
    user="root",
    password="nncw",
    database="SafeLA"
)

ma=Marshmallow(app)

# Create a cursor object to execute SQL queries
mycursor = mydb.cursor()


@app.route('/', methods=['GET'])

def handle_request():
    response = get_crimes()
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response

def get_crimes():
    mycursor.execute("SELECT ReportId, WeaponUsed, CaseStatus, Address, CrimeCd FROM Report NATURAL JOIN Location JOIN AreaInLA USING (AreaId) WHERE AreaName = %s")
    data = mycursor.fetchall() 
    return jsonify(data)

if __name__ == "__main__":
    # run backend server on http://localhost:5000/
    app.run(host = 'localhost',port=5000, debug=True)
