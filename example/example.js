var BigRedButton = require('../')

var bigRedButtons = []

for (var i = 0; i < BigRedButton.deviceCount(); i++) {
  console.log('opening BigRedButton', i)

  bigRedButtons.push(new BigRedButton.BigRedButton(i))

  bigRedButtons[i].on('buttonPressed', function () {
    console.log('Button pressed')
  })

  bigRedButtons[i].on('buttonReleased', function () {
    console.log('Button released')
  })

  bigRedButtons[i].on('lidRaised', function () {
    console.log('Lid raised')
  })

  bigRedButtons[i].on('lidClosed', function () {
    console.log('Lid closed')
  })

  bigRedButtons[i].on('error', function (error) {
    console.error(error)
  })
}
