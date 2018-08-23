import React, { Component } from 'react';
import FindHueBridges from './FindHueBridges';
import { HueApi } from 'node-hue-api';
const NodeCache = require('node-cache');

class MainActivity extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            hueConnected: false
        };
        this.cache = new NodeCache( { stdTLL: 0, checkperoid: 0, deleteOnExpire: false });
        this.loadCache = this.loadCache.bind(this);
        this.connectHue = this.connectHue.bind(this);
    }

    componentDidMount() {
        this.setState({
            isLoading: true,
        });
        //Get IP from cache
        this.cache.mget(["hue-hub-ip-address", "hue-hub-username"], this.loadCache);
    }

    loadCache(err, values){
        if(values['hue-hub-ip-address'] && values['hue-hub-username']){
            //if IP and username found
            this.setState({
                ip: values['hue-hub-ip-address'],
                username: values['hue-hub-username']
            });
            this.connectHue();
        }
        this.setState({
            isLoading: false,
            selectBridge: true,
        });
    }

    connectHue(){
        this.hueAPI = new HueApi(this.state.ip, this.state.username);
        this.hueAPI.getVersion().then(function(result) {
            this.setState({
                isLoading: false,
                message: JSON.stringify(result, null, 2),
            });
        }).done();
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
                    <FindHueBridges />
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
