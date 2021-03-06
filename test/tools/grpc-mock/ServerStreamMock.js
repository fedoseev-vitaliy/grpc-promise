var stream = require('stream');
var util = require('util');

const ServerStreamMock = function (options) {
  if (options == null) {
    options = {};
  }
  stream.Readable.call(this, {objectMode: true});
  this.response = options.response;
};
util.inherits(ServerStreamMock, stream.Readable);

ServerStreamMock.prototype._read = function readBytes () {
  var self = this;
  if (!this.response) {
    this.emit('error', 'some_error');
    return;
  }
  while (this.response.length) {
    var chunk = this.response.shift();
    this.push(chunk);
    if (!this.response.length) {
      this.emit('end');
      return;
    }
  }
  setTimeout(readBytes.bind(self), 1);
};

module.exports = ServerStreamMock;
