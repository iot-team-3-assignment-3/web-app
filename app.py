from flask import Flask, render_template, jsonify
import json
import requests

app = Flask(__name__)
index_path = "index.html"

@app.route("/", methods=["POST", "GET"])
def index():
    payload = ((requests.get('https://api.carbonintensity.org.uk/regional', verify=False)).content).decode("utf-8")
    return render_template(index_path, payload=payload)


def main():
    app.run(debug=True)
