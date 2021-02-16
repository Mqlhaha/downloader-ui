import os
import json

class Resource:
    def list_downloaded(self):
        download_path = os.path.dirname(os.path.abspath(__file__)) + '/dl'
        file_list = os.listdir(download_path)
        file_list_str = json.dumps(file_list)
        return file_list_str
    
    def delete_file(self,path: str):
        file_path = os.path.dirname(os.path.abspath(__file__)) + '/dl/' + path
        if not os.path.exists(file_path):
            print("ignored")
            return "IGNORED"
        os.remove(file_path)
        print("deleted")
        return "DONE"

resource = Resource()

if __name__ == '__main__':
    resource.list_downloaded()