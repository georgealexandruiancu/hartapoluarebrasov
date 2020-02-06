require('dotenv').config();

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
var app = express();
var elasticsearch = require("elasticsearch");
var cors = require('cors');

var client = new elasticsearch.Client({
	host: `https://${process.env.AWS_USER}:${process.env.AWS_PASS}@8f9677360fc34e2eb943d737b2597c7b.us-east-1.aws.found.io:9243`
});

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

// cors
app.use(cors());

/** 
 * Methods
 */
app.put("/registerUser/:hash", (req, res) => {
	let userHash = req.params.hash;
	let index = "airquality_" + userHash;

	client.index({
		index,
		body: {}
	}, function (errorIndex, resIndex, status) {
		if (errorIndex) {
			console.log(errorIndex);

			res.status(404).json({
				error: errorIndex
			})
		}
		else {
			client.indices.putMapping({
				index,
				type: "_doc",
				body: {
					properties: {
						MQ135: {
							properties: {
								value: { "type": "float" }
							}
						},
						PM25: {
							properties: {
								value: { "type": "float" },
								dustDensity: { "type": "float" }
							}
						},
						humidity: { "type": "long" },
						gpslocation: { 
							properties: {
								location: {
									"type": "geo_point"
								}
							}
						},
						name: { "type": "text" },
						temperature: { "type": "float" },
						timestamp: { "type": "date" },
						dateEntry: { "type": "text" }
					}
				},
				include_type_name: true
			}, function (err, resQuery, status) {
				if (err) {
					console.log(err);

					res.status(404).json({
						error: err
					})
				} else {
					res.status(200).json({
						message: `SUCCESS  -  CREATED CLUSTER FOR USER ${userHash}`
					});
				}
			});

		}
	})
});

app.post("/addDataUser/:hash", (req, res) => {
	let hash = req.params.hash;
	let index = "airquality_" + hash;
	let dateNow = Date.now();
	let dateEntry = Date(dateNow);

	if (!hash) {
		res.send(400).send({
			message: "User id is requried"
		});
	}

	client.index({
		index: index,
		type: "_doc",
		body: {
			...req.body,
			timestamp: dateNow,
			dateEntry: dateEntry
		}
	}, function (err, resp, status) {
		if (err) {
			console.log(err);

			res.status(404).json({
				error: err
			})
		}
		else {
			res.send({
				message: `SUCCESS  -  POST TO ${index} CALL SUCCEEDED`,
				response: resp
			})
		}
	});

});

app.get("/getUserData/:hash/:limit?", (req, res) => {
	let data;
	let hits;
	let hash = req.params.hash;
	let limitReq = req.params.limit;
	var index = 'airquality_' + hash,
		limit = { "from": 0, "size": 1000 };

	if (!hash) {
		res.send(400).send({
			message: "User id is requried"
		});
	}
	else {
		search = index;
	}

	if (limitReq) {
		limit = {
			"from": 0, "size": limitReq,
		}
	}
	else {
		search = "ALL FIELDS";
	}


	client.search({
		index: index,
		body: {
			...limit,
			"query": {
				"match_all": {}
			},
		}
	}, function (err, resQuery, status) {
		if (err) {
			console.log(err);

			res.status(404).json({
				error: err
			})
		} else {
			data = JSON.parse(JSON.stringify(resQuery));
			hits = data.hits.hits;

			if (limitReq) {
				console.log(hits);
			} else {
				console.log(`Found it: ${hits.length}, from all search`);
			}

			res.status(200).json({
				message: `SUCCESS  -  GET ALL DATA FROM ${search}`,
				data: hits
			});
		}
	});
});

