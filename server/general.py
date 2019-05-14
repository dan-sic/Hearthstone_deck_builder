from server import app
from flask import render_template, redirect


@app.route("/")
def route_index():

    return render_template('index.html')


@app.route("/deck-builder")
def route_deck_builder():
    return render_template("deck-builder.html")
