from server import app
from flask import render_template, redirect, request


@app.route("/")
def route_index():
    return render_template('index.html')


@app.route("/deck-builder")
def route_deck_builder():
    card_class = request.args.get('class')
    return render_template("deck-builder.html", cardClass=card_class)
