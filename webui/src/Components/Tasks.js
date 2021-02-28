import React from 'react'
import axios from 'axios'
import config from '../config'
import { Button, ButtonGroup, Card, Container, Description, Divider, Dot, Loading, Modal, Spacer, Spinner, Table, Text } from '@geist-ui/react'
import { Loader } from '@geist-ui/react-icons'
import io from 'socket.io-client'

class Tasks extends React.Component{
    constructor(props){
        super(props)

        this.state = {
            tasks_list : {},
            fetched_tasks_list : false,
            
            fetch_single_task_index : -1,
            show_modal : false,
            modal_title : '',
            log_text : '',
        }

        this.fetch_tasks_list = this.fetch_tasks_list.bind(this);
        this.fetch_single_task = this.fetch_single_task.bind(this);
        this.modal_closer = this.modal_closer.bind(this);
    }

    componentDidMount(){
        this.fetch_tasks_list()
    }

    fetch_single_task(index,title){
        this.setState({
            show_modal: true,
            modal_title : title,
        })

        const baseUrl = config['baseUrl']
        const fetch_url = 'ws://' + baseUrl
        
        var sock = io(fetch_url)
        sock.on("connect", ()=>{
            console.log("connect!")
        })

        sock.emit('task_log',{'index':index})

        sock.on("trans_task_log",(data)=>{
            let new_log = this.state.log_text + '\n' + data
            console.log(data)
            this.setState({
                log_text : new_log
            })
        })
    }

    modal_closer(){
        this.setState({
            show_modal: false,
            log_text : ''
        })
    }
    

    fetch_tasks_list(){
        const baseUrl = config['baseUrl']
        const fetch_url = 'http://' + baseUrl + '/list_tasks'
        this.setState({
            fetched_tasks_list : false,
        })
        axios({
            url : fetch_url,
            method : "GET",
        }).then( res => {
            let task_list_raw = res.data['task_list']
            let task_list_displayed = []
            const action = (actions,row_data_raw) => {
                let row_data = row_data_raw.rowValue;
                return(
                    <Container>
                        <Button size="mini" onClick={()=>this.fetch_single_task(row_data.index,row_data.url)}>Log</Button>
                        <Spacer x={.5} />
                        <Button size="mini" type="warning" disabled={true}>Kill</Button>
                    </Container>
                )
            }

            task_list_raw.forEach(element => {
                task_list_displayed.push({
                    index : element.index,
                    cmd : element.cmd,
                    url : element.url,
                    action
                })
            });

            this.setState({
                tasks_list : task_list_displayed,
                fetched_tasks_list : true
            })
        })
    }


    render(){
        if(this.state.fetched_tasks_list === false){
            return(
                <Card shadow style={{textAlign:"center"}}>
                    <Card.Content>
                        <Text>Tasks</Text>
                        <Divider y={.5} />
                        <Loading>Loading</Loading>
                    </Card.Content>
                </Card>
            )
        }
        return(
            <Card style={{textAlign:"center"}}>
                <Card.Content>
                    <Text>Tasks</Text>
                    <Divider y={.5} />
                    <Table data={this.state.tasks_list}>
                        <Table.Column prop="index" label="index"></Table.Column>
                        <Table.Column prop="url" label="url"></Table.Column>
                        <Table.Column prop="action" label="action"></Table.Column>
                    </Table>
                </Card.Content>
                <Modal open={this.state.show_modal} onClose={this.modal_closer}>
                    <Modal.Title>{this.state.modal_title}</Modal.Title>
                    <Modal.Content>
                        {this.state.log_text === '' ? <Spinner />:
                        <Text>{this.state.log_text}</Text>}
                    </Modal.Content>
                </Modal>
                <Card.Footer>
                    <Button onClick={this.fetch_tasks_list} size="mini">Refresh</Button>
                </Card.Footer>
            </Card>
        )
    }
}

export default Tasks;