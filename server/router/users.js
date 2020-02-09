

const express = require('express');
const router = express.Router();

var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');

var elasticsearch = require("elasticsearch");
var client = new elasticsearch.Client({
	host: `https://${process.env.AWS_USER}:${process.env.AWS_PASS}@8f9677360fc34e2eb943d737b2597c7b.us-east-1.aws.found.io:9243`
});

function makeid(length) {
	var result           = '';
	var characters       = 'abcdefghijklmnopqrstuvwxyz';
	var charactersLength = characters.length;
	for ( var i = 0; i < length; i++ ) {
	   result += characters.charAt(Math.floor(Math.random() * charactersLength));
	}
	return result;
}

router.get("/who-am-i", (req, res) => {
	res.json(req.user);
})

router.get("/logout", (req, res) => {
	res.clearCookie("authLogin");

	res.send();
});

router.put("/create-users-index", (req, res) => {
	let index = "users";

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
						name: { "type": "text" },
						email: { "type": "text" },
						password: { "type": "text" },
						codeRegistration: { "type": "text" },
						deviceId: {  "type": "text" },
						registerDate: { "type": "date" },
						statusAccount: { "type": "text" },
						lastLogin: { "type": "date" },
						lockedMode:	{ "type": "boolean" },
						confirmationAdminDate: { "type": "date" }
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
						message: `SUCCESS  -  CREATED CLUSTER FOR USERS`
					});
				}
			});

		}
	});
});

router.post("/add-user", async (req, res) => {
	let index = "users"
	let dateNow = Date.now();

	let hashedPassword = await bcrypt.hash(req.body.password, 10);
	console.log(hashedPassword);
	let codeRegistration = (Math.floor(Math.random() * 10000) + 10000).toString().substring(1);
	let deviceId = makeid(5) + dateNow;

	client.index({
		index: index,
		type: "_doc",
		body: {
			name: req.body.name,
			email: req.body.email,
			password: hashedPassword,
			codeRegistration: codeRegistration,
			deviceId: deviceId,
			registerDate: dateNow,
			statusAccount: "PENDING",
			lastLogin: 0,
			lockedMode:	true,
			confirmationAdminDate: 0
		}
	}, async function (err, resp, status) {
		if (err) {
			console.log(err);

			res.status(404).json({
				error: err
			})
		}
		else {
			try {
				var statusRegisterDevice = await registerUserDevice(deviceId);

				res.send({
					message: `SUCCESS  -  POST TO ${index} CALL SUCCEEDED`,
					response: statusRegisterDevice
				})

			}
			catch(err) {

				res.send({
					message: `SUCCESS  -  POST TO ${index} CALL SUCCEEDED`,
					response: err
				})

			}
			
		}
	});
});

registerUserDevice = async (hash) => {
	return new Promise((resolve, reject) => {
		let index = "airquality_" + hash;
		
		client.index({
			index,
			body: {}
		}, function (errorIndex, resIndex, status) {
			if (errorIndex) {
				console.log(errorIndex);
				reject(errorIndex);

				// res.status(404).json({
				// 	error: errorIndex
				// })
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
						reject(err);

						// res.status(404).json({
						// 	error: err
						// })
					} else {
						// res.status(200).json({
						// 	message: `SUCCESS  -  CREATED CLUSTER FOR USER ${userHash}`
						// });
						resolve({
							message: `SUCCESS  -  CREATED CLUSTER FOR USER ${index}`
						})
					}
				});

			}
		})
	})
}

router.post("/login", async (req, res) => {
	const { email, password } = req.body;
	console.log(email, password);
	let limit = {"from": 0, "size": 1}
	let index = "users";


	try {
		const reqQuery = await client.search({
			index: index,
			body: {
				...limit,
				"query": {
					"match": {
						"email": email
					}
				},
			}
		});

		let data = JSON.parse(JSON.stringify(reqQuery));
		let hits = data.hits.hits;
		const match = await bcrypt.compare(password, hits[0]._source.password);

		if (match) {
			var token = jwt.sign({ userId: hits[0]._id }, process.env.JWT_SECRET);

			console.log(token);

			res.cookie("authLogin", token, {
				httpOnly: true,
				signed: true
			})

			res.status(200).send();
		}
		else {
			res.status(401).send();
		}
	}
	catch(err) {
		console.log(err);
		res.status(404).json({
			error: err
		})
	}
});

router.post("/add-data-user/:hash", (req, res) => {

	if (!req.user) {
		res.status(401).send();
	}

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

router.get("/get-user-data/:hash/:limit?", (req, res) => {

	if (!req.user) {
		res.status(401).send();
	}

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


module.exports = router;
