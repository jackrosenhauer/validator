/* eslint-env node, mocha */
"use strict";
var assert = require("assert");
var validator = require("../src/validator.js");
//IP Version 6 Addressing Architecture
//https://tools.ietf.org/html/rfc4291

//A Recommendation for IPv6 Address Text Representation
//https://tools.ietf.org/html/rfc5952

suite("validator.js isIPv6 -- ", function(){
	setup(function(){

	});
	var validIPv6 = [
		"2001:db8:0:0:1:0:0:1",
		"2001:0db8:0:0:1:0:0:1",
		"2001:db8::1:0:0:1",
		"2001:db8::0:1:0:0:1",
		"2001:0db8::1:0:0:1",
		"2001:db8:0:0:1::1",
		"2001:db8:0000:0:1::1",
		"2001:DB8:0:0:1::1",
		"2001:DB8:0:0:1::2",
		"2001:db8:aaaa:bbbb:cccc:dddd:eeee:0001",
		"2001:db8:aaaa:bbbb:cccc:dddd:eeee:001",
		"2001:db8:aaaa:bbbb:cccc:dddd:eeee:01",
		"2001:db8:aaaa:bbbb:cccc:dddd:eeee:1",
		"2001:db8:aaaa:bbbb:cccc:dddd::1",
		"2001:db8:aaaa:bbbb:cccc:dddd:0:1",
		"2001:db8:0:0:0::1",
		"2001:db8:0:0::1",
		"2001:db8:0::1",
		"2001:db8::1",
		"2001:db8:aaaa:bbbb:cccc:dddd:eeee:aaaa",
		"2001:db8:aaaa:bbbb:cccc:dddd:eeee:AAAA",
		"2001:db8:aaaa:bbbb:cccc:dddd:eeee:AaAa",
		"::1"
	];

	var falseyValues = [
		null,
		undefined,
		false,
		"",
		NaN,
		0
	];

	var invalidIPv6 = [
		"1::2::3",
		"::",
		"1:x",
		"1::x",
		[],
		{},

	];

	validIPv6.forEach(function(ip){
		test("valid IPv6 " + ip + " -- ", function(){
			assert.equal(true, validator.isIPv6(ip));
		});
	});

	falseyValues.forEach(function(ip){
		test("IPv6 Falsey Values " + ip + " -- ", function(){
			assert.equal(false, validator.isIPv6(ip));
		});
	});

	invalidIPv6.forEach(function(ip){
		test("invalid IPv6 -- " + ip + " -- ", function(){
			assert.equal(false, validator.isIPv6(ip));
		});
	});
});
