import React, { Component } from 'react';
import PhillipsHueApi, { HueApi } from 'node-hue-api';
import { Grid, Button } from 'react-bootstrap';

class FindHueBridges extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isSearching: true,
        };
        this.searchCallback = this.searchCallback.bind(this);
        this.connect = this.connect.bind(this);
        this.saveUser = this.saveUser.bind(this);
        this.writeCacheAndEnd = this.writeCacheAndEnd.bind(this);
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

    saveUser(result){
        //User registered successfully
        this.setState({
            isSearching: true,
            user: result,
        });
        this.writeCacheAndEnd();
        console.log('HueApi: New user created ' + this.state.user);
    }

    connect(evt){
        let host = evt.target.innerText;
        this.setState({
            isConnecting: true,
            host: host,
        }, function() { 
        let hueapi = new HueApi();
        console.log(host);
        console.log(this.state.host);
        let userDescription = 'XtendHue';
        hueapi.registerUser(host, userDescription)
            .then(this.saveUser)
            .fail(function (err) {
                console.log('Error:' + err);
            }).done();
        });
    }

    writeCacheAndEnd(){
        console.log('Writing cache and ending');
        console.log('Host: ' + this.state.host);
        console.log('User: ' + this.state.user);
        this.props.store.set('hub-host', this.state.host);
        this.props.store.set('hub-username', this.state.user);
        //this.props.foundHueBridge();
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

