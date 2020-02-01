const elasticsearch = require('elasticsearch');
const awsHttpClient = require('http-aws-es');
const AWS = require('aws-sdk');

AWS.config.region = 'us-east-1';

// const client = new elasticsearch.Client({
// 	host: '8f9677360fc34e2eb943d737b2597c7b.us-east-1.aws.found.io:9243',
// 	connectionClass: awsHttpClient,
// 	auth: {
// 		username: 'elastic',
// 		password: ''
// 	}
// });

const client = new elasticsearch.Client({
	node: 'https://elastic:AWbtmGda2Q7BI2bYpdjyF4qd@8f9677360fc34e2eb943d737b2597c7b.us-east-1.aws.found.io:9243',
	connectionClass: awsHttpClient,
	log: "trace",
	sniffOnStart: true
})

async function run() {
	// Let's start by indexing some data
	await client.index({
		index: 'module_gsm_senzors',
	})

	await client.index({
		index: 'esp8266_box1_test1',
	})

	console.log(body.hits.hits)
}

run().catch((err) => console.log(err));

// indexDocument(json);

// function indexDocument(document) {
// 	var endpoint = new AWS.Endpoint(domain);
// 	var request = new AWS.HttpRequest(endpoint, region);

// 	request.method = 'PUT';
// 	request.path += index + "/" + type + "/" + id;

// 	request.headers['host'] = domain;
// 	request.headers['Content-Type'] = 'application/json';
// 	// Content-Length is only needed for DELETE requests that include a request
// 	// body, but including it for all requests doesn't seem to hurt anything.
// 	request.headers['Content-Length'] = Buffer.byteLength(request.body);

// 	var credentials = new AWS.EnvironmentCredentials('AWS');
// 	var signer = new AWS.Signers.V4(request, 'es');
// 	signer.addAuthorization(credentials, new Date());

// 	var client = new AWS.HttpClient();
// 	client.handleRequest(request, null, function (response) {
// 			console.log(response.statusCode + ' ' + response.statusMessage);
// 			var responseBody = '';
// 			response.on('data', function (chunk) {
// 				responseBody += chunk;
// 			});

// 			response.on('end', function (chunk) {
// 				console.log('Response body: ' + responseBody);
// 			});
// 		}, function (error) {
// 			console.log('Error: ' + error);
// 		});
// }