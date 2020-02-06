# Harta Poluare Brasov Middleware Server

### Features

- Rest API for searching in AWS - ElasticSearch


### Modules

HartaPoluareBrasov uses a number of open source projects to work properly:

* [aws-sdk] - Amazon web services SDK for nodeJS
* [cors] - CORS is a node.js package for providing a Connect/Express middleware that can be used to enable CORS with various options.
* [dotenv] - Dotenv is a zero-dependency module that loads environment variables from a .env file into process.env.
* [elasticsearch] - The official Node.js client for Elasticsearch.
* [express] - evented I/O for the backend

### Installation

Actual developments for HartaPoluareBrasov requires 
* [Node.js](https://nodejs.org/) v12.13.1
* [NPM](https://www.npmjs.com/get-npm) v6.12.1
 
Create the ".env" file in the /server folder:
```
AWS_USER=<USER FOR AWS>
AWS_PASS=<PASS FOR USER>
```

Install the modules and start the server.

```sh
$ git clone https://github.com/georgealexandruiancu/hartapoluarebrasov
$ cd server
$ npm install --save
$ npm start
```

### API
# 1. *Recive all data*
```
/getAll
```
-- Return all data from DB elasticsearch with limit of 1000 entries

# 2. *Recive specific data from sensors*
```
/getAll/<sensor>/<limit>
```
- 1. If we specific only the <sensor>, api will get us the 1000 entries from that sensor
    <sensor: mq135 || mq1>
- 2. If we specific the <sensor> with <limit> we will have the data from sensor with a limit for entries
    <limit: 0 -> 10000>
- E.g.: ```/getAll/mq135/100```

# 3. *Register user in database with cluster*
Method: ```PUT```
```
/registerUser/<hash>
```
- 1. This will register a new user in database for his <hash>

# 4. *Add data for user*
Method: ```POST```
```
/addDataUser/<hash>
```
- 1. Body Object to Post:
```
{
	"MQ135": {
		"value": <NUMBER>
	},
	"PM25": {
		"dustDensity": <NUMBER>,
		"value": <NUMBER>
	},
	"gpslocation": {
		"location": {
			"lat": <NUMBER>,
			"lon": <NUMBER>
		}
	},
	"humidity": <NUMBER>,
	"name": <TEXT>,
	"temperature": <NUMBER>
}
```

# 5. *Get Data from a user*
Method: ```GET```
```
/getUserData/<hash>
```
- 1. Recieve data from user with id <hash>

# 6. *Get All Data from all users*
Method: ```GET```
```
/getAllData?limit=<NUMBER>
```
- 1. Recieve data from all users
- 2. ```?limit=``` - is an optional query

### TODO
- ~~post data to index~~
- get data by keywords
- get data with filters
- store data to middleware for 12 hours
- ~~register an user~~
- ~~add data to user~~
- ~~get data from user~~

