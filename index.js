var HID = require('node-hid');
var util = require('util');
var events = require('events');

var allDevices;
var cmdStatus = new Buffer([0, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x02]);
var lastState;

var LID_DOWN = 0x15, LID_UP = 0x17, BUTTON_DOWN = 0x16;

function getAllDevices() {
  if (!allDevices) {
    allDevices = HID.devices(7476,13);
  }
  return allDevices;
}

function BigRedButton(index) {
  index = index || 0;

  var bigRedButton = getAllDevices();
  if (!bigRedButton.length) {
    throw new Error('BigRedButton could not be found.');
  }

  if (index > bigRedButton.length || index < 0) {
    throw new Error(['Index ', index, ' out of range, only ', bigRedButton.length, ' BigRedButton found'].join(''));
  }

  this.hid = new HID.HID(bigRedButton[index].path);

  this.hid.write(cmdStatus);

  this.hid.read(function(error,data) {
    lastState = data[0];
    this.hid.read(this.interpretData.bind(this));
  }.bind(this));

  setInterval(this.askForStatus.bind(this), 100);
}

util.inherits(BigRedButton, events.EventEmitter);

BigRedButton.prototype.askForStatus = function() {
  this.hid.write(cmdStatus);
};

BigRedButton.prototype.interpretData = function(error, data) {
  var nState = data[0];

  if(lastState !== nState) {
    if(lastState === LID_DOWN && nState === LID_UP) {
      this.emit('lidRaised');

    } else if (lastState === LID_UP && nState === BUTTON_DOWN) {
      this.emit('buttonPressed');

    } else if(lastState === BUTTON_DOWN && nState === LID_UP) {
      this.emit('buttonReleased');

    } else if(lastState === BUTTON_DOWN && nState === LID_DOWN) {
      this.emit('buttonReleased');
      this.emit('lidClosed');

    } else if(lastState === LID_UP && nState === LID_DOWN) {
      this.emit('lidClosed');
    }

    lastState = nState;
  }

  this.hid.read(this.interpretData.bind(this));
};

BigRedButton.prototype.isLidUp = function() {
  return lastState === LID_UP || lastState === BUTTON_DOWN;
};

BigRedButton.prototype.isButtonPressed = function() {
  return lastState === BUTTON_DOWN;
};

BigRedButton.prototype.isLidDown = function() {
  return lastState === LID_DOWN;
};

module.exports {
  BigRedButton: BigRedButton,
  deviceCount: function () {
    return getAllDevices().length;
  }
};