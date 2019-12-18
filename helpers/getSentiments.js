'use strict';
let axios = require('axios')

const key_var = 'TEXT_ANALYTICS_SUBSCRIPTION_KEY';
const subscription_key = process.env[key_var];
const endpoint_var = 'TEXT_ANALYTICS_ENDPOINT';
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