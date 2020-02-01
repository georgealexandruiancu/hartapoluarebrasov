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

