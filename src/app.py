from flask import Flask, request
from flask_cors import CORS
from flask_socketio import SocketIO

from downloader import downloader
from resource import resource
from task import task_queue

app = Flask(__name__,static_folder="../webui/build",static_url_path='/')
app.secret_key='asfgwiejkf'
CORS(app)

socketio_app = SocketIO(app,cors_allowed_origins='*')

@app.route('/')
def home():
    return app.send_static_file('index.html')

@app.route('/submit',methods=["POST"])
def handle_submit():
    data = request.get_json()
    print(data)
    return downloader.dl_something(data)

@app.route('/list_resources')
def handle_list_resources():
    return resource.list_downloaded()

@app.route('/list_tasks',methods=["POST","GET","OPTIONS"])
def handle_list_tasks():
    if request.method == "GET":
        return task_queue.fetch_task_list()
    else:
        print(request.data)
        return "DONW"

@app.route('/delete',methods=["POST"])
def handle_delete():
    data = request.get_json()
    print(data)
    return resource.delete_file(data['file_name'])

@socketio_app.on('task_log')
def handle_task_log(data):
    index = data['index']
    task_queue.fetch_single_task(index)

if __name__ == '__main__':
    socketio_app.run(
        app,
        debug=True,
        host='0.0.0.0',
        port=21991,
    )