import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { ListGroup, ListGroupItem } from 'react-bootstrap';

import { getUsername } from '../actions/usernameActions';
import * as messageActions from '../actions/messagesActions';

import InputContainer from '../components/InputContainer';

const io = require('socket.io-client');
let socket = io('http://localhost:3001/');

class ChatRoom extends React.Component {

	constructor(props) {
		super(props);
		
		socket.on('user joined', (data) => {
			var content1 = data.username === this.props.username ? 'You joined the chat': data.username.concat(' joined the chat');
    		var msg1 = {
      			_id: Date.now(),
      			content: content1,
      			username: "System",
      		};

      		var content2 = 'There are ' + data.numberOfUsers + ' participants';
    		var msg2 = {
      			_id: Date.now() + 1,
      			content: content2,
      			username: "System",
      		};
      		this.addSystemMessage(msg1);
      		this.addSystemMessage(msg2);
    	});

    	socket.on('receive new message', (data) => {
			this.addMessageToList(data);
    	});
  	}

	componentWillMount() {
		socket.emit('connected', this.props.username);
		this.props.dispatch(getUsername());
		this.props.dispatch(messageActions.fetchMessages());
	}

	componentDidMount() {
		this.scrollToBottom();
	}

	componentDidUpdate() {
		this.scrollToBottom();
	}

	componentWillUnmount() {  
    	socket.emit('disconnect');
 	}

	createMessage(content) {

		const { username } = this.props;

		var new_message = {
      		_id: Date.now(),
      		content: content,
      		username: username
    	}
    	this.props.dispatch(messageActions.addMessage(new_message));
    	this.props.dispatch(messageActions.storeMessage(new_message));
    	socket.emit('new message', new_message);
	}

	addMessageToList(data) {
		this.props.dispatch(messageActions.addMessage(data));
	}

	addSystemMessage(data) {

		this.props.dispatch(messageActions.addMessage(data));
	}

	scrollToBottom() {
  		const node = ReactDOM.findDOMNode(this.messagesEnd);
  		node.scrollIntoView({ behavior: "smooth" });
	}

	mapMessages(messages) {
		var color = {
			color: "blue",
		}

		return messages.map(message =>
			<li key={message._id}>
				<span style={color}>{message.username}&nbsp;&nbsp;</span>
				{message.content}
			</li>
		);
	}

	render() {

		const messageBox = {
			border: '2px solid grey',
			bottom: '10%',
			left: '10%',
			margin: 'auto',
			position: 'absolute',
			right: '10%',
			top: '10%'
		}

		const scroll = {
			bottom: '60px',
			left: '0',
			margin: 'auto',
			overflowY: 'scroll',
			position: 'absolute',
			right: '0',
			top: '0'
		}

		const ul = {
			fontFamily: 'HelveticaNeue-Light',
			fontSize: '130%',
  			listStyleType: 'none',
  			padding: '10px',
  			wordWrap: 'break-word'
		}

		const mappedMessages = this.mapMessages(this.props.messages);

		return (
			<div style={messageBox}>
				<div style={scroll}>
					<ul style={ul}>{mappedMessages}</ul>
					<div ref={(el) => { this.messagesEnd = el; }} />
				</div>
				<InputContainer sendMessage={this.createMessage.bind(this)}/>
			</div>
		);
	}
}

export default connect((store) => {
	return {
		username: store.username.username,
		messages: store.messages.messages,
	};
})(ChatRoom);

