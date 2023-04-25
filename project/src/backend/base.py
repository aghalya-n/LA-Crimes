import mysql.connector
from flask import Flask, request, jsonify
from flask_cors import CORS
from datetime import datetime


crimemap = {
'ARSON': '648',
'ASSAULT WITH DEADLY WEAPON ON POLICE OFFICER': '231',
'ASSAULT WITH DEADLY WEAPON, AGGRAVATED ASSAULT': '230',
'ATTEMPTED ROBBERY': '220',
'BATTERY - SIMPLE ASSAULT': '624',
'BATTERY ON A FIREFIGHTER': '622',
'BATTERY POLICE (SIMPLE)': '623',
'BATTERY WITH SEXUAL CONTACT': '860',
'BIKE - STOLEN': '480',
'BOMB SCARE': '755',
'BRANDISH WEAPON': '761',
'BUNCO, ATTEMPT': '666',
'BUNCO, GRAND THEFT': '662',
'BUNCO, PETTY THEFT': '664',
'BURGLARY': '310',
'BURGLARY FROM VEHICLE': '330',
'BURGLARY FROM VEHICLE, ATTEMPTED': '410',
'BURGLARY, ATTEMPTED': '320',
'CHILD ABUSE (PHYSICAL) - SIMPLE ASSAULT': '627',
'CHILD NEGLECT (SEE 300 W.I.C.)': '237',
'CONTEMPT OF COURT': '903',
'CRIMINAL HOMICIDE': '110',
'CRIMINAL THREATS - NO WEAPON DISPLAYED': '930',
'CRM AGNST CHLD (13 OR UNDER) (14-15 & SUSP 10 YRS OLDER)': '812',
'DEFRAUDING INNKEEPER/THEFT OF SERVICES, OVER $400': '950',
'DISCHARGE FIREARMS/SHOTS FIRED': '753',
'DISTURBING THE PEACE': '886',
'DOCUMENT FORGERY / STOLEN FELONY': '649',
'EMBEZZLEMENT, GRAND THEFT ($950.01 & OVER)': '668',
'EMBEZZLEMENT, PETTY THEFT ($950 & UNDER)': '670',
'EXTORTION': '940',
'FAILURE TO YIELD': '890',
'FALSE IMPRISONMENT': '434',
'GRAND THEFT / INSURANCE FRAUD': '347',
'ILLEGAL DUMPING': '949',
'INDECENT EXPOSURE': '850',
'INTIMATE PARTNER - AGGRAVATED ASSAULT': '236',
'INTIMATE PARTNER - SIMPLE ASSAULT': '626',
'KIDNAPPING': '910',
'LETTERS, LEWD - TELEPHONE CALLS, LEWD': '956',
'LEWD CONDUCT': '762',
'ORAL COPULATION': '820',
'OTHER ASSAULT': '625',
'OTHER MISCELLANEOUS CRIME': '946',
'PANDERING': '806',
'PICKPOCKET': '352',
'PICKPOCKET, ATTEMPT': '452',
'RAPE, ATTEMPTED': '122',
'RAPE, FORCIBLE': '121',
'RECKLESS DRIVING': '438',
'RESISTING ARREST': '437',
'ROBBERY': '210',
'SEXUAL PENETRATION W/FOREIGN OBJECT': '815',
'SHOPLIFTING - ATTEMPT': '443',
'SHOPLIFTING - PETTY THEFT ($950 & UNDER)': '442',
'SHOPLIFTING-GRAND THEFT ($950.01 & OVER)': '343',
'SHOTS FIRED AT INHABITED DWELLING': '251',
'SHOTS FIRED AT MOVING VEHICLE, TRAIN OR AIRCRAFT': '250',
'SODOMY/SEXUAL CONTACT B/W PENIS OF ONE PERS TO ANUS OTH': '821',
'THEFT FROM MOTOR VEHICLE - ATTEMPT': '421',
'THEFT FROM MOTOR VEHICLE - GRAND ($400 AND OVER)': '331',
'THEFT FROM MOTOR VEHICLE - PETTY ($950 & UNDER)': '420',
'THEFT FROM PERSON - ATTEMPT': '450',
'THEFT OF IDENTITY': '354',
'THEFT PLAIN - ATTEMPT': '441',
'THEFT PLAIN - PETTY ($950 & UNDER)': '440',
'THEFT-GRAND ($950.01 & OVER)EXCPT,GUNS,FOWL,LIVESTK,PROD': '341',
'THEFT, PERSON': '350',
'THREATENING PHONE CALLS/LETTERS': '928',
'THROWING OBJECT AT MOVING VEHICLE': '647',
'TRESPASSING': '888',
'VANDALISM - FELONY ($400 & OVER, ALL CHURCH VANDALISMS)': '740',
'VANDALISM - MISDEAMEANOR ($399 OR UNDER)': '745',
'VEHICLE - ATTEMPT STOLEN': '520',
'VEHICLE - STOLEN': '510',
'VIOLATION OF COURT ORDER': '900',
'VIOLATION OF RESTRAINING ORDER': '901',
'VIOLATION OF TEMPORARY RESTRAINING ORDER': '902'
}


