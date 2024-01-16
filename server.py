from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/test_flights', methods=['GET','POST'])
def test_flights_data():
    # assuming we get some data ?
    if request.method == 'POST':
        data = request.get_json()
        print(data)

    response_data = [
        {
            "id" : "idbb584f47-b3ce-4c8e-a1c7-9755fa3f5659",
            "flightNumber" : "DL5631 ",
            "departureAirport" : "KDCA",
            "arrivalAirport" : "KLGA",
            "flightDate" : "2023-03-17",
            "imageUrl": "https://www.airdatanews.com/wp-content/uploads/2020/07/delta-connection-e175.jpg",
            "notes": "This is a comment for DL5631"
        },
        {
            "id": "id296fdeb3-4bda-4716-b225-fe7fb3ec0952", 
            "flightNumber": "AY1251",
            "departureAirport" : "EFHK",
            "arrivalAirport" : "LHBP",
            "flightDate" : "2024-01-16",
            "imageUrl" : "https://cdn.radarbox.com/photo/OH-LZU-1698566402-0.jpg",
            "notes" : "Great flight!"
        },
        {
            "id" : "b9f3512d-026e-48d2-9732-d97e4165c0d6",
            "flightNumber" : "BA0217",
            "departureAirport" : "EGLL",
            "arrivalAirport" : "KIAD",
            "flightDate" : "2023-03-14",
            "imageUrl": "https://cdn.airplane-pictures.net/images/uploaded-images/2015/3/1/529693.jpg",
            "notes": "Very big plen!"
        },
        {
            "id": "a3156c7e-c5b8-468d-b900-f6c96191db49", 
            "flightNumber": "BT301",
            "departureAirport" : "EVRA",
            "arrivalAirport" : "EFHK",
            "flightDate" : "2023-07-02",
            "imageUrl" : "https://pbs.twimg.com/media/GB36SJnXoAANSp1.jpg",
            "notes" : "Great flight!"
        },
            
    ]

    # Return the JSON array as a response
    return jsonify(response_data)

if __name__ == '__main__':
    app.run(debug=True, port=5000)