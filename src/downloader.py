import os
import subprocess
from db import db_controller 

class Downloader:
    def dl_something(self,data):
        try:
            if data['dl_url'] == None:
                raise Exception('NoURL')
            url = data['dl_url']
            #if db_controller.if_url_is_added(url) == True:
                #print('existed!')
                #return 'Ignore'
            
            args_list = ""
            work_path = os.path.dirname(os.path.abspath(__file__)) 
            dl_root_path = work_path + '/dl'

            if data['dl_extra_settings'] == 'false':
                bash_file = work_path + '/you-get.sh'
                db_controller.add_url_to_queue(url,'you-get')
                cmd = "bash %s %s %s %s"%(bash_file,dl_root_path,args_list,url)
                subprocess.run([cmd],shell=True)
                return 'Success'

            dl_path = dl_root_path

            if data['dl_path'] != '':
                dl_path = dl_root_path + '/' + data['dl_path']

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
                    else:
                        raise Exception("No Proxy mode %s"%proxy)


                bash_file = os.path.dirname(os.path.abspath(__file__)) + '/you-get.sh'

                db_controller.add_url_to_queue(url,'you-get')
                cmd = "bash %s %s %s %s"%(bash_file,dl_path,args_list,url)
                subprocess.run([cmd],shell=True)
                return 'Success'
                

            elif data['dl_backend'] == 'youtube-dl':
                proxy = data['dl_proxy']
                if proxy != 'no':
                    proxy_host = data['dl_proxy_host']
                    proxy_port = data['dl_proxy_port']

                    if proxy == 'http':
                        args_list = "%s --proxy http://%s:%s"%(args_list,proxy_host,proxy_port)
                    elif proxy == 'socks':
                        if data['dl_proxy_username'] != '':
                            proxy_username = data['dl_proxy_username']
                            proxy_password = data['dl_proxy_password']
                            args_list = "%s --proxy socks5://%s:%s@%s:%s"%(args_list,proxy_username,proxy_password,proxy_host,proxy_port)
                        else:
                            args_list = "%s --proxy socks5://%s:%s"%(args_list,proxy_host,proxy_port)
                    else:
                        raise Exception("No Proxy mode %s "%proxy)
                
                bash_file = os.path.dirname(os.path.abspath(__file__)) + '/youtube-dl.sh'
                db_controller.add_url_to_queue(url,'youtube-dl')
                cmd = "bash %s %s %s %s"%(bash_file,dl_path,args_list,url)
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