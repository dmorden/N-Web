import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import './index.css';
import injectTapEventPlugin from 'react-tap-event-plugin';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

const AWS_API_Gateway = {
	contacts: 'https://g2r6kco4kk.execute-api.us-east-1.amazonaws.com/prod/contacts'
};

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

const formKeysMap = {
	"name": "name",
	"message": "message",
	"email": "email",
	"phone": "phone"
};

const doSubmitContactForm = (state, callback = () => {}) => {

	// Airtable names may not match our form names
	const data = Object.keys(formKeysMap).reduce((map, key) => {
		map[formKeysMap[key]] = state[key];
		return map;
	}, {});

	var myHeaders = new Headers();
	myHeaders.append('Content-Type', 'application/json');
	var myInit = {
		method: 'POST',
		headers: myHeaders,
		mode: 'cors',
		cache: 'default',
		body: JSON.stringify(data)
	};

	fetch(AWS_API_Gateway.contacts, myInit)
		.then(function (response) {
			return response.json();
		})
		.then(function (json) {
			if (json.errorMessage) {
				callback(json.errorMessage);
			} else {
				callback(null, 'ok');
			}
		});

};

ReactDOM.render(
	<MuiThemeProvider>
		<App
			windowHeight={window.innerHeight}
			onSubmitContactForm={doSubmitContactForm}/>
	</MuiThemeProvider>, document.getElementById('root'));

registerServiceWorker();
