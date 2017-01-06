/* eslint-env node, mocha, es6 */
"use strict";
var assert = require("assert");
var validator = require("../src/validator.js");
var falseyValues = require("./falseyValues.js");

suite("validator.js isHexChar --", function() {
	setup(function() {

	});
	var validHexChar = [
		0,
		1,
		2,
		3,
		4,
		5,
		6,
		7,
		8,
		9,
		"0",
		"1",
		"2",
		"3",
		"4",
		"5",
		"6",
		"7",
		"8",
		"9",
		"a",
		"b",
		"c",
		"d",
		"e",
		"f",
		"A",
		"B",
		"C",
		"D",
		"E",
		"F"
	];

	var invalidHexChar = [
		"'",
		"G",
		"g",
		"Z",
		"z",
		"00",
		"12",
		"[",
		"!",
		"&",
		10,
		"-1"
	];

	validHexChar.forEach(function(hexChar) {
		test(`valid hex char '${hexChar}' --`, function() {
			assert.equal(true, validator.isHexChar(hexChar));
		});
	});

	invalidHexChar.forEach(function(hexChar) {
		test(`invalid hex char '${hexChar}' --`, function() {
			assert.equal(false, validator.isHexChar(hexChar));
		});
	});

	falseyValues.forEach(function(falseyValue) {
		test(`falsey value hex char ${falseyValue} should be ${falseyValue === 0}`, function(){
			assert.equal(falseyValue === 0, validator.isHexChar(falseyValue));
		});
	});
});
