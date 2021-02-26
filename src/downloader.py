import os
import subprocess
from db import db_controller 

class Downloader:
    def you_get_backend(self,data,url: str,dl_path: str, args_list: str):
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

        if data['dl_playlist'] == True:
            args_list = "%s --playlist "%(args_list)

        bash_file = os.path.dirname(os.path.abspath(__file__)) + '/you-get.sh'

        db_controller.add_url_to_queue(url,'you-get')
        cmd = "bash %s %s %s %s"%(bash_file,dl_path,args_list,url)
        return cmd

    def youtube_dl_backend(self, data, url:str, dl_path: str, args_list: str):
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

        if data['dl_playlist'] == True:
            args_list = '%s --yes-playlist '%(args_list)
                
        bash_file = os.path.dirname(os.path.abspath(__file__)) + '/youtube-dl.sh'
        db_controller.add_url_to_queue(url,'youtube-dl')
        cmd = "bash %s %s %s %s"%(bash_file,dl_path,args_list,url)
        return cmd

    def wget_backend(self,data, url:str, dl_path: str, args_list: str):
        if data['dl_wget_force_args']:
            args_list = data['dl_cmdargs']
            bash_file = os.path.dirname(os.path.abspath(__file__)) + '/wget.sh'
            cmd = "bash %s %s"%(bash_file,args_list)
            subprocess.run([cmd],shell=True)
            return 'Success'

        proxy = data['dl_proxy']
        if proxy != 'no':
            proxy_host = data['dl_proxy_host']
            proxy_port = data['dl_proxy_port']

            if proxy == 'http':
                args_list = "%s -e use_proxy=yes -e http_proxy=%s:%s "%(args_list,proxy_host,proxy_port)
        
        output_file = "-O %s/%s"%(dl_path,data['dl_wget_filename'])
        bash_file = os.path.dirname(os.path.abspath(__file__)) + '/wget.sh'
        cmd = "bash %s %s %s %s"%(bash_file,output_file,args_list,url)
        return cmd

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

            #use default settings
            if data['dl_extra_settings'] == 'false':
                bash_file = work_path + '/you-get.sh'
                db_controller.add_url_to_queue(url,'you-get')
                cmd = "bash %s %s %s %s"%(bash_file,dl_root_path,args_list,url)
                subprocess.run([cmd],shell=True)
                return 'Success'

            dl_path = dl_root_path

            if data['dl_path'] != '':
                dl_path = dl_root_path + '/' + data['dl_path']

            if data['dl_cmdargs'] != '':
                args_list = "%s %s" % (args_list,data['dl_cmdargs'])

            cmd = "echo NO CMD GOT!"
            if data['dl_backend'] == 'you-get':
                cmd = self.you_get_backend(data,url,dl_path,args_list)
            elif data['dl_backend'] == 'youtube-dl':
                cmd = self.youtube_dl_backend(data,url,dl_path,args_list)
            elif data['dl_backend'] == 'wget':
                cmd = self.wget_backend(data,url,dl_path,args_list)
            else:
                raise Exception('NoBackend')
            subprocess.run([cmd],shell=True)
        except Exception as err:
            if err.args == 'NoBackend':
                print('no backend found')
            elif err.args == 'NoURL':
                print('no url provided')
            else:
                print('unknown err %s'%(err.args))           

        return 'Failed'

downloader = Downloader()