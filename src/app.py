from flask import Flask, request
from flask_cors import CORS
from downloader import downloader
from resource import resource

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

@app.route('/list')
def handle_list():
    return resource.list_downloaded()

if __name__ == '__main__':
    app.run(
        host='0.0.0.0',
        port=21991,
    )