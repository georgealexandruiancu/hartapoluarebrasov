const express = require('express');
const router = express.Router();
const fetch = require("node-fetch");

var logger = require("../log/logger");

var elasticsearch = require("elasticsearch");
var client = new elasticsearch.Client({
	host: `https://${process.env.AWS_USER}:${process.env.AWS_PASS}@8f9677360fc34e2eb943d737b2597c7b.us-east-1.aws.found.io:9243`
});


function filterData (data) {
	let filteredData = data.hits.hits.filter((item) => {

	if(Object.keys(item._source).length !== 0) {

			if (
				item._source.hasOwnProperty("MQ135") &&
				item._source.hasOwnProperty("dustDensity") &&
				item._source.hasOwnProperty("humidity") &&
				item._source.hasOwnProperty("lat") &&
				item._source.hasOwnProperty("lng") &&
				item._source.hasOwnProperty("name") &&
				item._source.hasOwnProperty("temperature") &&
				item._source.hasOwnProperty("timestamp")
			) {
				return item;
			}
		}
	});

	return filteredData;
}


router.get("/get-all-data/:sensor?", (req, res) => {
	let data;
	let hits;
	var index = 'air_*',
		limit = {"from": 0, "size": 10000},
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
		limit = {
			"from": 0, "size": 100,
		}
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
			"sort": [
				{
					"timestamp": {
						"order": "desc"
					}
				}
			]
		}
	}, function (err, resQuery, status) {
		if(err) {
			res.status(404).json({
				error: err
			})
		} else {
			data = JSON.parse(JSON.stringify(resQuery));
			if (sensor) {
				hits = data.hits.hits;
				let arrayDataWithHours = [];
				let minValue = "";
				data.hits.hits.map((item, index) => {
					if (index == 0) {
					minValue = item._source.timestamp.substring(0, 10);
					}

					let maxValue = item._source.timestamp.substring(0, 10);

					if (maxValue < minValue) {
					arrayDataWithHours.push(item._source);
					minValue = maxValue;
					}
				});
				arrayDataWithHours = arrayDataWithHours.reverse();

				res.status(200).json({
					message: `SUCCESS  -  GET ALL DATA FROM ${search}`,
					data: arrayDataWithHours,
				});
			}
			else {
				let filteredData = filterData(data);
				res.status(200).json({
					message: `SUCCESS  -  GET ALL DATA FROM ${search}`,
					data: filteredData
				});
			}

		}
	});
});

router.get("/get-my-data/:sensor?", (req, res) => {
	let data;
	let hits;
	var limit = {"from": 0, "size": 10000},
		search = "AIRQUALITY";

	let sensor = req.params.sensor;

	if (sensor) {
		index = "air_" + sensor;
		search = sensor.toUpperCase();
	}
	else {
		res.status(404).json({
			error: "NOT FOUND",
		});
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
			"sort": [
				{
					"timestamp": {
						"order": "desc"
					}
				}
			]
		}
	}, function (err, resQuery, status) {
		if(err) {
			res.status(404).json({
				error: err
			})
		} else {
			data = JSON.parse(JSON.stringify(resQuery));
			// Filter data first
			// Object.keys(obj).length === 0 && obj.constructor === Object;
			let filteredData = filterData(data);
			if (sensor) {
				res.status(200).json({
					message: `SUCCESS  -  GET ALL DATA FROM ${search}`,
					data: filteredData,
				});
			}
			else {
				res.status(404).json({
					error: "NOT FOUND",
				});
			}

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


			res.status(404).json({
				error: err
			})
		} else {
			data = JSON.parse(JSON.stringify(resQuery));
			hits = data.hits.hits;
			let arrayDataWithHours = [];
			let minValue = "";
			data.hits.hits.map((item, index) => {

				if(index == 0) {
					minValue = item._source.timestamp.substring(0, 10);
				}


				let maxValue = item._source.timestamp.substring(0, 10);


				if(maxValue < minValue) {
					arrayDataWithHours.push(item._source);
					minValue = maxValue;
				}
			});
			arrayDataWithHours = arrayDataWithHours.reverse();

			res.status(200).json({
				message: `SUCCESS  -  GET ALL DATA FROM ${search}`,
				data: arrayDataWithHours
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

	var ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
	logger.writeLog(ip, req.originalUrl, req.user ? req.user[0]._id : "NOLOGGEDIN", "POST");

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