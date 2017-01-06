/* eslint-env browser, es5 */
"use strict";

const HEX_CHAR = "[0-9a-fA-F]";
const OCTET = HEX_CHAR + "{1,2}";
const DOUBLE_OCTET = HEX_CHAR + "{1,4}";

function Validator() {

}

Validator.prototype = {
	isHexChar: function(hexChar){
		return new RegExp("^" + HEX_CHAR + "$").test(hexChar);
	},
	isOctet: function(octet) {
		return new RegExp("^" + OCTET + "$").test(octet);
	},
	isDoubleOctet: function(doubleOctet){
		return new RegExp("^" + DOUBLE_OCTET + "$").test(doubleOctet);
	},
	isIPv4: function(ip) {
		if (!ip){
			return false;
		}
		return true;
	},
	isIPv6: function(ip) {
		if (typeof ip !== "string" || ip.length === 0){
			return false;
		}

		ip = ip.toLowerCase();

		var split = ip.split(":");
		var empty = 0;

		split.forEach(function(octets) {
			if (octets === "" && ++empty > 1){
				return false;
			}

		});

		return true;
	}
};

if (typeof window === "undefined"){
	module.exports = new Validator();
} else {
	window.Validator = new Validator();
}
