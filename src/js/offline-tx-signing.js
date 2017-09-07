'use-strict'
const api = new RippleAPI.rippleLibAPI()

const model = {
  data: {}
}
const controller = {
  init: function() {
    view.init()
    this.watchForm()
  },
  watchForm: function() {
    let form = view.form
    form.addEventListener('submit', function(event) {
      let formData = new FormData(form)
      formData.append('username', 'Bonzo')
      controller.setData(formData)
      event.preventDefault()
      view.renderData()
    })
  },
  setData: function(formData) {
    model.data = {}
    for (let keyVals of formData.entries()) {
      model.data[keyVals[0]] = keyVals[1]
    }
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
    },
    controller.setSignedPayment()
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
        model.signedPayment = prepared
        console.log(prepared)
        console.log(JSON.stringify(model.signedPayment, null, 2))
        view.signedPayment(prepared)
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
  },
  renderData: function() {
    const paymentData = controller.getPaymentData()
    const data = controller.getData()
    const payment = JSON.stringify(paymentData, null, 2)
    const signedPayment = JSON.stringify(controller.getSignedPayment(), null, 2)
    const output = `
    <h2>Payment</h2>
    <pre>${payment}</pre>
    <h2>Raw Values</h2>
    <pre>
    {
      sender: ${data.senderAddress}
      recipient: ${data.recipientAddress}
      secret: ${data.senderSecret}
      amount: ${data.amount}
    }
    </pre>
    `
    this.output.insertAdjacentHTML('afterbegin', output)
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
