from flask import Flask, render_template

app = Flask(__name__)
index_html_path = 'index.html'

@app.route('/', methods=['GET'])
def index():
    return render_template(index_html_path)

def main():
    app.run(debug = True)