var stream = require('stream');
var util = require('util');

const BidiStreamMock = function (options) {
  if (options == null) {
    options = {};
  }
  stream.Duplex.call(this, {objectMode: true});
  this.delay = options.delay || null;
  this.readArr = [];
};
util.inherits(BidiStreamMock, stream.Duplex);

BidiStreamMock.prototype._read = function readBytes () {
  var self = this;
  while (this.readArr.length) {
    var chunk = this.readArr.shift();
    this.push(chunk);
    if (!this.readArr.length) {
      return;
    }
  }
  setTimeout(readBytes.bind(self), 1);
};

BidiStreamMock.prototype._write = function (chunk, enc, cb) {
  var self = this;
  if (this.delay) {
    setTimeout(function (c) {
      this.readArr.push(c);
    }.bind(self), this.delay, chunk);
  } else {
    this.readArr.push(chunk);
  }
  cb();
};

module.exports = BidiStreamMock;
