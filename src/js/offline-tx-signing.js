'use-strict'
const api = new RippleAPI.rippleLibAPI()

const model = {
  data: {}
}
const controller = {
  init: function() {
    view.init()
    view.renderAddresses()
    this.watchForm()
  },
  watchForm: function() {
    let form = view.form
    form.addEventListener('submit', function(event) {
      let formData = new FormData(form)
      formData.append('username', 'Bonzo')
      controller.setData(formData)
      controller.setPayment()
      controller.setSignedPayment()
      event.preventDefault()
      view.renderData()
    })
  },
  setData: function(formData) {
    model.data = {}
    for (let keyVals of formData.entries()) {
      model.data[keyVals[0]] = keyVals[1]
    }
  },
  setPayment: function() {
    model.payment = {
      source: {
        address: model.data.senderAddress,
        maxAmount: {
          value: model.data.amount,
          currency: 'XRP'
        }
      },
      destination: {
        address: model.data.recipientAddress,
        tag: model.data.destinationTag || undefined,
        amount: {
          value: model.data.amount,
          currency: 'XRP'
        }
      }
    }
  },
  setSignedPayment: function() {
    const data = this.getData()
    const payment = this.getPaymentData()
    const instructions = {
      fee: '0.005',
      sequence: 1,
      maxLedgerVersion: null
    }
    api.preparePayment(data.senderAddress, payment, instructions)
      .then(prepared => {
        console.log(prepared)
        model.signedPayment = prepared
        signed = api.sign(prepared.txJSON, model.data.senderSecret)
        view.signedPayment(signed)
      })
  },
  getData: function() {
    return model.data
  },
  getPaymentData: function() {
    return model.payment
  },
  getSignedPayment: function() {
    return model.signedPayment
  },
  getGeneratedAddresses: () => {
    return localStorage.getItem('addresses')
  }
}

const view = {
  init: function() {
    this.form = document.forms.namedItem('signing-form')
    this.senderAddressEl = document.getElementById('sender-address')
    this.senderSecretEl = document.getElementById('sender-secret')
    this.recipientAddressEl = document.getElementById('recipient-address')
    this.amountEl = document.getElementById('amount')
    this.submitEl = document.getElementById('sign-transaction')
    this.output = document.getElementById('address')
    this.storedAddresses = document.getElementById('stored-addresses')
  },
  renderData: function() {
    const paymentData = controller.getPaymentData()
    const data = controller.getData()
    const payment = JSON.stringify(paymentData, null, 2)
    const signedPayment = JSON.stringify(controller.getSignedPayment(), null, 2)
    const output = `
    <h2>Payment</h2>
    <pre>${payment}</pre>
    `
    this.output.insertAdjacentHTML('afterbegin', output)
  },
  renderAddresses: function() {
    const addresses = JSON.parse(controller.getGeneratedAddresses())
    // let addressTable = `<table><thead><tr><th>Public Address</th><th>Secret</th></tr></thead>`
    // let addressRow = addresses.map((x) => {
    //   return `<tr><td>${x.address}</td><td>${x.secret}</td></tr>`
    // })
    // for (let i = 0; i < addressRow.length; i++) {
    //   addressTable += addressRow[i]
    // }
    // addressTable += `</table>`
    let addressTable = ''
    for (var i = 0; i < addresses.length; i++) {
      let x = addresses[i]
      addressTable += `
      <table class="table">
      <tr><td>Address:</td><td class="selector" title="Double click to select">${x.address}</td></tr>
      <tr><td>Secret: </td><td class="selector" title="Double click to select">${x.secret}</td></tr>
      <tr><td>Public Key: </td><td class="form-selector">${x.publicKey}</td></tr>
      <tr><td>Private Key: </td><td>${x.privateKey}</td></tr>
      </table>
      `
    }

    this.storedAddresses.insertAdjacentHTML('afterbegin', addressTable)
  },
  signedPayment: function(signed) {
    signedOutput = JSON.stringify(signed, null, 2)
    const output = `
      <h2>Signed Payment</h2>
      <pre>${signedOutput}</pre>
    `
    this.output.insertAdjacentHTML('afterbegin', output)
  }
}

controller.init()
