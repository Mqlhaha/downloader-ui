import React from 'react'
import {GeistProvider,CssBaseline, Page,Text, Grid, Card, Input, Spacer, Button, Select, Checkbox, Divider} from '@geist-ui/react'
import Downloader from './Components/Downloader'
import Resource from './Components/Resource'

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