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

  bigRedButtons[i].on('error', function (error) {
    console.error(error);
  });
}
```

## Events

- `lidRaised`

- `lidClosed`

- `buttonPressed`

- `buttonReleased`

- `error`

## State methods

- `button.isLidUp()`

- `button.isLidDown()`

- `button.isButtonPressed()`

## FAQ

- Q. It's not working on linux!

  - A. On linux, you may need to run as root for it to work. You can try setting a rule for non-root users to access the device.

    Create the rule file:

    ```bash
    sudo vim /etch/udev/rules.d/100-bigred.rules
    ```

    and add the following:

    ```bash
    SUBSYSTEM=="input", GROUP="input", MODE="0666"
    SUBSYSTEM=="usb", ATTRS{idVendor}=="7476", ATTRS{idProduct}=="13", MODE:="666", GROUP="plugdev"
    ```

    Afterwards, you can reload the service:

    ```bash
    sudo udevadm control --reload-rules
    ```

    More info on the [node-hid](https://github.com/node-hid/node-hid#udev-device-permissions) repo.

- Q. What's the vendor ID and product ID?

  - A. The Vendor ID `7476`. Product ID is `13`.

# License

MIT
