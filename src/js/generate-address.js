'use strict';
// The ripple library must be included first in the browser
const api = new RippleAPI.rippleLibAPI();
const rippleKeypair = RippleAPI.rippleKeypairs

const view = {
  init: function() {
    this.displayAddress = document.getElementById('address')
    this.generateAddressButton = document.getElementById('generate-address')
    this.render()
  },
  render: function() {
    this.generateAddressButton.addEventListener('click', () => {
      controller.setAddress()
      this.display()
    })
  },
  display: function() {
    const address = controller.getAddress()
    let displayAddress = `
    <table>
    <tr><td>Address:</td><td class="selector" title="Double click to select">${address.address}</td></tr>
    <tr><td>Secret: </td><td class="selector" title="Double click to select">${address.secret}</td></tr>
    <tr><td>Public Key: </td><td class="form-selector">${address.publicKey}</td></tr>
    <tr><td>Private Key: </td><td>${address.privateKey}</td></tr>
    </table>
    `
    this.displayAddress.innerHTML = displayAddress
  }
}
const controller = {
  init: function() {
    view.init()
  },
  xsetAddress: () => {
    model.address = api.generateAddress();
    console.log(model.address)
  },
  setAddress: () => {
    const secret = rippleKeypair.generateSeed()
    const keypair = rippleKeypair.deriveKeypair(secret)
    model.address = {
      'secret': secret,
      'address': rippleKeypair.deriveAddress(keypair.publicKey),
      'publicKey': keypair.publicKey,
      'privateKey': keypair.privateKey
    }
  },
  getAddress: () => {
    return model.address
  }
}

const model = {
  address: {}
}

controller.init()

// Simple address generation:
// const address = api.generateAddress();
// console.log(address);
