from flask import Flask, render_template
import requests
import json

app = Flask(__name__)
index_path = "structure.html"

@app.route("/", methods=["POST", "GET"])
def index():
    string_response = ((requests.get('https://api.carbonintensity.org.uk/regional', verify=False)).content).decode("utf-8")
    JSON_response = json.loads(string_response)
    # API_response.content is initially of type 'bytestring', so needs to be decoded to a string using UTF-8

    return render_template(index_path, JSON_response=JSON_response, string_response=string_response)


def main():
    app.run(debug=True)
