var request = require('request-promise');

async function arraysum() {

	// This variable contains the data
	// you want to send
	var data = {
		array: ["Cough","Chest Pain"]
	}

	var options = {
		method: 'POST',

		// http:flaskserverurl:port/route
		uri: 'http://127.0.0.1:8000/predict',
		body: data,

		// Automatically stringifies
		// the body to JSON
		json: true
	};

	var sendrequest = await request(options)

		// The parsedBody contains the data
		// sent back from the Flask server
		.then(function (parsedBody) {
			console.log(parsedBody);
			
			// You can do something with
			// returned data
			let result;
			result = parsedBody['result'];
			console.log("Result: ", result);
		})
		.catch(function (err) {
			console.log(err);
		});
}

arraysum();
