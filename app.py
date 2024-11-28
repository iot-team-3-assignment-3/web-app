from flask import Flask, render_template, request, redirect, jsonify
import json
import requests

app = Flask(__name__)
index_path = "index.html"


@app.route("/", methods=["POST", "GET"])
def index():
    request = requests.get('https://api.carbonintensity.org.uk/regional')
    return render_template(index_path, request=request)


def main():
    app.run(debug=True)
