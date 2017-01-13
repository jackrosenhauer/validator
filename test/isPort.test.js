/* eslint-env node, mocha, es6 */
"use strict";
var assert = require("assert");
var validator = require("../src/validator.js");
var falseyValues = require("./falseyValues.js");

suite("validator.js isPort --", function() {
	setup(function() {

	});

	var validPorts = [1, 2, 3, 100,"256", "300", 65535, "65535"];
	var invalidPorts = [-1, -500, 0, 65536];

	validPorts.forEach(function(port) {
		test(`valid port ${port} --`, function() {
			assert.equal(true, validator.isPort(port));
		});
	});

	invalidPorts.forEach(function(port) {
		test(`invalid port ${port} --`, function() {
			assert.equal(false, validator.isPort(port));
		});
	});

	falseyValues.forEach(function(falseyValue) {
		test(`falsey port value ${falseyValue} should be ${falseyValue === 0}`, function() {
			assert.equal(false, validator.isPort(falseyValue));
		});
	});
});
