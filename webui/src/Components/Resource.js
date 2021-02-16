import React from 'react'
import {Card, Divider, Text, Tree} from '@geist-ui/react'
import axios from 'axios'
import config from '../config'

class Resource extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            file_list : []
        }

        this.fetch_list_data = this.fetch_list_data.bind(this)
        this.gen_tree = this.gen_tree.bind(this)
    }

    fetch_list_data(){
        const baseUrl = config['baseUrl']
        const fetch_url = 'http://' + baseUrl + ':21991/list'
        axios({
            url:fetch_url,
            method:'get'
        }).then(res=>{
            this.setState({
                file_list:res.data
            })
        })
    }

    gen_tree(){
        this.fetch_list_data()
        let tree_arr = []
        let file_list = this.state.file_list
        file_list.forEach(element => {
            tree_arr.push(
                <Tree.File style={{overflow:"hidden"}} name={element}></Tree.File>
            )
        });
        return tree_arr;
    }

    render(){
        return(
            <Card shadow style={{textAlign:"center"}}>
                <Text p b >Downloaded Resources</Text>
                <Divider y={.5} />
                <Tree>
                    {this.gen_tree()}
                </Tree>
            </Card>
        )
    }
}

export default Resource;