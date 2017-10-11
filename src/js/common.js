'use strict'
const template = `
<li><a href="./index.html">Generate Ripple Address</a></li>
<li><a href="./offline-signing.html">Sign Transaction</a></li>
<li><a href="./manage-addresses.html">Manage Addresses</a></li>
`
const navigation = {
  init: function() {
    const nav = document.createElement('ul')
    nav.innerHTML = template
    document.getElementById('nav').appendChild(nav)
  }
}
navigation.init()
