var fs = require('fs');

module.exports = {
	writeLog: function(ip, request, clientId, method) {
		let dateNow = Date(Date.now());
		let data = `
			============================================= \n
			<ip>${ip}</ip> \n
			<req>${request}</req> \n
			<req>${method}</req> \n
			<date>${dateNow}</date> \n
			<clientId>${clientId}</clientId> \n
			============================================= \n
		`
		fs.appendFile("server-log.txt", data, function(err) {
			if(err) {
				return console.log(err);
			}
			console.log("Log saved !");
		}); 
	}
}