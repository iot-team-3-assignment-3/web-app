from flask import Flask, render_template, request, redirect

app = Flask(__name__)
index_html_path = "index.html"


@app.route("/", methods=["POST", "GET"])
def index():
    if request.method == "POST":
        form_content = request.form["content"]
        return "POST request received! " + form_content
    else:
        return render_template(index_html_path)


def main():
    app.run(debug=True)
