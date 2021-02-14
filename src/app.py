from flask import Flask, request
from flask_cors import CORS
from downloader import downloader

app = Flask(__name__,static_folder="../webui/build",static_url_path='/')
app.secret_key='asfgwiejkf'
CORS(app)

@app.route('/')
def home():
    return app.send_static_file('index.html')

@app.route('/submit',methods=["POST"])
def handle_submit():
    data = request.get_json()
    print(data)
    return downloader.dl_something(data)

if __name__ == '__main__':
    app.run(
        host='127.0.0.1',
        port=21991,
    )