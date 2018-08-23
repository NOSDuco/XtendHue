import React, { Component } from 'react';

class MainActivity extends Component {

    constructor() {
        super();
        this.state = {
            isLoading: true,
            hueConnected: false,
        };
        this.initHue = this.initHue.bind(this);
    }

    componentDidMount() {

    }

    initHue(){

    }

    render() {
        return (
            <div>
                <h2>This is a test</h2>
            </div>
        );
    }
}

export default MainActivity;
