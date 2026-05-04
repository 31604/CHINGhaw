import requests
import time

url = "https://YOUR-RAILWAY-APP.up.railway.app/data"

while True:
    data = {
        "message": "hello from raspberry",
        "temperature": 25,
        "humidity": 60,
        "device": "raspberry-pi"
    }

    try:
        res = requests.post(url, json=data)
        print(res.text)
    except Exception as e:
        print("Error:", e)

    time.sleep(5)
