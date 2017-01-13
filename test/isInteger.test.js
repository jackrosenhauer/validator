/* eslint-env node, mocha, es6 */
"use strict";
var assert = require("assert");
var validator = require("../src/validator.js");
var falseyValues = require("./falseyValues.js");

suite("validator.js isInteger --", function() {
	setup(function() {

	});

	var validIntegers = [1, 2, 3, 100, -1, 999999999, 2147483647, -2147483646, "256", "300"];
	var validIntegersWithMax = [
		[1, 1], [-1, -1], [0, 0], [0, 1], [-1, 0], [-100, -50], [1, 10], [-1, 10],
		["1", "1"], ["-1", "-1"], ["0", "0"], ["0", "1"], ["1", 1], ["-1", -1], ["-1", 10]
	];
	var validIntegersWithMaxAndMin = [
		[1, 1, 0], [-1, 10, -10], [0, 10, -10], [1, 10, -10], [1337, 31337, -1000],
		["1", "1", "0"], ["-1", 10, -10], [0, "10", -10], [1, 10, "-10"]
	];

	var invalidIntegers = [
		true, "9G", "--", "''", "??", "", "GG", "A", "B", "C", "D", "E", "F", "AA", "BB", "CC", "DD",
		"EE", "FF", "", "a", "b", "c", "d", "e", "f"
	];
	var invalidIntegersWithMax = [[1, -1], [0, -10], [10, -10], [-1, -10], ["1", "-1"], ["0", "-10"], ["10", "-10"], ["1", "-1"]];
	var invalidIntegersWithMaxAndMin = [[1, 0, -10], [0, -10, -50], [-1, -10, -50], [1337, -1, -1337]];

	validIntegers.forEach(function(integer) {
		test(`valid integer ${integer} --`, function() {
			assert.equal(true, validator.isInteger(integer));
		});
	});

	validIntegersWithMax.forEach(function(integer){
		test(`valid integer ${integer[0]} with max value of ${integer[1]}`, function(){
			assert.equal(true, validator.isInteger.apply(null, integer));
		});
	});

	validIntegersWithMaxAndMin.forEach(function(integer){
		test(`valid integer ${integer[0]} with max value of ${integer[1]} and min value of ${integer[2]}`, function(){
			assert.equal(true, validator.isInteger.apply(null, integer));
		});
	});

	invalidIntegers.forEach(function(integer) {
		test(`invalid integer ${integer} --`, function() {
			assert.equal(false, validator.isInteger(integer));
		});
	});

	invalidIntegersWithMax.forEach(function(integer){
		test(`invalid integer ${integer[0]} with max value of ${integer[1]}`, function(){
			assert.equal(false, validator.isInteger.apply(null, integer));
		});
	});

	invalidIntegersWithMaxAndMin.forEach(function(integer){
		test(`invalid integer ${integer[0]} with max value of ${integer[1]} and min value of ${integer[2]}`, function(){
			assert.equal(false, validator.isInteger.apply(null, integer));
		});
	});

	falseyValues.forEach(function(falseyValue) {
		test(`falsey value ${falseyValue} should be ${falseyValue === 0}`, function() {
			assert.equal(falseyValue === 0, validator.isInteger(falseyValue));
		});
	});
});
