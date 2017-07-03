import React from 'react';

export default class InputContainer extends React.Component {

	handleKeyPress(event) {
		if (event.key === 'Enter') {
			const message = this.refs.input.value;
			if (message) {
				this.refs.input.value = '';
				this.props.sendMessage(message);
			}
		}
	}

	render() {

		const inputStyle = {
			bottom: '0',
			fontSize: '100%',
			height: '60px',
			outline: 'none',
			paddingLeft: '10px',
			position: 'absolute',
			width: '100%'
		}

		return (
			<div>
        		<input style={inputStyle} onKeyPress={this.handleKeyPress.bind(this)} type='text' placeholder='Enter a message' ref='input'/>
          	</div>
		);
	}
}

