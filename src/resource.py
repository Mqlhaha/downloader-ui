import os
import json
import psutil

class Resource:
    def list_downloaded(self):
        download_path = os.path.dirname(os.path.abspath(__file__)) + '/dl'

        def get_file_list(path:str):
            ret_list = []
            item_list = os.listdir(path)
            for item in item_list:
                my_path = path + '/' + item
                if os.path.isdir(my_path) == True:
                    sub_file_list = get_file_list(my_path)
                    ret_list.append({
                        'type': 'directory',
                        'name': item,
                        'files': sub_file_list
                    })
                else:
                    ret_list.append({
                        'type': 'file',
                        'name': item
                    })
            return ret_list

        file_list = get_file_list(download_path)

        system_info = self.query_system_info()

        ret_obj = {
            'file_list' : file_list,
            'system_info' : system_info
        }
        ret_str = json.dumps(ret_obj)
        return ret_str

    def query_system_info(self):
        ret_obj = {}
        cur_path = os.path.dirname(os.path.abspath(__file__)) + '/dl'
        disk_usage_raw = psutil.disk_usage(cur_path)
        ret_obj = {
            'disk_usage' : disk_usage_raw.percent
        }

        return ret_obj
    
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
    print(resource.list_downloaded())