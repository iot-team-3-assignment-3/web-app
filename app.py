from flask import Flask, render_template
import requests

app = Flask(__name__)
index_path = "structure.html"

@app.route("/", methods=["POST", "GET"])
def index():
    API_response = ((requests.get('https://api.carbonintensity.org.uk/regional', verify=False)).content).decode("utf-8")
    # API_response.content is initially of type 'bytestring', so needs to be decoded to a string using UTF-8

    return render_template(index_path, payload=API_response)


def main():
    app.run(debug=True)
