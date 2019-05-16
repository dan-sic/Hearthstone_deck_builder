from server import app
from server import general


if __name__ == '__main__':
    app.run(
        port=5002,
        debug=True,
        host="localhost"
    )
