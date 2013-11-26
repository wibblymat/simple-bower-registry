'use strict';

var express = require('express');
var fs = require('fs');

var app = express();
var packages = {};
var port = 3333;
var storage = process.argv[2] || './package-data.json';

if (fs.existsSync(storage)) {
	packages = JSON.parse(fs.readFileSync(storage));
}

app.configure(function () {
	app.use(express.bodyParser());
    app.use(app.router);
    app.use(express.logger());
    app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.listen(port, function () {
	console.log('simple-bower-registry');
	console.log('---------------------');
	console.log('           port: %d', port);
	console.log('      data file: %s', storage);
	console.log('packages loaded: %d', Object.keys(packages).length);
});

app.get('/packages', function (request, response) {
	var result = [];
	for (var name in packages) {
		result.push({
			name: name,
			url: packages[name]
		});
	}
	response.send(result);
});

app.post('/packages', function (request, response) {
	packages[request.body.name] = request.body.url;
	fs.writeFile(storage, JSON.stringify(packages), function (err) {
		if (err) {
			console.log('Failed to write the package data to disk!');
			console.log(err);
		}
	});
	response.send(201);
});

app.get('/packages/:name', function (request, response) {
	var name = request.params.name;

	if (!packages[name]) {
		response.send(404);
	} else {
		response.send({
			name: name,
			url: packages[name]
		});
	}
});

app.get('/packages/search/:name', function (request, response) {
	var results = Object.keys(packages).filter(function (pkgName) {
		return pkgName.indexOf(request.params.name) !== -1;
	}).map(function (pkgName) {
		return {
			name: pkgName,
			url: packages[pkgName]
		};
	});

	response.send(results);
});
