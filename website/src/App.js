import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import Snackbar from 'material-ui/Snackbar';
import RaisedButton from 'material-ui/RaisedButton';

import logo from './neurasense-transparent-logo.png';
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
	windowHeight: 400,
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
		this.closeContactForm = this.closeContactForm.bind(this);
		this.onSubmitContactFormAPIResponse = this.onSubmitContactFormAPIResponse.bind(this);
		this.renderContactFormInputFields = this.renderContactFormInputFields.bind(this);
		this.renderContactFormResponse = this.renderContactFormResponse.bind(this);
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

	onSubmitContactFormAPIResponse(errorMessage, ok) {
		const submitStatusMessage = ok === 'ok' ? `Thank you. We will be in touch soon.` : errorMessage;
		this.setState({submitStatusMessage});
	}

	onClickSubmitContactForm() {
		this.setState({showContactSaved: true});
		this.onSubmitContactForm(this.state, this.onSubmitContactFormAPIResponse);
	}

	closeContactForm() {
		this.setState(initialState());
	}

	renderContactFormResponse(message) {
		return <Snackbar open={true}
						 message={message}
						 autoHideDuration={5000}
						 onRequestClose={this.closeContactForm}/>
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

	renderContactForm() {

		if (this.state.showContact !== true) {
			return null;
		}

		this.refs.appContactForm.scrollIntoView(true);

		const actions = [];

		if (this.state.showContactSaved) {
			actions.push(<FlatButton
				key={actions.length}
				label="Ok"
				primary={true}
				onTouchTap={this.closeContactForm}/>)
		} else {
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
		}

		const message = this.state.submitStatusMessage ? this.state.submitStatusMessage : `Sending contact info...`;
		return (
			<div className="App-contactDialog">

				<h1>Contact Us...</h1>

				<div style={{minHeight: '300px'}}>

					<div className="App-contactDialog-form">
						{this.state.showContactSaved ? this.renderContactFormResponse(message) : this.renderContactFormInputFields()}
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
					<p className="App-byline">Turning The Subjective Into The Objective!</p>
				</div>
				<div className="App-actions">
					<RaisedButton label="Contact Us" secondary={true} style={style}
								  onClick={this.onClickRenderContactForm}/>
				</div>
			</div>
		);
	}
}

export default App;
