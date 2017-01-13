/* eslint-env node, mocha, es6 */
"use strict";
var assert = require("assert");
var validator = require("../src/validator.js");
var falseyValues = require("./falseyValues.js");

suite("validator.js isBoolean --", function() {
	setup(function() {

	});

	var validBooleans = [true, false, "true", "false", 1, 0];

	var invalidBooleans = ["9G", "--", "''", "??", "-1", "", "GG", "A", "B", "C", "D", "E", "F", "AA", "BB", "CC", "DD", "EE", "FF",
		"256", "300", -1, "", "a", "b", "c", "d", "e", "f"
	];

	validBooleans.forEach(function(boolean) {
		test(`valid boolean ${boolean} --`, function() {
			assert.equal(true, validator.isBoolean(boolean));
		});
	});

	invalidBooleans.forEach(function(boolean) {
		test(`invalid boolean ${boolean} --`, function() {
			assert.equal(false, validator.isBoolean(boolean));
		});
	});

	falseyValues.forEach(function(falseyValue) {
		test(`falsey value ${falseyValue} should be ${falseyValue == true || falseyValue == false}`, function() {
			assert.equal(falseyValue === false || falseyValue === 0, validator.isBoolean(falseyValue));
		});
	});
});
