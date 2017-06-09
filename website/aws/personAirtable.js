/**
 * Created by onvelocity on 6/9/17.
 */
'use strict';

const https = require('https');

/**
 * Expects an AWS API Gateway event that contains JSON payload {name, email, phone, message}.
 *
 * Requires Environment Variables appName and appKey to access your Airtable.
 *
 * Requires Airtable 'Personal CRM' base, changed Phone Number to Phone; My Message to Message; and
 * added Tag New Contact.
 *
 */
exports.handler = (event, context, callback) => {

	let errorMessage = '';

	if (!event.name || /^\s+$/.test(event.name)) {
		errorMessage = 'Please provide your first and last name.';
	}

	if (!event.email || /^\s+$/.test(event.email)) {
		errorMessage = 'Please provide an email address.';
	}

	if (errorMessage) {
		callback(null, {errorMessage});
		return;
	}

	//https://api.airtable.com/v0/[appName]/People?api_key=[appKey]
	const options = {
		hostname: 'api.airtable.com',
		port: 443,
		path: `/v0/${process.env.appName}/People`,
		method: 'POST',
		mode: 'cors',
		headers: {
			Authorization: `Bearer ${process.env.appKey}`,
			'Content-Type': 'application/json'
		}
	};

	const req = https.request(options, (res) => {
		let body = '';
		res.setEncoding('utf8');
		res.on('data', (chunk) => body += chunk);
		res.on('end', () => {
			// If we know it's JSON, parse it
			if (res.headers['content-type'] === 'application/json') {
				body = JSON.parse(body);
			}
			callback(null, {
				statusCode: '200',
				body: JSON.stringify(body),
				headers: {
					'Content-Type': 'application/json',
					'Access-Control-Allow-Origin': '*'
				}
			});
		});
	});

	const data = {
		fields: {
			Name: event.name,
			Email: event.email,
			Phone: event.phone,
			Message: event.message,
			Tags: ["New Contact"]
		}
	};

	req.on('error', err => callback(null, {
		statusCode: '400',
		body: JSON.stringify({err, errorMessage: 'We are unable to accept contacts at the moment.'}),
		headers: {
			'Content-Type': 'application/json',
			'Access-Control-Allow-Origin': '*'
		}
	}));

	req.write(JSON.stringify(data));
	req.end();

};
