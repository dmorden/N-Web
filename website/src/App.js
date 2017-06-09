import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import Paper from 'material-ui/Paper';
import Dialog from 'material-ui/Dialog';
import Snackbar from 'material-ui/Snackbar';
import RaisedButton from 'material-ui/RaisedButton';
import logo from './neurasense-transparent-logo.png';
import './App.css';
import '@material/layout-grid/dist/mdc.layout-grid.css';

const style = {
	margin: 12
};

class App extends Component {

	constructor(props) {
		super(props);
		this.state = {
			showContact: false,
			showContactSaved: false,
			activeTextField: '',
			name: '',
			email: '',
			phone: '',
			message: ''
		};
		this.closeContactForm = this.closeContactForm.bind(this);
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

	onClickSubmitContactForm() {
		this.setState({showContactSaved: true});
	}

	closeContactForm() {
		this.setState({showContactSaved: false, showContact: false});
	}

	renderContactForm() {

		if (this.state.showContact !== true) {
			return null;
		}

		if (this.state.showContactSaved) {
			return <Snackbar open={true}
							 message="Thank you. We will be in touch soon."
							 autoHideDuration={5000}
							 onRequestClose={this.closeContactForm} />
		}

		const actions = [
			<FlatButton
				label="Cancel"
				primary={true}
				onTouchTap={this.closeContactForm}
			/>,
			<RaisedButton label="Send Contact Info" secondary={true} style={style}
						  onClick={this.onClickSubmitContactForm}/>
		];

		return (
			<Dialog open={true} title="Contact Us..." actions={actions} >
				<div style={{textAlign: 'center', position: 'relative', height: '400px'}}>
					<div style={{textAlign: 'center', position: 'absolute'}}>
						<TextField
							onBlur={this.onFocusSetActiveTextField.bind(null, '')}
							onFocus={this.onFocusSetActiveTextField.bind(null, 'name')}
							onChange={event => this.onChangeSetValue('name', event.target.value)}
							hintText="First Last Name"
							floatingLabelText="Name"
							errorText={!this.state.name ? `This field is required` : ''}
						/>
						<br />
						<TextField
							onBlur={this.onFocusSetActiveTextField.bind(null, '')}
							onFocus={this.onFocusSetActiveTextField.bind(null, 'email')}
							onChange={event => this.onChangeSetValue('email', event.target.value)}
							hintText="Email Address"
							floatingLabelText="Email"
							errorText={!this.state.email ? `This field is required` : ''}
						/>
						<br />
						<TextField
							hintText="Phone Number"
							floatingLabelText="Phone"
						/>
						<br />
						<TextField
							multiLine={true}
							rows={4}
							hintText="Short Message"
							floatingLabelText="Message"
						/>
					</div>
				</div>
			</Dialog>
		);
	};

	onClickRenderContactForm() {
		this.setState({showContact: true});
	}

	render() {
		return (
			<div className="App">
				{this.renderContactForm()}
				<div className="">
					<div className="">
						<img src={logo} className="App-logo" alt="logo"/>
						<p>Turning The Subjective Into The Objective!</p>
					</div>
				</div>
				<div className="">
					<div className="">
						<RaisedButton label="Contact Us!" secondary={true} style={style}
									  onClick={this.onClickRenderContactForm}/>
					</div>
				</div>
			</div>
		);
	}
}

export default App;
