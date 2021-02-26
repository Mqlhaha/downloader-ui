import { Grid, Page } from '@geist-ui/react';
import React from 'react'
import ReactPlayer from 'react-player'

/*
This component is designed for a quick review of video.
It's currently not used. (2021/2/26)
*/
class Player extends React.Component{
    constructor(props){
        super(props)

        this.state = {
            player_url : "https://www.youtube.com/watch?v=ysz5S6PUM-U",
            player_config : {

            }
        }
        
    }


    render(){
        return(
            <Page>
                <Grid.Container gap={2}>
                    <Grid xs={1} lg={3}></Grid>
                    <Grid xs={22} lg={18}>
                        <ReactPlayer url={this.state.player_url} controls={true}
                        config={this.state.player_config}>
                        </ReactPlayer>
                    </Grid>
                    <Grid xs={1} lg={3}></Grid>
                </Grid.Container>
            </Page>
        )
    }
}

export default Player;