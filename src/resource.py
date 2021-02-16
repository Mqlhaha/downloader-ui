import os
import json

class Resource:
    def list_downloaded(self):
        download_path = os.path.dirname(os.path.abspath(__file__)) + '/dl'
        file_list = os.listdir(download_path)
        file_list_str = json.dumps(file_list)
        return file_list_str

resource = Resource()

if __name__ == '__main__':
    resource.list_downloaded()