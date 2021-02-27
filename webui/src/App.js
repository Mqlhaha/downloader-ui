import React from 'react'
import {GeistProvider,CssBaseline, Page,Text, Grid, Card, Input, Spacer, Button, Select, Checkbox, Divider} from '@geist-ui/react'
import Downloader from './Components/Downloader'
import Resource from './Components/Resource'
import Player from './Components/Player'
import Tasks from './Components/Tasks'

import {
    BrowserRouter as Router,
    Route
} from 'react-router-dom'

class MainPage extends React.Component{
    render(){
        return(
            <Page>
                <Page.Header>
                    <Text p b h1 style={{textAlign:'center'}}>Downloader webui</Text>
                </Page.Header>
                <Page.Body>
                    <Grid.Container gap={2}>
                        <Grid xs={2} lg={1}></Grid>
                        <Grid xs={20} lg={10.5}>
                            <Downloader></Downloader>
                        </Grid>
                        <Grid xs={2} lg={.5}></Grid>
                        <Grid xs={2} lg={.5}></Grid>
                        <Grid xs={20} lg={10.5}>
                            <Resource></Resource>
                        </Grid>
                        <Grid xs={2} lg={1}></Grid>
                        <Grid xs={2} lg={2}/>
                        <Grid xs={20} lg={20}>
                            <Tasks />
                        </Grid>
                        <Grid xs={2} lg={20}/ >
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
                <Router>
                    <Route exact path='/'>
                        <MainPage />
                    </Route>
                    <Route path="/player">
                        <Player />
                    </Route>
                </Router>
            </GeistProvider>
        )
    }
}

export default App;