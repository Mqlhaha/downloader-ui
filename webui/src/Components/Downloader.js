import React from 'react'
import {GeistProvider,CssBaseline, Page,Text, Grid, Card, Input, Spacer, Button, Select, Checkbox, Divider, Tooltip} from '@geist-ui/react'
import {Check, Download} from '@geist-ui/react-icons'
import axios from 'axios'
import config from '../config'

class Downloader extends React.Component{
    constructor(props){
        super(props)

        this.state = {
            dl_backend : 'you-get',
            dl_url : '',
            dl_extra_settings : 'false',

            dl_path : '',

            dl_playlist : false,

            dl_proxy : 'no',
            dl_proxy_host : '',
            dl_proxy_port : '',
            dl_proxy_username : '',
            dl_proxy_password : '',

            dl_wget_filename : '',
            dl_wget_cmdargs : '',
            dl_wget_force_args : false,

            button_msg : 'Download',
            button_type : 'secondary'
        }
        this.handle_input_change = this.handle_input_change.bind(this);

        this.handle_submit = this.handle_submit.bind(this);
        this.handle_extra_settings = this.handle_extra_settings.bind(this);
        this.handle_backend_select = this.handle_backend_select.bind(this);
        this.handle_proxy_select = this.handle_proxy_select.bind(this);
        this.handle_playlist_check = this.handle_playlist_check.bind(this);
        this.handle_wget_force_args = this.handle_wget_force_args.bind(this);
    }

    handle_input_change(event){
        const native_event = event.nativeEvent;
        const attr = native_event.target.attributes;
        const type = attr['type'].nodeValue;
        const value = event.target.value;

        this.setState({
            [type]:value,
            button_msg : 'Download',
            button_type : 'secondary'
        })
    }

    handle_extra_settings(event){
        if(event.target.checked === true){
            this.setState({
                dl_extra_settings : 'true'
            })
        }
        else{
            this.setState({
                dl_extra_settings : 'false'
            })
        }
        console.log('toggle!')
    }

    handle_backend_select(val){
        this.setState({
            dl_backend : val
        })
    }

    handle_proxy_select(val){
        this.setState({
            dl_proxy : val
        })
    }

    handle_playlist_check(){
        let new_val = ! this.state.dl_playlist;
        this.setState({
            dl_playlist : new_val
        })
    }

    handle_wget_force_args(key){
        let new_val = ! this.state.dl_wget_force_args;
        this.setState({
            dl_wget_force_args : new_val,
        })
    }

    handle_submit(){
        this.setState({
            button_msg : 'Done',
            button_type : 'success'
        })
        let baseUrl = config['baseUrl']
        const url = 'http://'+baseUrl+'/submit';
        axios({
            url : url,
            method: "post",
            data : {
                'dl_url' : this.state.dl_url,
                'dl_backend' : this.state.dl_backend,
                'dl_extra_settings' : this.state.dl_extra_settings,

                'dl_path' : this.state.dl_path,

                'dl_proxy' : this.state.dl_proxy,
                'dl_proxy_host' : this.state.dl_proxy_host,
                'dl_proxy_port' : this.state.dl_proxy_port,
                'dl_proxy_username' : this.state.dl_proxy_username,
                'dl_proxy_password' : this.state.dl_proxy_password,

                'dl_playlist' : this.state.dl_playlist,

                'dl_wget_filename' : this.state.dl_wget_filename,
                'dl_wget_cmdargs' : this.state.dl_wget_cmdargs,
                'dl_wget_force_args' : this.state.dl_wget_force_args,
            },
        })
        
    }

