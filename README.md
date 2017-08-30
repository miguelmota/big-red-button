# Big Red Button

> A node-hid based driver to read actions from the [Dream Cheeky Big Red Button](http://dreamcheeky.com/big-red-button).

<img src="./assets/big_red_button.jpg" width="350">

## Credit

This was initially a fork of [BigRedButtonNodeHID](https://github.com/codepope/BigRedButtonNodeHID) by [Dj Walker-Morgan](https://github.com/codepope).

# Install

```bash
npm install big-red-button
```

# Usage

```javascript
var BigRedButton = require('big-red-button');

var bigRedButtons = [];

for (var i = 0; i < BigRedButton.deviceCount(); i++) {
  console.log('opening BigRedButton', i);

  bigRedButtons.push(new BigRedButton.BigRedButton(i));

  bigRedButtons[i].on('buttonPressed', function () {
    console.log('Button pressed');
  });

  bigRedButtons[i].on('buttonReleased', function () {
    console.log('Button released');
  });

  bigRedButtons[i].on('lidRaised', function () {
    console.log('Lid raised');
  });

  bigRedButtons[i].on('lidClosed', function () {
    console.log('Lid closed');
  });

}
```

## Events

- `lidRaised`

- `lidClosed`

- `buttonPressed`

- `buttonReleased`

## State methods

- `button.isLidUp()`

- `button.isLidDown()`

- `button.isButtonPressed()`

# License

MIT
