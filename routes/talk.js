var request = require('request-promise');

async function arraysum() {

	// This variable contains the data
	// you want to send
	var data = {
		array: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
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
			console.log("Sum of Array from Python: ", result);
		})
		.catch(function (err) {
			console.log(err);
		});
}

arraysum();
