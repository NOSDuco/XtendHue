import React, { Component } from 'react';
import { Grid, Navbar, Jumbotron } from 'react-bootstrap';
import MainActivity from './MainActivity';

class App extends Component {
  render() {
    return (
      <div>
        <Navbar inverse fixedTop>
            <Grid>
                <Navbar.Header>
                    <Navbar.Brand>
                        <a href="/">XtendHue</a>
                    </Navbar.Brand>
                <Navbar.Toggle />
                </Navbar.Header>
            </Grid>
        </Navbar>
        <Jumbotron>
            <MainActivity />
        </Jumbotron>
      </div>
    );
  }
}

export default App;