app.get("/getAllData/:sensor?", (req, res) => {
	let data;
	let hits;
	var index = 'airquality_*',
		limit = {"from": 0, "size": 1000},
		search = "AIRQUALITY";

	let sensor = req.params.sensor;
	let limitReq = req.query.limit;


	if (sensor) {
		index = "esp8266_dht11_" + sensor;
		search = sensor.toUpperCase();
	}

	if (limitReq) {
		limit = {
			"from": 0, "size": limitReq,
		}
	}
	else {
		search = "ALL FIELDS";
	}


	client.search({
		index: index,
		body: {
			...limit,
			"query": {
				"match_all": {}
			},
		}
	}, function (err, resQuery, status) {
		if(err) {
			console.log(err);

			res.status(404).json({
				error: err
			})
		} else {
			data = JSON.parse(JSON.stringify(resQuery));
			hits = data.hits.hits;

			if (limitReq) {
				console.log(hits);
			} else {
				console.log(`Found it: ${hits.length}, from all search`);
			}

			res.status(200).json({
				message: `SUCCESS  -  GET ALL DATA FROM ${search}`,
				data: hits
			});
		}
	});
});

app.get("/getDataByRadius/:radius/:lat/:lng/:limit?", (req, res) => {
	let data;
	let hits;
	var index = 'airquality_*',
		limit = {"from": 0, "size": 1000};

	let radius = req.params.radius;
	let point = {
		lat: req.params.lat,
		lng: req.params.lng
	}
	let limitReq = req.query.limit;

	let search = `AIRQUALITY BY RADIUS: ${radius} ON POINT ${point.lat} & ${point.lng}`;

	if (limitReq) {
		limit = {
			"from": 0, "size": limitReq,
		}
	}
	else {
		search = "AIRQUALITY ALL FIELDS";
	}


	client.search({
		index: index,
		body: {
			...limit,
			"query": {
				"bool" : {
					"must" : {
						"match_all" : {}
					},
					"filter" : {
						"geo_distance" : {
							"distance" : radius,
							"gpslocation.location" : {
								"lat" : parseInt(point.lat),
								"lng" : parseInt(point.lng)
							}
						}
					}
				}
			}
		}
	}, function (err, resQuery, status) {
		if(err) {
			console.log(err);

			res.status(404).json({
				error: err
			})
		} else {
			data = JSON.parse(JSON.stringify(resQuery));
			hits = data.hits.hits;

			console.log(`Found it: ${hits.length}, from radius: ${radius} on point ${point.lat} & ${point.lng}`);

			res.status(200).json({
				message: `SUCCESS  -  GET ALL DATA FROM ${search}`,
				data: hits
			});
		}
	});
});

app.get("/getAll/:sensor?/:limit?", (req, res) => {
	let data;
	let hits;
	var index = 'esp8266_dht11_*',
		limit = {"from": 0, "size": 1000},
		search = "MQ135 & MQ1";

	let sensor = req.params.sensor;
	let limitReq = req.params.limit;


	if (sensor) {
		index = "esp8266_dht11_" + sensor;
		search = sensor.toUpperCase();
	}

	if (limitReq) {
		limit = {
			"from": 0, "size": limitReq,
		}
	}
	else {
		search = "ALL FIELDS";
	}


	client.search({
		index: index,
		body: {
			...limit,
			"query": {
				"match_all": {}
			},
		}
	}, function (err, resQuery, status) {
		if(err) {
			console.log(err);

			res.status(404).json({
				error: err
			})
		} else {
			data = JSON.parse(JSON.stringify(resQuery));
			hits = data.hits.hits;

			if (limitReq) {
				console.log(hits);
			} else {
				console.log(`Found it: ${hits.length}, from all search`);
			}

			res.status(200).json({
				message: `SUCCESS  -  GET ALL DATA FROM ${search}`,
				data: hits
			});
		}
	});
});

app.post("/postData/:sensor", cors() , (req, res) => {
	let sensor = req.params.sensor;
	let index = "esp8266_dht11_" + sensor;

	if( !sensor ) {
		res.send(400).send({
			message: "Sensor id is requried"
		});
	}

	client.index({
		index: index,
		type: "_doc",
		body: req.body
	}, function (err, resp, status) {
		if(err) {
			console.log(err);

			res.status(404).json({
				error: err
			})
		}
		else {
			res.send({
				message: `SUCCESS  -  POST TO ${index} CALL SUCCEEDED`,
				response: resp
			}) 
		}
	})
});

/**
 * ./Methods
 */

const server = https.createServer({ key: key, cert: cert }, app);
server.listen(3001, () => { console.log('SSL ACTIVE  - listening on 3001') });
app.listen(3000, () => console.log("Unsecured connection active on PORT: 3000"));