app = Flask(__name__)
CORS(app)

# your existing code for create_report() function goes here


@app.route('/', methods=['POST', 'DELETE', 'GET'])

def handle_request():
    if request.method == 'POST':
        # handle POST request and return response
        response = create_report()
        response.headers.add('Access-Control-Allow-Origin', '*')
        return response
    
    elif request.method == 'DELETE':
        # handle DELETE request and return response
        response = delete_report()
        response.headers.add('Access-Control-Allow-Origin', '*')
        return response
    
    elif request.method == 'GET':
        # handle GET request and return response
        #multiple potential responses?
        if request.args.get('AreaName') == 'xyz':
            response = get_query1()
        elif request.args.get('AreaName') == 'abc':
            response = get_query2()
        elif request.args.get('AreaName') == 'efg':
            response = get_stored_procedure()
        else:
            response = get_crimes()
        # response = get_crimes()
        return response



if __name__ == '__main__':
    app.run()

def create_report():
    data = request.get_json()
    ReportID = int(data['ReportID'])
    crimeCd = int(crimemap[data['crimeType']])
    address = data['address']
    date = datetime.strptime(data['date'], '%Y-%m-%d')
    weaponUsed = data['weaponUsed']
    area = data['area']

    # Establish a connection to the database
    mydb = mysql.connector.connect(
      host="34.172.187.158",
      user="root",
      password="nncw",
      database="SafeLA"
    )

    # Create a cursor object to execute SQL queries
    mycursor = mydb.cursor()

    # Insert/Update the data into the Crime table
    sql = "INSERT INTO Report(ReportID, CrimeCd, Address, Date, WeaponUsed) VALUES (%s,%s, %s, %s, %s) ON DUPLICATE KEY UPDATE  CrimeCd = %s, Address=%s, Date=%s, WeaponUsed=%s"
    val = (ReportID, crimeCd, address, date, weaponUsed, crimeCd, address, date, weaponUsed)
    mycursor.execute(sql, val)

    # Commit the changes to the database
    mydb.commit()

    # Return a JSON response indicating success
    return jsonify({'message': 'Updated successfully'})


def delete_report():
    data = request.get_json()
    ReportID = int(data['ReportID'])

    # Establish a connection to the database
    mydb = mysql.connector.connect(
      host="34.172.187.158",
      user="root",
      password="nncw",
      database="SafeLA"
    )

    # Create a cursor object to execute SQL queries
    mycursor = mydb.cursor()

    # Delete the row with the given ReportID
    sql = "DELETE FROM Report WHERE ReportID = %s"
    val = (ReportID,)
    mycursor.execute(sql, val)
    mydb.commit()

    return jsonify({'message': 'Deleted successfully'})

def get_crimes():
    AreaName = request.args.get('AreaName')
    mydb = mysql.connector.connect(
        host="34.172.187.158",
        user="root",
        password="nncw",
        database="SafeLA"
    )

    mycursor = mydb.cursor()

    sql = '''SELECT ReportId, CaseStatus, WeaponUsed, Address, CrimeCd, AreaName 
             FROM Report NATURAL JOIN Location JOIN AreaInLA USING (AreaId) WHERE AreaName = %s'''

    val = (AreaName,)
    mycursor.execute(sql, val)
    data = mycursor.fetchall()
    return jsonify(data)


def get_query1():
    mydb = mysql.connector.connect(
        host="34.172.187.158",
        user="root",
        password="nncw",
        database="SafeLA"
    )

    mycursor = mydb.cursor()

    sql = '''   SELECT DISTINCT CrimeDesc, COUNT(CrimeCd)
                FROM Report r LEFT JOIN Crime c USING(CrimeCd)
                WHERE CaseStatus = "Invest Cont"
                GROUP BY CrimeCd
                ORDER BY COUNT(CrimeCd) DESC
          '''
    mycursor.execute(sql)
    data = mycursor.fetchall()
    return jsonify(data)

def get_query2():
    numToCheck = request.args.get('numToCheck')
    mydb = mysql.connector.connect(
        host="34.172.187.158",
        user="root",
        password="nncw",
        database="SafeLA"
    )

    mycursor = mydb.cursor()

    sql = '''   SELECT DISTINCT AreaName, DistrictId 
                FROM AreaInLA a NATURAL JOIN Location l1 WHERE (
                SELECT COUNT(ReportId) 
                FROM Report r JOIN Location l2 USING(Address) 
                WHERE l1.DistrictId = l2.DistrictId
                GROUP BY l2.DistrictId
                Having COUNT(ReportId) > %s)
                ORDER BY DistrictId
          '''
    val = (numToCheck,)
    mycursor.execute(sql, val)
    data = mycursor.fetchall()
    return jsonify(data)

def get_stored_procedure():
    mydb = mysql.connector.connect(
        host="34.172.187.158",
        user="root",
        password="nncw",
        database="SafeLA"
    )

    mycursor = mydb.cursor()

    mycursor.callproc('Result', )
    data = mycursor.fetchall()
    return jsonify(data)