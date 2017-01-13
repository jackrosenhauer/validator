/* eslint-env node, mocha */
"use strict";
var assert = require("assert");
var validator = require("../src/validator.js");
//IP Version 6 Addressing Architecture
//https://tools.ietf.org/html/rfc4291

//A Recommendation for IPv6 Address Text Representation
//https://tools.ietf.org/html/rfc5952

suite("validator.js isIPv6 -- ", function() {
	setup(function() {

	});
	var validIPv6 = [
		"2001:db8:0:0:1:0:0:1",
		"2001:db8::1:0:0:1",
		"2001:db8::0:1:0:0:1",
		"2001:db8:0:0:1::1",
		"2001:db8:0000:0:1::1",
		"2001:DB8:0:0:1::1",
		"2001:DB8:0:0:1::2",
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
		"::1",
		"::",
		"0000:1111:2222:3333:4444:5555:6666:7777",
		"1111:2222:3333:4444:5555:6666:7777:8888",
		"AAAA:BBBB:CCCC:DDDD:EEEE:FFFF:0000:1111",
		"::ABCD",
		"ABCD::",
		"0000:0000:0000:0000:0000:0000:0000:0000",
		"0000:0:0000:0:0000:0:0000:0",
		"FF01:0:0:0:0:0:0:101",
		"FF01::101"
	];

	var validIPv6WithPort = [
		"[2001:db8:0:0:1:0:0:1]:80",
		"[2001:db8::1:0:0:1]:1234",
		"[2001:db8::0:1:0:0:1]:30000",
		"[2001:db8:0:0:1::1]:1",
		"[2001:db8:0000:0:1::1]:443",
		"[2001:DB8:0:0:1::1]:23",
		"[2001:DB8:0:0:1::2]:65000",
		"[2001:db8:aaaa:bbbb:cccc:dddd:eeee:1]:65535",
		"[2001:db8:aaaa:bbbb:cccc:dddd::1]:65534",
		"[2001:db8:aaaa:bbbb:cccc:dddd:0:1]:43556"
	];

	var validIPv6WithIPv4 = [
		"0:0:0:0:0:0:13.1.68.3",
		"0:0:0:0:0:FFFF:129.144.52.38",
		"::13.1.68.3",
		"::FFFF:129.144.52.38"
	];

	// tests that should fail
	var falseyValues = [
		null,
		undefined,
		false,
		"",
		NaN,
		0
	];

	var invalidIPv6AddressTooMuchCompression = [
		"::1234:1234::",
		"0000::0000:0000:0000::0000:0000",
		"AAAA::BBBB:CCCC:DDDD::EEEE:FFFF",
		"1::2::3",
		"::1::2"
	];

	var invalidIPv6WithIPv4 = [
		"0:0:0:0:0:0:13.1.68.03" /* too long 9 oc*/ ,
		"0:0:0:0:0:0:0:13.1.68.3" /* too long */ ,
		"0:0:0:0:0:FFFF:129.144.052.38" /* leading 0 */ ,
		"0:0:0:0:0:0:FFFF:129.144.052.38" /* leading 0 */ ,
		"::13.01.68.3" /* leading 0 */ ,
		"::FFFF:129.144.052.38" /* leading 0 */ ,
		"9.8.7.6",
		"9.8.7.6::0",
		"9.8.7.6:0:0:0:0:0:0",
		"9.8.7.6:AAAA:BBBB:CCCC:DDDD:EEEE:FFFF",
		"9.8.7.6:AAAA:BBBB:CCCC:DDDD::FFFF",
		"9.8.7.6:AAAA:BBBB:CCCC::FFFF",
		"9.8.7.6:AAAA:BBBB::FFFF",
		"9.8.7.6:AAAA::FFFF",
		"9.8.7.6::FFFF",
	];

	var invalidIPv6AddressLeadingZeros = [
		"0001::",
		"1234:0123:1234::ABCD",
		"ABCD::0123",
		"::0123"
	];

	var invalidIPv6 = [
		"1::2::3",
		":",
		"1:x",
		"1::x",
		[],
		{},
		"1:2:3:4:5:6:7:8:9",
		"1:2:3:4:5:6:7:8:",
		"::2:3:4:5:6:8:",
		"::1:2:3:4:5:6:7:8:9",
		"1:2:3:4:5:6:7:8:9::",
		"1:2:3:4:5:6:7:8::",
		"::1:2:3:4:5:6:7:8",
		"::1:2:3:4:5:6:7:8 abcd",
		":00000:1:2:3:4:5:6",
		"00000:0:1:2:3:4:5:6",
		"0:1:2:3:4:5:6",
		"0:A:B:C:D:E:F",
		"",
		"2001:db8:aaaa:bbbb:cccc:dddd:eeee:0001",
		"2001:db8:aaaa:bbbb:cccc:dddd:eeee:001",
		"2001:db8:aaaa:bbbb:cccc:dddd:eeee:01",
	];

	validIPv6.forEach(function(ip) {
		test("valid IPv6 " + ip + " -- ", function() {
			assert.equal(true, validator.isIPv6(ip));
		});
	});

	validIPv6WithIPv4.forEach(function(ip) {
		test("valid IPv6 with IPv4 " + ip + " -- ", function() {
			assert.equal(true, validator.isIPv6(ip));
		});
	});

	falseyValues.forEach(function(ip) {
		test("IPv6 Falsey Values " + ip + " -- ", function() {
			assert.equal(false, validator.isIPv6(ip));
		});
	});

	invalidIPv6.forEach(function(ip) {
		test("invalid IPv6 -- " + ip + " -- ", function() {
			assert.equal(false, validator.isIPv6(ip));
		});
	});

	invalidIPv6AddressLeadingZeros.forEach(function(ip) {
		test("invalid IPv6 -- leading zeros -- " + ip + " -- ", function() {
			assert.equal(false, validator.isIPv6(ip));
		});
	});

	invalidIPv6WithIPv4.forEach(function(ip) {
		test("invalid IPv6 -- invalid IPv6 with IPv4 -- " + ip + " -- ", function() {
			assert.equal(false, validator.isIPv6(ip));
		});
	});

	invalidIPv6AddressTooMuchCompression.forEach(function(ip) {
		test("invalid IPv6 -- too compressed -- " + ip + " -- ", function() {
			assert.equal(false, validator.isIPv6(ip));
		});
	});
});
