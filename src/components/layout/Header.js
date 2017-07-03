import React from 'react';
import { Navbar } from 'react-bootstrap';

export default class Header extends React.Component {
    render() {

        const style = {
            textAlign: "center"
        }

        return (
            <div style={style}>
            <Navbar>
                <Navbar.Header>
                    <Navbar.Brand>
                        <a href="/">Welcome to Socket Chat</a>
                    </Navbar.Brand>
                </Navbar.Header>
            </Navbar>
            </div>
        );
    }
}

