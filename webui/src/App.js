import React from 'react'
import {GeistProvider,CssBaseline, Page,Text, Grid, Card, Input, Spacer, Button, Select, Checkbox, Divider} from '@geist-ui/react'
import {Download} from '@geist-ui/react-icons'
import axios from 'axios'
import config from './config'

class MainPage extends React.Component{
    constructor(props){
        super(props)

        this.state = {
            dl_backend : 'you-get',
            dl_url : '',
            dl_extra_settings : 'false',

            dl_proxy : 'no',
            dl_proxy_url : '',
            dl_proxy_username : '',
            dl_proxy_password : '',


            button_msg : 'Download',
            button_type : 'secondary'
        }
        this.handle_input_change = this.handle_input_change.bind(this);
        this.handle_submit = this.handle_submit.bind(this);
        this.handle_extra_settings = this.handle_extra_settings.bind(this);
        this.handle_backend_select = this.handle_backend_select.bind(this);
        this.handle_proxy_select = this.handle_proxy_select.bind(this);
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

    handle_submit(){
        this.setState({
            button_msg : 'Done',
            button_type : 'success'
        })
        let baseUrl = config['baseUrl']
        const url = 'http://'+baseUrl+':21991/submit';
        axios({
            url : url,
            method: "post",
            data : {
                'dl_url' : this.state.dl_url,
                'dl_backend' : this.state.dl_backend
            },
        })
        
    }

    render(){
        return(
            <Page>
                <Page.Header>
                    <Text p b h1 style={{textAlign:'center'}}>You-get webui</Text>
                </Page.Header>
                <Page.Body>
                    <Grid.Container gap={2}>
                        <Grid xs={4} md={6}></Grid>
                        <Grid xs={16} md={12}>
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
                                    <Select placeholder="select download tool" onChange={this.handle_backend_select}>
                                        <Select.Option value="you-get">you-get</Select.Option>
                                        <Select.Option value="youtube-dl">youtube-dl</Select.Option>
                                    </Select>
                                    <Divider y={1} />
                                    <Text p b style={{margin:"1%"}}>Proxy</Text>
                                    <Select placeholder="select proxy" onChange={this.handle_proxy_select}>
                                        <Select.Option value="http">http proxy</Select.Option>
                                        <Select.Option value="socks">socks proxy</Select.Option>
                                        <Select.Option value="no">no proxy</Select.Option>
                                    </Select>
                                    {this.state.dl_proxy === 'no' ? "" :
                                        <div>
                                            <Spacer y={.5} />
                                            <Input label="host" type="dl_proxy_url" placeholder="Enter the proxy host"
                                            value={this.state.dl_proxy_url} onChange={this.handle_input_change}></Input>
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
                                </div>
                                : 
                                <Spacer y={.5} />
                                }
                                <Button ghost type={this.state.button_type} size="small" 
                                icon={<Download />} onClick={this.handle_submit}>
                                    {this.state.button_msg}</Button>
                            </Card>
                        </Grid>
                        <Grid xs={4} md={6}></Grid>
                    </Grid.Container>
                </Page.Body>
            </Page>
        )
    }
}

class App extends React.Component{
    render(){
        return(
            <GeistProvider>
                <CssBaseline />
                <MainPage />
            </GeistProvider>
        )
    }
}

export default App;