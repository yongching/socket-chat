import React from 'react';
import { connect } from 'react-redux';
import { Row, Col, Grid } from 'react-bootstrap';

import { setUsername } from '../actions/usernameActions';

class EnterUsername extends React.Component {

	handleKeyPress(event) {
        if(event.key === 'Enter') {
            const name = this.refs.input.value;
            if (name) {
                this.props.dispatch(setUsername(name));
                this.props.history.push("/chatroom");
            }
        }
	}

    render() {

        const centerDiv = {
            backgroundColor: '#F2F2F2',
            borderRadius: '2px',
            position: 'absolute',
            top: '35%',
            width: "100%"
        }

        const headingStyle = {
            fontFamily: 'HelveticaNeue-Light',
            fontSize: '200%',
            fontWeight: '100',
            paddingBottom: '15px',
            textAlign: 'center',
            width: '100%'
        }

        const inputStyle = {
            backgroundColor: 'transparent',
            border: 'none',
            borderBottom: '2px solid black',
            fontFamily: 'HelveticaNeue-Light',
            fontSize: '200%',
            fontWeight: '100',
            letterSpacing: '3px',
            outline: 'none',
            paddingBottom: '15px',
            textAlign: 'center',
            width: '100%'
        }

        return (
            <div style={centerDiv}>
                <Grid>
                    <Row className='show-grid'>
                        <Col mdOffset={4} md={4}>
                            <h3 style={headingStyle}>What's your nickname?</h3>
                            <input style={inputStyle} onKeyPress={this.handleKeyPress.bind(this)} type='text' ref='input' />
                        </Col>
                    </Row>
                </Grid>
            </div>
        );
    }
}

export default connect()(EnterUsername);

