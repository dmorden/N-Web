import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';

import Avatar from 'material-ui/Avatar';
import Chip from 'material-ui/Chip';
import SvgIconFace from 'material-ui/svg-icons/action/face';

import IconButton from 'material-ui/IconButton';
import ActionHome from 'material-ui/svg-icons/navigation/close';

import logo from './NeuraSenseWebLogo.png';
import './App.css';
import '@material/layout-grid/dist/mdc.layout-grid.css';

const style = {
	margin: 12
};

const initialState = () => ({
	showContact: false,
	showContactSaved: false,
	submitStatusMessage: '',
	activeTextField: '',
	submitContactOk: false,
	name: '',
	email: '',
	phone: '',
	message: ''
});

class App extends Component {

	constructor(props) {
		super(props);
		this.state = initialState();
		this.onSubmitContactForm = props.onSubmitContactForm.bind(this);
		this.renderSubmitStatusMessage = this.renderSubmitStatusMessage.bind(this);
		this.closeContactForm = this.closeContactForm.bind(this);
		this.onSubmitContactFormAPIResponse = this.onSubmitContactFormAPIResponse.bind(this);
		this.renderContactFormInputFields = this.renderContactFormInputFields.bind(this);
		this.onChangeSetValue = this.onChangeSetValue.bind(this);
		this.onClickSubmitContactForm = this.onClickSubmitContactForm.bind(this);
		this.onFocusSetActiveTextField = this.onFocusSetActiveTextField.bind(this);
		this.onClickRenderContactForm = this.onClickRenderContactForm.bind(this);
	}

	onFocusSetActiveTextField(activeTextField) {
		this.setState({activeTextField});
	}

	onChangeSetValue(fieldName, fieldValue) {
		const updateState = {};
		updateState[fieldName] = fieldValue;
		this.setState(updateState);
	}

	onSubmitContactFormAPIResponse(errorMessage) {
		const submitStatusMessage = errorMessage ? errorMessage : `Thank you. We will be in touch soon.`;
		const submitContactOk = !errorMessage;
		this.setState({submitStatusMessage, submitContactOk});
		setTimeout(this.closeContactForm, 3000);
	}

	onClickSubmitContactForm() {
		this.setState({showContactSaved: true});
		this.onSubmitContactForm(this.state, this.onSubmitContactFormAPIResponse);
	}

	closeContactForm() {
		this.setState(initialState());
	}

	renderContactFormInputFields() {
		return (
			<div style={{position: 'relative'}}>
				<TextField
					className="App-dialog-textField"
					style={{margin: 0, display: 'block'}}
					onBlur={this.onFocusSetActiveTextField.bind(null, '')}
					onFocus={this.onFocusSetActiveTextField.bind(null, 'name')}
					onChange={event => this.onChangeSetValue('name', event.target.value)}
					hintText="First Last Name"
					floatingLabelText="Name"
					errorText={!this.state.name ? `this field is required` : ''}
				/>
				<TextField
					className="App-dialog-textField"
					style={{margin: 0, display: 'block'}}
					onBlur={this.onFocusSetActiveTextField.bind(null, '')}
					onFocus={this.onFocusSetActiveTextField.bind(null, 'email')}
					onChange={event => this.onChangeSetValue('email', event.target.value)}
					hintText="Email Address"
					floatingLabelText="Email"
					errorText={!this.state.email ? `this field is required` : ''}
				/>
				<TextField
					className="App-dialog-textField"
					style={{margin: 0, display: 'block'}}
					onBlur={this.onFocusSetActiveTextField.bind(null, '')}
					onFocus={this.onFocusSetActiveTextField.bind(null, 'phone')}
					onChange={event => this.onChangeSetValue('phone', event.target.value)}
					hintText="Phone Number"
					floatingLabelText="Phone"
				/>
				<TextField
					className="App-dialog-textField"
					style={{margin: 0, display: 'block'}}
					multiLine={true}
					rows={1}
					onBlur={this.onFocusSetActiveTextField.bind(null, '')}
					onFocus={this.onFocusSetActiveTextField.bind(null, 'message')}
					onChange={event => this.onChangeSetValue('message', event.target.value)}
					hintText="Short Message"
					floatingLabelText="Message"
				/>
			</div>
		);
	}

	renderSubmitStatusMessage() {

		const status = <Chip className="App-submitStatusMessage-chip"
							 style={{margin: '23px auto', position: 'absolute'}}>
			<Avatar color="#444" icon={<SvgIconFace />}/>
			{this.state.submitStatusMessage}
		</Chip>;

		const greeting = this.state.submitStatusMessage ? status : ''
			;

		return (
			<div className="App-messages">
				{greeting}
			</div>
		);

	}

	renderContactForm() {

		if (this.state.showContact !== true) {
			return null;
		}

		this.refs.appContactForm.scrollIntoView(true);

		const actions = [];

		actions.push(<FlatButton
			key={actions.length}
			label="Cancel"
			primary={true}
			onTouchTap={this.closeContactForm}/>);

		actions.push(<RaisedButton
			key={actions.length}
			label="Send Contact Info"
			secondary={true}
			style={style}
			onClick={this.onClickSubmitContactForm}/>);

		return (
			<div className="App-contactDialog">

				<IconButton className="App-contactDialog-close"
							iconStyle={{width: 60, height: 60}}
							style={{width: 120, height: 120, padding: 30}}
							onTouchTap={this.closeContactForm}>
					<ActionHome />
				</IconButton>

				<div className="App-header">
					<h1>Contact Us</h1>
					<small>Leave your name, email and a brief message and we will get back to you.</small>
				</div>

				<div style={{minHeight: '300px'}}>

					<div className="App-contactDialog-form">
						{this.renderContactFormInputFields()}
						{this.renderSubmitStatusMessage()}
					</div>

					<div className="App-contactDialog-actions">
						{actions}
					</div>

				</div>

			</div>
		);
	};

	onClickRenderContactForm() {
		this.setState({showContact: true});
	}

	render() {
		return (
			<div className="App">
				<div ref="appContactForm">
					{this.renderContactForm()}
				</div>
				<div className="App-hero">
					<img src={logo} className="App-logo" alt="NeuraSense"/>
				</div>
				<div className="App-actions">
					<RaisedButton label="Contact Us" secondary={true} style={style}
								  onClick={this.onClickRenderContactForm}/>
				</div>
				<div className="App-footer">
					<small>Copyright © Neurasense 2017 • All Rights Reserved</small>
				</div>
			</div>
		);
	}
}

export default App;
