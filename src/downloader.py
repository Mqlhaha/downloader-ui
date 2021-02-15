import os
import subprocess
from db import db_controller 

class Downloader:
    def dl_something(self,data):
        try:
            if data['dl_url'] == None:
                raise Exception('NoURL')
            url = data['dl_url']
            if db_controller.if_url_is_added(url) == True:
                print('existed!')
                return 'Ignore'
            
            args_list = ""
            
            if data['dl_backend'] == 'you-get':
                proxy = data['dl_proxy']
                if proxy == 'no':
                    args_list = args_list + "--no-proxy"
                else:
                    proxy_host = data['dl_proxy_host']
                    proxy_port = data['dl_proxy_port']
                    if proxy == 'http':
                        args_list = "%s --http-proxy %s:%s"%(args_list,proxy_host,proxy_port)
                    elif proxy == 'socks':
                        if data['dl_proxy_username'] !='':
                            proxy_username = data['dl_proxy_username']
                            proxy_password = data['dl_proxy_password']
                            args_list = "%s --socks-proxy %s:%s@%s:%s"%(args_list,proxy_username,proxy_password,proxy_host,proxy_port)
                        else:
                            args_list = "%s --socks-proxy %s:%s"%(args_list,proxy_host,proxy_port)

                bash_file = os.path.dirname(os.path.abspath(__file__)) + '/you-get.sh'

                db_controller.add_url_to_queue(url,'you-get')
                cmd = "bash %s %s %s"%(bash_file,args_list,url)
                subprocess.run([cmd],shell=True)
                return 'Success'
            else:
                raise Exception('NoBackend')
        except Exception as err:
            if err.args == 'NoBackend':
                print('no backend found')
            elif err.args == 'NoURL':
                print('no url provided')
            else:
                print('unknown err %s'%(err.args))           

        return 'Failed'

downloader = Downloader()