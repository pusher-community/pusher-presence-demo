var Typer = function(options) {
  var broadcastRate = options.broadcastRate || 4000;
  var timeout = options.timeout || 5000;
  var onTyping = options.onTyping || null;
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
    lastActivity = Date.now();
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
    if (typing === true) {
      stopTyping();
    }
  }
}

$.fn.monitor = function(typer) {
  // var typer = $(this).data("typer") || $(this).data("typer", new Typer(2000))
  // if (typerName)

  $(this).keypress(function() {
    typer.typing();
  }).blur(function() {
    typer.notTyping();
  })

  $(this).parents('form').submit(function() {
    typer.notTyping();
  })
}
