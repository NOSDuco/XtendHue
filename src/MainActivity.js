import React, { Component } from 'react';
import FindHueBridges from './FindHueBridges';
import { HueApi } from 'node-hue-api';
import fs from 'fs';
import nconf from 'nconf';


class MainActivity extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            hueConnected: false
        };
        let storeOpt = {};
        let path = 'config.json';
        storeOpt.path = 'config.json';
        this.config = nconf;
        this.connectHue = this.connectHue.bind(this);
        this.foundHueBridge = this.foundHueBridge.bind(this);
        this.showVersionInfo = this.showVersionInfo.bind(this);
        this.config.argv().env().file({ file: 'config/default.json' });
    }

    componentDidMount() {
        this.setState({
            isLoading: true,
        });

        let host = this.config.get('hub-host');
        let user = this.config.get('hub-user');
        console.log('Host: ' + host);
        console.log('User: ' + user);
        if(host && user){
            //if IP and username found
            this.setState({
                ip: host,
                username: user,
            });
            this.connectHue();
        }else{
            this.setState({
                isLoading: false,
                selectBridge: true,
            });
        }
    }

    connectHue(){
        console.log('Attempting to get hue version');
        console.log('IP: ' + this.state.ip + ' Username: ' + this.state.username);
        this.hueAPI = new HueApi(this.state.ip, this.state.username);
        this.hueAPI.getVersion().then(this.showVersionInfo).done();
    }

    showVersionInfo(result){
        console.log('Showing version info...setting state...');
        this.setState({
            isLoading: false,
            selectBridge: false,
            message: JSON.stringify(result, null, 2),
        });
    }

    foundHueBridge(){
        console.log('Found hue bridge in MainActivity');
        this.setState({
            selectBridge: false,
        });
        this.componentDidMount();
    }

    render() {
        if(this.state.isLoading){
            return(
                <div>
                    <center><h2>Loading...</h2></center>
                </div>
            );
        }else if(this.state.selectBridge){
            return (
                <div>
                    <FindHueBridges foundHueBridge={ this.foundHueBridge } config={ this.config } />
                </div>
            );
        }else{
            return (
                <div>
                    <center>
                        <h2>Connected:</h2>
                        <p>{ this.state.message }</p>
                    </center>
                </div>
            );
        }
    }
}

export default MainActivity;
