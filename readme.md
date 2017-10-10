Simple Ripple Client
====================
## Super Simple Ripple Client
This client generates Ripple address offline using [ripple-lib](https://github.com/ripple/ripple-lib).
Open `/dist/index.html` in an offline browser to generate a public Ripple address and associated secret.
**Do not lose your secret!**

In progress: Offline signing for payments

## How to Use
* Install node modules (using npm or Yarn)
* Run `grunt`
* Access `path/to/project/dist/index.html`

## Signing and Submitting Ripple Transactions

To sending a transaction to the XRP Ledger:

* Create an unsigned transaction in JSON format
* Use one or more signatures to authorize the transaction
* Submit a transaction to a rippled server. If the transaction is properly formed, the server provisionally applies the transaction to its current version of the ledger and relays the transaction to other members of the peer-to-peer network
* The consensus process determines which provisional transactions get included in the next validated ledger
* The rippled servers apply those transactions to the previous ledger in a canonical order and share their results
* If enough trusted validators created the exact same ledger, that ledger is declared validated and the results of the transactions in that ledger are immutable

Source: [Signing & Submitting Ripple Transactions][ripple-signing]

## References
* [XRP Transactions](https://ripple.com/build/transactions/signing-and-submitting-transactions)

[ripple-signing]: https://ripple.com/build/transactions/signing-and-submitting-transactions
