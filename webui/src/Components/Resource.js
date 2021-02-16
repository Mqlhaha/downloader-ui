import React from 'react'
import {Capacity, Card, Divider, Modal, Text, Tree} from '@geist-ui/react'
import axios from 'axios'
import config from '../config'

class Resource extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            file_list : this.fetch_list_data(),
            modal_open : false,
            current_path : "",
            system_info : {
                'disk_usage' : 100,
            },
        }

        this.fetch_list_data = this.fetch_list_data.bind(this);
        this.handle_click_file = this.handle_click_file.bind(this);
        this.close_modal = this.close_modal.bind(this);
        this.delete_file = this.delete_file.bind(this);

    }

    fetch_list_data(){
        const baseUrl = config['baseUrl']
        const fetch_url = 'http://' + baseUrl + '/list'
        axios({
            url:fetch_url,
            method:'get'
        }).then(res=>{
            let resource_list = res.data.file_list;
            let system_info = res.data.system_info;
            let file_list = []
            resource_list.forEach(element => {
                file_list.push({
                    type: 'file',
                    name: element,
                })       
            });
            this.setState({
                file_list: file_list,
                system_info: system_info
            })
            console.log(this.state.system_info)
        })
    }

    handle_click_file(path){
        this.setState({
            current_path : path,
            modal_open :true
        })
    }

    close_modal(){
        this.setState({
            modal_open : false
        })
    }

    delete_file(){
        const baseUrl = config['baseUrl']
        const post_url = 'http://' + baseUrl + '/delete'

        axios({
            url: post_url,
            method: 'post',
            data: {
                'file_name': this.state.current_path
            }
        })

        this.setState({
            modal_open: false,
            current_path : ''
        })
    }

    render(){
        console.log(this.state.system_info["disk_usage"])
        return(
            <Card shadow style={{textAlign:"center"}}>
                <Card.Body>
                    <Text p b >Downloaded Resources</Text>
                    <Divider y={.5} />
                    <Tree onClick={this.handle_click_file} value={this.state.file_list} style={{overflow:"hidden"}}>
                    </Tree>
                    <Modal open={this.state.modal_open} onClose={this.close_modal}>
                        <Modal.Subtitle>{this.state.current_path}</Modal.Subtitle>
                        <Modal.Action disabled>Play</Modal.Action>
                        <Modal.Action passive onClick={this.delete_file}>Delete</Modal.Action>
                    </Modal>
                </Card.Body>
                <Card.Footer style={{textAlign:"center"}}>
                    <Text style={{width:"50%"}}>Disk Usage</Text>
                    <Capacity value={this.state.system_info['disk_usage']} style={{width:"50%"}}/>
                </Card.Footer>
            </Card>
        )
    }
}

export default Resource;