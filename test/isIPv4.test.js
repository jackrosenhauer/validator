/* eslint-env node, mocha, es6 */
"use strict";
var assert = require("assert");
var validator = require("../src/validator.js");
var falseyValues = require("./falseyValues.js");

suite("validator.js isIPv4", function(){
	setup(function(){

	});

	var validIPv4 = ["1.1.1.1", "0.0.0.0", "255.255.255.255", "1.2.3.4"];
	var invalidIPv4 = ["...", "...1", ".2.2.", "a.b.c.d", "255.255.255.256", "256.256.256.256", "1.1.1.a", "1.2", "1.2.3"];
	var invalidIPv4AddressLeadingZeros = [
		"09.1.1.1",
		"9.09.1.1",
		"9.9.09.9",
		"9.9.9.09"
	];

	validIPv4.forEach(function(ipv4){
		test(`valid IPv4 address ${ipv4}`, function(){
			assert.equal(true, validator.isIPv4(ipv4));
		});
	});

	invalidIPv4.forEach(function(ipv4){
		test(`invalid IPv4 address ${ipv4}`, function(){
			assert.equal(false, validator.isIPv4(ipv4));
		});
	});

	invalidIPv4AddressLeadingZeros.forEach(function(ipv4){
		test(`invalid IPv4 -- leading zeros -- ${ipv4}`, function(){
			assert.equal(false, validator.isIPv4(ipv4));
		});
	});

	falseyValues.forEach(function(falseyValue){
		test(`falsey value IPv4 address ${falseyValue}`, function(){
			assert.equal(false, validator.isIPv4(falseyValue));
		});
	});
});
