/* eslint-env node, mocham es6*/
"use strict";
var assert = require("assert");
var validator = require("../src/validator.js");
var falseyValues = require("./falseyValues.js");

suite("validator isDoubleOctet --", function(){
	setup(function(){

	});

	var validDoubleOctets = ["1111", "2222", "9999", "0000", "AAAA", "BBBB", "CCCC", "DDDD", "EEEE", "FFFF"];
	var invalidDoubleOctets = ["123K", "ZZZZ", "-1", "K999", "-9999"];

	validDoubleOctets.forEach(function(doubleOctet){
		test(`valid double octet '${doubleOctet}'`, function(){
			assert.equal(true, validator.isDoubleOctet(doubleOctet));
		});
	});

	invalidDoubleOctets.forEach(function(doubleOctet){
		test(`invalid double octet '${doubleOctet}'`, function(){
			assert.equal(false, validator.isDoubleOctet(doubleOctet));
		});
	});

	falseyValues.forEach(function(falseyValue) {
		test(`falsey value double octet ${falseyValue} should be ${falseyValue === 0}`, function(){
			assert.equal(falseyValue === 0, validator.isHexChar(falseyValue));
		});
	});
});
