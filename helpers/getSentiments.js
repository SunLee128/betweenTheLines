'use strict';
let axios = require('axios')

const key_var = 'TEXT_ANALYTICS_SUBSCRIPTION_KEY';
// if (!process.env[key_var]) {
// 	throw new Error('please set/export the following environment variable: ' + key_var);
// }
const subscription_key = process.env[key_var];

const endpoint_var = 'TEXT_ANALYTICS_ENDPOINT';
// if (!process.env[endpoint_var]) {
// 	throw new Error('please set/export the following environment variable: ' + endpoint_var);
// }
const endpoint = process.env[endpoint_var];

let path = 'text/analytics/v3.0-preview.1/sentiment';

let get_sentiments = function(documents) {
	const url = endpoint + path
	return axios({
		url,
		method: 'post',
		data: documents,
		headers: {
			'Ocp-Apim-Subscription-Key': subscription_key
		}
	})
};

exports.get_sentiments = get_sentiments;