import subprocess
import json

class Task:
    cmd :str = ""
    url :str = ""
    
    pipe = None

    def __init__(self,cmd :str,url :str):
        self.cmd = cmd
        self.url = url
        self.pipe = subprocess.Popen([cmd],shell=True,stdout=subprocess.PIPE,universal_newlines=True)

    def check_terminate(self):
        if self.pipe.poll() == None:
            return False
        return True

    def fetch_log(self):
        if self.pipe.poll() != None:
            return "Process is stopped!"
        ret_text = ""
        for line in self.pipe.stdout:
            ret_text = ret_text + "\n" + line 
        return ret_text

class Task_queue:
    queue = []

    def check_task(self):
        for task in self.queue:
            if task.check_terminate() == True:
                self.queue.remove(task)

    def add_task(self, cmd, url):
        new_task = Task(cmd,url)
        self.queue.append(new_task)
    
    def fetch_single_task(self,index):
        return self.queue[index].fetch_log()


    def fetch_task_list(self):
        """
            should return like {
                "task_list":[
                    {
                        "index" : index1,
                        "url" : url1,
                        "cmd" : cmd1
                    },
                    {
                        "index" : index2,
                        "url" : url2,
                        "cmd" : cmd2
                    }
                ]
            }
        """
        self.check_task()
        task_list = []
        for index, item in enumerate(self.queue):
            task_list.append({
                "index" : index,
                "url" : item.url,
                "cmd" : item.cmd
            })
        ret_obj = {
            "task_list" : task_list
        }

        ret_str = json.dumps(ret_obj)
        return ret_str
        

task_queue = Task_queue()
