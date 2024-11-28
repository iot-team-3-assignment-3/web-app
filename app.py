from flask import Flask, render_template, request, redirect, jsonify
import json

app = Flask(__name__)
index_path = "index.tsx"


@app.route("/", methods=["POST", "GET"])
def index():
    return render_template(index_path)


def main():
    app.run(debug=True)
