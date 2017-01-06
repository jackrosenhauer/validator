/* eslint-env node, mocha, es6 */
"use strict";
var assert = require("assert");
var validator = require("../src/validator.js");
var falseyValues = require("./falseyValues.js");

suite("validator.js isOctet --", function(){
	setup(function(){

	});

	var validOctets = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "A", "B", "C", "D", "E", "F", "10", "11", "12", "13", "14", "AA", "BB", "CC", "DD", "EE", "FF"];
	var invalidOctets = ["9G", "--", "''", "??", "-1", "", "GG", "000", "111"];

	validOctets.forEach(function(octet){
		test(`valid Octet ${octet} --`, function(){
			assert.equal(true, validator.isOctet(octet));
		});
	});

	invalidOctets.forEach(function(octet){
		test(`invalid octet ${octet} --`, function(){
			assert.equal(false, validator.isOctet(octet));
		});
	});

	falseyValues.forEach(function(falseyValue) {
		test(`falsey value Hex Char ${falseyValue} should be ${falseyValue === 0}`, function(){
			assert.equal(falseyValue === 0, validator.isHexChar(falseyValue));
		});
	});
});