    render(){
        return(
            <Card shadow style={{textAlign:"center"}}>
                <Input label="URL" placeholder="Enter the url of a video" 
                value={this.state.dl_url} type="dl_url" onChange={this.handle_input_change}
                width="100%" size="large"></Input>
                <Spacer y={.5} />
                <Checkbox initialChecked={false} onClick={this.handle_extra_settings}>Use Extra Settings</Checkbox>
                {this.state.dl_extra_settings === 'true' ?
                <div>
                    <Divider y={1}/>
                    <Text p b style={{margin:"1%"}}>Download tool</Text>
                    <Select placeholder="select download tool" onChange={this.handle_backend_select} initialValue={this.state.dl_backend}>
                        <Select.Option value="you-get">you-get</Select.Option>
                        <Select.Option value="youtube-dl">youtube-dl</Select.Option>
                        <Select.Option value="wget" >wget</Select.Option>
                    </Select>
                    <Divider y={1} />
                    <Text p b style={{margin:"1%"}}>Download path</Text>
                    <Input label="path" type="dl_path" placeholder="Enter the relative path"
                            value={this.state.dl_path} onChange={this.handle_input_change}
                    />
                    <Divider y={1} />
                    <Text p b style={{margin:"1%"}}>Proxy</Text>
                    <Select placeholder="select proxy" onChange={this.handle_proxy_select} initialValue={this.state.dl_proxy}>
                        <Select.Option value="http">http proxy</Select.Option>
                        <Select.Option value="socks">socks proxy</Select.Option>
                        <Select.Option value="no">no proxy</Select.Option>
                    </Select>
                    {this.state.dl_proxy === 'no' ? "" :
                        <div>
                            <Spacer y={.5} />
                            <Input label="host" type="dl_proxy_host" placeholder="Enter the proxy host"
                            value={this.state.dl_proxy_host} onChange={this.handle_input_change}></Input>
                            <Spacer y={.5} />
                            <Input label="port" type="dl_proxy_port" placeholder="Enter the proxy port"
                            value={this.state.dl_proxy_port} onChange={this.handle_input_change}
                            ></Input>
                            {this.state.dl_proxy === 'socks' ? 
                                <div>
                                    <Spacer y={.5} />
                                    <Input label="username" type="dl_proxy_username" placeholder="(Optional)"
                                        value={this.state.dl_proxy_username} onChange={this.handle_input_change}
                                    ></Input>
                                    <Spacer y={.5} />
                                    <Input label="password" type="dl_proxy_password" placeholder="(Optional)"
                                        value={this.state.dl_proxy_password} onChange={this.handle_input_change}
                                    ></Input>
                                </div>
                            : ""}
                        </div>
                    }
                    <Divider y={1}/>
                    {this.state.dl_backend === "wget" ?
                    <div>
                        <Text p b>Wget settings</Text>
                        <Input label="filename" type="dl_wget_filename" placeholder="filename for wget"
                            value={this.state.dl_wget_filename} onChange={this.handle_input_change}
                        />
                        <Spacer y={.5} />
                        <Input label="cmd args" type="dl_wget_cmdargs" placeholder="command line args for wget"
                            value={this.state.dl_wget_cmdargs} onChange={this.handle_input_change}/>
                        <Spacer y={.5} />
                        <Checkbox initialChecked={this.state.dl_wget_force_args} 

                        onClick={this.handle_wget_force_args} >
                            <Tooltip text={'if enabled, all args will be ignored except cmd args'}>
                                Force CMD args
                            </Tooltip>
                        </Checkbox>
                        <Divider y={1} />
                    </div>
                    :""}
                    <Text p b style={{margin:"1%"}}>Other</Text>
                    <Checkbox initialChecked={this.state.dl_playlist} onClick={this.handle_playlist_check} disabled={!(this.state.dl_backend === 'you-get')}>
                        <Tooltip text={'Only valid for you-get'}>
                            target is a playlist
                        </Tooltip>
                    </Checkbox>
                    <Divider y={1}/>
                </div>
                : 
                <Spacer y={.5} />
                }
                <Button ghost type={this.state.button_type} size="small" 
                icon={<Download />} onClick={this.handle_submit}>
                    {this.state.button_msg}</Button>
            </Card>
        )
    }
}


export default Downloader;