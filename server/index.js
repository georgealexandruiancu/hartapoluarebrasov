require('dotenv').config();

var express = require('express');
var app = express();
var elasticsearch = require("elasticsearch");
var cors = require('cors')

var client = new elasticsearch.Client({
	host: `https://${process.env.AWS_USER}:${process.env.AWS_PASS}@8f9677360fc34e2eb943d737b2597c7b.us-east-1.aws.found.io:9243`
});


app.use(cors())

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

app.listen(3000);