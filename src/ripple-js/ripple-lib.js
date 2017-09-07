// Grab an existing namespace object, or create a blank object
// if it doesn't exist
const RippleAPI = window.RippleAPI || {};

RippleAPI.rippleLibAPI = require('ripple-lib').RippleAPI;
RippleAPI.rippleKeypairs = require('ripple-keypairs')

// Replace/Create the global namespace
window.RippleAPI = RippleAPI;
