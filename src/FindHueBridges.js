import React, { Component } from 'react';

class MainActivity extends Component {

    constructor() {
        super();
        this.state = {
            isSearching: true,
        };
    }

    componentDidMount() {
    }


    render() {
        if(this.state.isSearching){
            return(
                <div>
                    <center><h2>Searching for hue bridges...</h2></center>
                </div>
            );
        }else{
            return (
                <div>
                    <center>
                        <h2>Connected:</h2>
                        <p>{{ this.state.message }}</p>
                    </center>
                </div>
            );
        }
    }
}

export default MainActivity;

