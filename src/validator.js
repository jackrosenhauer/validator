/* eslint-env browser, es5 */
"use strict";

const HEX_CHAR = "[0-9a-fA-F]";
const NON_ZERO_HEX_CHAR = "[1-9a-fA-F]";
const HEX_OCTET = HEX_CHAR + "{1,2}";
const DOUBLE_HEX_OCTET = HEX_CHAR + "{1,4}";
const NON_LEADING_ZERO_DOUBLE_HEX_OCTET = NON_ZERO_HEX_CHAR + HEX_CHAR + "{0,3}";

function Validator() {
	var self = this;
	self.BreakException = function(message) {
		this.name = "BreakException";
		this.message = message || "Break Exception";
		this.stack = (new Error()).stack;
	};
	self.BreakException.prototype = Object.create(Error.prototype);
	self.BreakException.prototype.constructor = self.BreakException;
}

Validator.prototype = {
	isDecOctet: function(decOctet) {
		var reg = new RegExp("^([0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5])$");
		return reg.test(decOctet);
	},
	isHexChar: function(hexChar) {
		return new RegExp("^" + HEX_CHAR + "$").test(hexChar);
	},
	isHexOctet: function(octet) {
		return new RegExp("^" + HEX_OCTET + "$").test(octet);
	},
	isDoubleHexOctet: function(doubleOctet) {
		return new RegExp("^" + DOUBLE_HEX_OCTET + "$").test(doubleOctet);
	},
	isNonLeadingZeroDoubleHexOctet: function(doubleOctet) {
		return new RegExp("^" + NON_LEADING_ZERO_DOUBLE_HEX_OCTET + "$|^0{1,4}$").test(doubleOctet);
	},
	isIPv4: function(ip) {
		var self = this;
		if (!ip) {
			return false;
		}
		var decOctets = ip.split(".");
		if (decOctets.length !== 4) {
			return false;
		};

		try {
			decOctets.forEach(function(decOctet) {
				if (self.isDecOctet(decOctet) === false) {
					throw new Error("Break Exception");
				}
			});
		} catch (e) {
			if (e.message !== "Break Exception") throw e;
			return false;
		}

		return true;
	},
	isIPv6: function(ip) {
		var self = this;
		if (typeof ip !== "string" || ip.length === 0) {
			return false;
		}
		ip = ip.toLowerCase();

		if (ip === "::" || ip === "::1") {
			return true;
		}

		var hasSecretValue = new RegExp("^::|::$").test(ip);
		var doubleHexOctets = ip.split(":");
		if (doubleHexOctets.length > 8 || doubleHexOctets.length === 1 || (doubleHexOctets.length !== 8 && ip.indexOf("::") === -1 && ip.indexOf(".") === -1)) {
			return false;
		}
		// try {
		// 	var empty = 0;
		// 	doubleHexOctets.forEach(function(doubleHexOctet, index) {
		// 		if (doubleHexOctet === "") {
		// 			if (++empty > 1 && hasSecretValue === false) {
		// 				throw new Error("Break Exception");
		// 			} else if (empty > 2 && hasSecretValue === true) {
		// 				throw new Error("Break Exception");
		// 			}
		// 		} else if (index + 1 === doubleHexOctets.length && doubleHexOctet.indexOf(".") !== -1) {
		// 			if (doubleHexOctets.length + 1 > 8){
		// 				throw new Error("Break Exception");
		// 			} else if (self.isIPv4(doubleHexOctet) === false){
		// 				throw new Error("Break Exception");
		// 			}
		// 		} else if (self.isNonLeadingZeroDoubleHexOctet(doubleHexOctet) === false) {
		// 			throw new Error("Break Exception");
		// 		}
		// 	});
		// } catch (e) {
		// 	if (e.message !== "Break Exception") throw e;
		// 	return false;
		// }
		var empty = 0;
		for (var i = 0, len = doubleHexOctets.length; i < len; i++) {
			var doubleHexOctet = doubleHexOctets[i];
			if (doubleHexOctet === "") {
				if (++empty > 1 && hasSecretValue === false) {
					return false;
				} else if (empty > 2 && hasSecretValue === true) {
					return false;
				}
			} else if (i + 1 === doubleHexOctets.length && doubleHexOctet.indexOf(".") !== -1) {
				if (doubleHexOctets.length + 1 > 8) {
					return false;
				} else if (self.isIPv4(doubleHexOctet) === false) {
					return false;
				}
			} else if (self.isNonLeadingZeroDoubleHexOctet(doubleHexOctet) === false) {
				return false;
			}
		}

		return true;
	},
	isPort: function(port) {

	},
	isString: function(string, maxLen, minLen) {
		if (typeof string !== "string") {
			return false;
		} else if (minLen) {
			return string.length <= maxLen && string.length >= minLen;
		} else if (maxLen) {
			return string.length <= maxLen;
		}

		return true;
	},
	isNumber: function(number, max, min) {

	},
	isUSZipCode: function(zip) {

	},
	isTime: function(time) {

	},
	isEmail: function(email) {

	},
	isFloat: function(float) {

	},
	isInteger: function(integer, max, min) {

	},
	isNumeric: function(number) {

	},
	isBoolean: function(boolean) {
		if (typeof boolean === "string") {
			return (boolean.toLowerCase() === "false" || boolean.toLowerCase() === "true");
		} else {
			return boolean == true || boolean == false;
		}
	},
	isURL: function(url) {

	},
	isUSPhoneNumber: function(phoneNumber) {

	},
	isFacebookProfileLink: function(facebookURL) {

	}
};

if (typeof window === "undefined") {
	module.exports = new Validator();
} else {
	window.Validator = new Validator();
}
