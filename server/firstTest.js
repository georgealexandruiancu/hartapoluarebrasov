require('dotenv').config();

var express = require('express');
var app = express();
var elasticsearch = require("elasticsearch");
var cors = require('cors')

var client = new elasticsearch.Client({
	host: `https://${process.env.AWS_USER}:${process.env.AWS_PASS}@8f9677360fc34e2eb943d737b2597c7b.us-east-1.aws.found.io:9243`
});


app.use(cors())

app.get("/allDataFromMQ135", (req, res) => {
	let data;
	let hits;

	client.search({
		index: 'esp8266_dht11_mq135',
		body: {
			"query": {
				"match_all": {}
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
			console.log(hits);
			res.status(200).json({
				message: `SUCCESS  -  GET ALL DATA FROM MQ135`,
				data: hits
			});
		}
	})
	// res.end();

})


app.get("/allDataFromMQ1", (req, res) => {
	let data;
	let hits;

	client.search({
		index: 'esp8266_dht11_mq1',
		body: {
			"query": {
				"match_all": {}
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
			res.status(200).json({
				message: `SUCCESS  -  GET ALL DATA FROM MQ1`,
				data: hits
			});
		}
	})
	// res.end();

})

app.listen(3000);