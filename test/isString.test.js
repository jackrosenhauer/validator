/* eslint-env node, mocha, es6 */
"use strict";
var assert = require("assert");
var validator = require("../src/validator.js");
var falseyValues = require("./falseyValues.js");

suite("validator.js isString --", function() {
	setup(function() {

	});

	var validStrings = ["test", "nope", "fluid", "rubber", "baron", "laskdjf;laskjdf;lakjsdfl;kjasfd", ""
	];

	var validStringsWithMaxLength = [["abc", 3], ["testing", 10], ["some random string", 25]];
	var validStringsWithMaxAndMinLength = [["abc", 10, 1], ["abc", 10, 2], ["abc", 10, 3], ["abc", 3, 3]];

	var invalidStringsWithMaxLength = [["abc", 2], ["asdf", 1], ["abc", 2]];
	var invalidStringsWithMaxAndMinLength = [["abc", 2, 1], ["abc", 1, 1]];

	var invalidStrings = [123, true, [1, 2, 3], {1:2, 2:3}
	];

	validStrings.forEach(function(string) {
		test(`valid string '${string}' --`, function() {
			assert.equal(true, validator.isString(string));
		});
	});

	validStringsWithMaxLength.forEach(function(string){
		test(`valid string '${string[0]}' with maxLen ${string[1]} --`, function() {
			assert.equal(true, validator.isString(string[0], string[1]));
		});
	});

	invalidStrings.forEach(function(string) {
		test(`invalid string '${string}' --`, function() {
			assert.equal(false, validator.isString(string));
		});
	});

	validStringsWithMaxLength.forEach(function(string){
		test(`valid string '${string[0]}' with maxLen ${string[1]} --`, function(){
			assert.equal(true, validator.isString(string[0], string[1]));
		});
	});

	validStringsWithMaxAndMinLength.forEach(function(string){
		test(`valid string '${string[0]}' with maxLen ${string[1]} and minLen ${string[1]}  --`, function(){
			assert.equal(true, validator.isString(string[0], string[1], string[2]));
		});
	});

	invalidStringsWithMaxLength.forEach(function(string){
		test(`invalid string '${string[0]}' with maxLen ${string[1]}`, function(){
			assert.equal(false, validator.isString(string[0], string[1]));
		});
	});

	invalidStringsWithMaxAndMinLength.forEach(function(string){
		test(`invalid string '${string[0]}' with maxLen ${string[1]} and minLen ${string[2]}`, function(){
			assert.equal(false, validator.isString(string[0], string[1], string[2]));
		});
	});

	falseyValues.forEach(function(falseyValue) {
		test(`falsey value String ${falseyValue}`, function() {
			assert.equal(falseyValue === "", validator.isString(falseyValue));
		});
	});
});
