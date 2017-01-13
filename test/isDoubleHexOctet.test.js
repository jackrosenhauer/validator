/* eslint-env node, mocha, es6*/
"use strict";
var assert = require("assert");
var validator = require("../src/validator.js");
var falseyValues = require("./falseyValues.js");

suite("validator isDoubleHexOctet --", function() {
	setup(function() {

	});

	var validDoubleOctets = ["1111", "2222", "9999", "0000", "AAAA", "BBBB", "CCCC", "DDDD", "EEEE", "FFFF", "0", "1", "2", "3", "4", "5", "6", "7", "8",
		"9", "AA", "FF", "AAA", "FFF", "999", "000", "111",  "2001", "db8"
	];
	var invalidDoubleOctets = ["123K", "ZZZZ", "-1", "K999", "-9999"];

	validDoubleOctets.forEach(function(doubleOctet) {
		test(`valid double octet '${doubleOctet}'`, function() {
			assert.equal(true, validator.isDoubleHexOctet(doubleOctet));
		});
	});

	invalidDoubleOctets.forEach(function(doubleOctet) {
		test(`invalid double octet '${doubleOctet}'`, function() {
			assert.equal(false, validator.isDoubleHexOctet(doubleOctet));
		});
	});

	falseyValues.forEach(function(falseyValue) {
		test(`falsey value double octet ${falseyValue} should be ${falseyValue === 0}`, function() {
			assert.equal(falseyValue === 0, validator.isDoubleHexOctet(falseyValue));
		});
	});
});
