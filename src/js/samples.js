// Samples from https://ripple.com
'use-strict'
const api = new RippleAPI.rippleLibAPI();
const rippleKeypair = RippleAPI.rippleKeypairs

// https://ripple.com/build/transactions/#payment
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

// https://ripple.com/build/rippleapi/#sign
const txJSON = '{"Flags":2147483648,"TransactionType":"AccountSet","Account":"r9cZA1mLK5R5Am25ArfXFmqgNwjZgnfk59","Domain":"726970706C652E636F6D","LastLedgerSequence":8820051,"Fee":"12","Sequence":23}';
const secret = 'shsWGZcmZz6YsWWmcnpfr6fLTdtFV';
signed = api.sign(txJSON, secret);

console.log(signed);

// Output
{
  "signedTransaction": "12000322800000002400000017201B0086955368400000000000000C732102F89EAEC7667B30F33D0687BBA86C3FE2A08CCA40A9186C5BDE2DAA6FA97A37D874473045022100BDE09A1F6670403F341C21A77CF35BA47E45CDE974096E1AA5FC39811D8269E702203D60291B9A27F1DCABA9CF5DED307B4F23223E0B6F156991DB601DFB9C41CE1C770A726970706C652E636F6D81145E7B112523F68D2F5E879DB4EAC51C6698A69304",
  "id": "02ACE87F1996E3A23690A5BB7F1774BF71CCBA68F79805831B42ABAD5913D6F4"
}
