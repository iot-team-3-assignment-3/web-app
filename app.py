from flask import Flask, render_template, request, redirect, jsonify
import json
import requests

app = Flask(__name__)
index_path = "index.html"


@app.route("/", methods=["POST", "GET"])
def index():
    request = requests.get('https://api.carbonintensity.org.uk/regional')
    payload = request.content
    json_data = json.loads(payload)
    return render_template(index_path, payload=json_data)


def main():
    app.run(debug=True)
