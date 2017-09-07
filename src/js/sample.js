'use-strict'
const api = new RippleAPI.rippleLibAPI();
const rippleKeypair = RippleAPI.rippleKeypairs

const unsignedTransactionExample = {
  "TransactionType" : "Payment",
  "Account" : "rf1BiGeXwwQoi8Z2ueFYTEXSwuJYfV2Jpn",
  "Destination" : "ra5nK24KXen9AHvsdFTKHSANinZseWnPcX",
  "Amount" : {
     "currency" : "USD",
     "value" : "1",
     "issuer" : "rf1BiGeXwwQoi8Z2ueFYTEXSwuJYfV2Jpn"
  },
  "Fee": "10",
  "Flags": 2147483648,
  "Sequence": 2,
}

const txJSON = '{"Flags":2147483648,"TransactionType":"AccountSet","Account":"r9cZA1mLK5R5Am25ArfXFmqgNwjZgnfk59","Domain":"726970706C652E636F6D","LastLedgerSequence":8820051,"Fee":"12","Sequence":23}';
const secret = 'shsWGZcmZz6YsWWmcnpfr6fLTdtFV';
console.log(api.sign(txJSON, secret));
