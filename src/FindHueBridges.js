import React, { Component } from 'react';
import PhillipsHueApi, { HueApi } from 'node-hue-api';
import { Grid, Button } from 'react-bootstrap';

class FindHueBridges extends Component {

    constructor() {
        super();
        this.state = {
            isSearching: true,
        };
        this.searchCallback = this.searchCallback.bind(this);
        this.connect = this.connect.bind(this);
    }

    componentDidMount() {
        PhillipsHueApi.nupnpSearch(this.searchCallback);
    }

    searchCallback(err, result) {
        if (err) throw err;
        let hosts = [];
        result.forEach(function(bridge){
            hosts.push(bridge.ipaddress);
        });
        this.setState({
            hosts: hosts,
            isSearching: false,
        });
    }

    connect(evt){
        let host = evt.target.innerText;
        this.setState({
            isConnecting: true,
        });
        let hueapi = new HueApi();
        console.log(host);
        hueapi.createUser(host, 
            function(err, user){
                if (err) throw err;
                if (user) {
                    //User registered successfully
                    this.setState({
                        isSearching: true,
                        user: user,
                    });
                }
            }
        );
    }

    render() {
        if(this.state.isSearching){
            return(
                <div>
                    <center><h2>Searching for hue bridges...</h2></center>
                </div>
            );
        }else if(!this.state.isConnecting){
            let rows = [];
            this.rowIndex = 0;
            this.state.hosts.forEach(function(host) {
                rows.push(<p onClick={this.connect}>{ host }<br /></p>);
            }, this);
            
            return (
                <div>
                    <Grid>
                        <br />
                        {rows}
                        <Button>Search Again</Button>
                    </Grid>
                </div>
            );
        }else{
            return (
                <div>
                    <Grid>
                        <br />
                        <h4>Connecting</h4>
                        <p>Please press link button on Hue Bridge if you have not already.</p>
                    </Grid>
                </div>
            );
        }
    }
}

export default FindHueBridges;
