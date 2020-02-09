const express = require('express');
const router = express.Router();
var elasticsearch = require("elasticsearch");
var client = new elasticsearch.Client({
	host: `https://${process.env.AWS_USER}:${process.env.AWS_PASS}@8f9677360fc34e2eb943d737b2597c7b.us-east-1.aws.found.io:9243`
});


router.get("/get-all-data/:sensor?", (req, res) => {
	console.log(req.user);
	if (!req.user) {
		res.status(401).send();
	}

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

router.get("/get-data-by-radius/:radius/:lat/:lng/:hashUser?", (req, res) => {
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

	let userHash = req.params.hashUser;

	if(userHash) {
		index = "airquality_" + userHash;
	}

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
								"lon" : parseInt(point.lng)
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

router.get("/get-all/:sensor?/:limit?", (req, res) => {
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
// test cors() middleware
router.post("/post-data/:sensor", (req, res) => {
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

module.exports = router