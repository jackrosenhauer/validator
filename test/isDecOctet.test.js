/* eslint-env node, mocha, es6 */
"use strict";
var assert = require("assert");
var validator = require("../src/validator.js");
var falseyValues = require("./falseyValues.js");

suite("validator.js isString --", function() {
	setup(function() {

	});

	var validDecOctets = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "100", "200", "255", "199", "50", "99", "199", "254", 254, 1,
		2, 3, 4, 5, 6, 7, 8, 9, 10, 50, 99, 100, 199, 200, 255, 250, "250"
	];

	var invalidDecOctets = ["9G", "--", "''", "??", "-1", "", "GG", "A", "B", "C", "D", "E", "F", "AA", "BB", "CC", "DD", "EE", "FF",
		"256", "300", -1, "", "a", "b", "c", "d", "e", "f"
	];

	validDecOctets.forEach(function(octet) {
		test(`valid Octet ${octet} --`, function() {
			assert.equal(true, validator.isDecOctet(octet));
		});
	});

	invalidDecOctets.forEach(function(octet) {
		test(`invalid octet ${octet} --`, function() {
			assert.equal(false, validator.isDecOctet(octet));
		});
	});

	falseyValues.forEach(function(falseyValue) {
		test(`falsey value Hex Char ${falseyValue} should be ${falseyValue === 0}`, function() {
			assert.equal(falseyValue === 0, validator.isDecOctet(falseyValue));
		});
	});
});
