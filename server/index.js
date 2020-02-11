require('dotenv').config();

let appPath = process.env.DEV_PATH;

/**  
* ? ---------------------------------------
* ? If you don't have the ssl certificate
* ? Please disable the fs, key, cert
* ! Note: some methods will not work properly
*/
const fs = require("fs");
const key = fs.readFileSync('./ssl/key.pem');
const cert = fs.readFileSync('./ssl/cert.pem');
const https = require('https');
/**
* ? ---------------------------------------
*/

var express = require('express');
var bodyParser = require('body-parser')
var cookieParser = require('cookie-parser')
var app = express();
var elasticsearch = require("elasticsearch");
var cors = require('cors');
var jwt = require('jsonwebtoken');

var client = new elasticsearch.Client({
	host: `https://${process.env.AWS_USER}:${process.env.AWS_PASS}@8f9677360fc34e2eb943d737b2597c7b.us-east-1.aws.found.io:9243`
});

app.use(cookieParser(process.env.COOKIE_SECRET));

// routes
const appRouterUsers = require('./router/users');
const appRouterData = require('./router/data');


// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

// cors
app.use(cors());

app.use(
	async function (req, res, next) {
		console.log(req.signedCookies);
		let token;

		if(req && req.signedCookies["authLogin"]) {
			token = req.signedCookies["authLogin"];

			var decoded = jwt.verify(token, process.env.JWT_SECRET);
			console.log(decoded.userId);
			let user = await getUserById(decoded.userId);

			if (user) {
				req.user = user;
			}

		}

		next()
	}
)

// routes
app.use('/users', appRouterUsers);
app.use('/data', appRouterData);

/** 
 * Methods
 */

getUserById = async (id) => {
	index = "users";
	let limit = {"from": 0, "size": 1};

	const reqQuery = await client.search({
		index: index,
		body: {
			...limit,
			"query": {
				"term": {
					"_id": id
				}
			}
		}
	});

	data = JSON.parse(JSON.stringify(reqQuery));
	hits = data.hits.hits;
	return hits;
}

/**
 * ./Methods
 */

const server = https.createServer({ key: key, cert: cert }, app);
server.listen(3001, () => { console.log('SSL ACTIVE  - listening on 3001') });
app.listen(3000, () => console.log("Unsecured connection active on PORT: 3000"));