const express = require('express');
const router = express.Router();
const fetch = require("node-fetch");

var logger = require("../log/logger");

var elasticsearch = require("elasticsearch");
var client = new elasticsearch.Client({
	host: `https://${process.env.AWS_USER}:${process.env.AWS_PASS}@8f9677360fc34e2eb943d737b2597c7b.us-east-1.aws.found.io:9243`
});


router.get("/get-all-data/:sensor?", (req, res) => {
	if (!req.user) {
		res.status(401).json({
			message: "You are not logged in !"
		});
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
	console.log(req.originalUrl);

	var ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
	logger.writeLog(ip, req.originalUrl, req.user ? req.user[0]._id : "NOLOGGEDIN", "GET");

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

			if (req.user) {
				res.status(404).json({
					error: err
				})
			}
		} else {
			data = JSON.parse(JSON.stringify(resQuery));
			hits = data.hits.hits;

			if (limitReq) {
				console.log(hits);
			} else {
				console.log(`Found it: ${hits.length}, from all search`);
			}
			if (req.user) {
				res.status(200).json({
					message: `SUCCESS  -  GET ALL DATA FROM ${search}`,
					data: hits
				});
			}
		}
	});
});

router.get("/get-data-by-radius/:radius/:lat/:lng/:hashUser?", (req, res) => {
	if (!req.user) {
		res.status(401).json({
			message: "You are not logged in !"
		});
	}

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

	var ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
	logger.writeLog(ip, req.originalUrl, req.user ? req.user[0]._id : "NOLOGGEDIN", "GET");

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
			if (req.user) {
				res.status(404).json({
					error: err
				})
			}
		} else {
			data = JSON.parse(JSON.stringify(resQuery));
			hits = data.hits.hits;

			console.log(`Found it: ${hits.length}, from radius: ${radius} on point ${point.lat} & ${point.lng}`);
			if (req.user) {
				res.status(200).json({
					message: `SUCCESS  -  GET ALL DATA FROM ${search}`,
					data: hits
				});
			}
		}
	});
});

router.get("/get-all/:sensor?/:limit?", (req, res) => {
	if (!req.user) {
		res.status(401).json({
			message: "You are not logged in !"
		});
	}

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

	var ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
	logger.writeLog(ip, req.originalUrl, req.user ? req.user[0]._id : "NOLOGGEDIN", "GET");

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

			if (req.user) {
				res.status(404).json({
					error: err
				})
			}
		} else {
			data = JSON.parse(JSON.stringify(resQuery));
			hits = data.hits.hits;

			if (limitReq) {
				console.log(hits);
			} else {
				console.log(`Found it: ${hits.length}, from all search`);
			}
			if (req.user) {
				res.status(200).json({
					message: `SUCCESS  -  GET ALL DATA FROM ${search}`,
					data: hits
				});
			}
		}
	});
});
// test cors() middleware
router.post("/post-data/:sensor", (req, res) => {
	if (!req.user) {
		res.status(401).json({
			message: "You are not logged in !"
		});
	}

	let sensor = req.params.sensor;
	let index = "esp8266_dht11_" + sensor;

	if( !sensor ) {
		res.send(400).send({
			message: "Sensor id is requried"
		});
	}

	var ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
	logger.writeLog(ip, req.originalUrl, req.user ? req.user[0]._id : "NOLOGGEDIN", "POST");

	client.index({
		index: index,
		type: "_doc",
		body: req.body
	}, function (err, resp, status) {
		if(err) {
			console.log(err);

			if (req.user) {
				res.status(404).json({
					error: err
				})
			}
		}
		else {
			if (req.user) {
				res.send({
					message: `SUCCESS  -  POST TO ${index} CALL SUCCEEDED`,
					response: resp
				})
			}
		}
	})
});

router.get("/opensource/:type/:limit?/:dateStart?/:dateEnd?", (req, res) => {

	if (req.params.type == "openaq") {
		let limit = req.params.limit ? req.params.limit : 10000;

		let url = encodeURI(
			"https://api.openaq.org/v1/measurements?country=RO&city=Braşov&date_from=2020-01-01&order_by=date&limit=" + limit
		);

		if (req.params.dateStart && req.params.dateEnd){
			url = encodeURI(
				"https://api.openaq.org/v1/measurements?country=RO&city=Braşov&date_from="+req.params.dateStart+"&date_to="+req.params.dateEnd+"&order_by=date&limit=" + limit
			);
		}

		fetch(url)
			.then((response) => response.json())
			.then((data) => {
				let object_no2 = [];
				let object_o3 = [];
				data.results.map((item, index) => {
					if (item.parameter == "no2") {
						object_no2.push({
							date_reg: item.date.local,
							value: item.value,
							lat: item.coordinates.latitude,
							lng: item.coordinates.longitude,
							currency: item.unit
						});
					}
					else if (item.parameter == "o3") {
						object_o3.push({
							date_reg: item.date.local,
							value: item.value,
							lat: item.coordinates.latitude,
							lng: item.coordinates.longitude,
							currency: item.unit,
						});
					}
				})
				let concatedObject = {
					no2: object_no2,
					o3: object_o3
				}
				res.send(concatedObject);
			})
			.catch(err => console.log(err))
	}

});

module.exports = router