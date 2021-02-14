import React from 'react'
import {GeistProvider,CssBaseline, Page,Text, Grid, Card, Input, Spacer, Button, useToasts} from '@geist-ui/react'
import {Download} from '@geist-ui/react-icons'
import axios from 'axios'

class MainPage extends React.Component{
    constructor(props){
        super(props)

        this.state = {
            dl_backend : 'you-get',
            dl_url : '',
            button_msg : 'Download',
            button_type : 'secondary'
        }
        this.handle_input_change = this.handle_input_change.bind(this);
        this.handle_submit = this.handle_submit.bind(this);
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

    handle_submit(){
        this.setState({
            button_msg : 'Done',
            button_type : 'success'
        })
        const url = 'http://localhost:21991/submit';
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
                                <Input label="URL" placeholder="Enter url of video" 
                                value={this.state.dl_url} type="dl_url" onChange={this.handle_input_change}
                                width="100%" size="large"></Input>
                                <Spacer y={.5}></Spacer>
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