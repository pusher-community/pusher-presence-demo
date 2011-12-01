var Typer = function(broadcastRate, timeout, options) {
  var self = this;
  var broadcastRate = broadcastRate;
  var timeout = timeout;
  var onTyping = options.onTyping || null;
  var broadcastEnd = options.broadcastEnd || null;
  var onStart = options.onStart || null;
  var onEnd = options.onEnd || null;

  if (timeout < broadcastRate + 500) {
    throw "Timeout is too low, should be at least 0.5s longer than broadcast rate"
  }

  var typing = false;
  var lastActivity = null;
  var broadcastTimer = null;
  var timeoutTimer = null;

  var startTyping = function() {
    typing = true;
    if (onStart) onStart();
    if (onTyping) onTyping();
    // Setup timer to send every rate
    broadcastTimer = setInterval(function() {
      if (onTyping) onTyping();
    }, broadcastRate);
  }

  var stopTyping = function() {
    typing = false;
    clearInterval(broadcastTimer);
    if (onEnd) onEnd();
  }

  var registerActivity = function() {
    lastActivity = (new Date()).getTime()
    if (timeoutTimer) {
      clearTimeout(timeoutTimer);
    }
    timeoutTimer = setTimeout(function() {
      stopTyping();
    }, timeout);
  }

  this.typing = function() {
    registerActivity();
    if (typing === false) {
      startTyping();
    }
  }

  this.notTyping = function() {
    stopTyping();
  }
}
