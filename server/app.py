from flask import Flask, render_template

app = Flask(__name__)
index_html_path = '../templates/index.html'

@app.route('/')
def index():
    return render_template(index_html_path)

def main():
    app.run(debug = True)