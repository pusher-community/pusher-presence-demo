//= require_tree .

Pusher.log = function() {
  if (window.console) window.console.log.apply(window.console, arguments);
};

$().ready(function(){
  channel = socket.subscribe('presence-demo');
  channel.bind('pusher:subscription_succeeded', function(members){
    $('#presence').empty()

    members.each(add_member);

    console.log("Count", members.count)
  })

  channel.bind('pusher:member_removed', function(member){
    $('#presence_' + member.id).remove();
    console.log("Count", channel.members.count)
  })

  channel.bind('pusher:member_added', function(member){
    add_member(member)
    console.log("Count", channel.members.count)
  })

  channel.bind("message", function(data) {
    speak(data.user_id, data.text)
  })

  // var typing = false;
  var typing;

  var typer = new Typer(2000, 5000, {
    onStart: function() {
      startAnimation(me);
    },
    onTyping: function() {
      channel.trigger('client-typing', {user_id: me})
    },
    onEnd: function() {
      stopAnimation(me);
      channel.trigger('client-notTyping', {user_id: me})
    }
  });

  $("#message input[name=text]").keydown(function() {
    typer.typing()
  }).blur(function() {
    typer.notTyping()
  })

  $("#message").submit(function() {
    $.post(this.action, $(this).serialize())
    this.reset()
    typer.notTyping();
    return false
  })

  channel.bind('client-typing', function(data) {
    var member = channel.members.get(data.user_id)
    member.info.typer.typing();
  })

  channel.bind('client-notTyping', function(data) {
    var member = channel.members.get(data.user_id)
    member.info.typer.notTyping();
  })
});

function add_member(member) {
  var content
  var rand = rand = (Math.random() * 20) - 10
  var container = $("<div>", {
    "class": "member",
    id: "presence_" + member.id
  }).css({
    "-moz-transform": "rotate(" + rand + "deg)",
    "-webkit-transform": "rotate(" + rand + "deg)",
    "-webkit-transition": "all 0.2s ease-in-out"
  })

  if (member.info.gravatar) {
    content = $("<img>", {
      src: member.info.gravatar,
      valign: "middle"
    })
  } else if (member.id == me) {
    container.addClass("no-gravatar")
    content = 'you are here'
  } else {
    content = null
  }

  if (member.id == me) container.addClass("me")

  if (member.id != me) {
    member.info.typer = new Typer(2000, 5000, {
      onStart: function() { startAnimation(member.id) },
      onEnd: function() { stopAnimation(member.id) }
    })
  }

  $('#presence').append(container.html(content))
}

function speak(user_id, text) {
  var user = $("#presence_" + user_id)
  var bubble = $("<div>", {
    "class": "bubble",
    text: text
  })

  user.find(".bubble").remove()
  user.append(bubble)

  setTimeout(function() {
    bubble.fadeOut(function() {
      $(this).remove()
    })
  }, 30000)
}

function startAnimation(user_id) {
  startJiggle($("#presence_" + user_id)[0])
};

function stopAnimation(user_id) {
  stopJiggle($("#presence_" + user_id)[0])
};

function startJiggle(node) {
  if (node.timer) {
    clearInterval(node.timer);
  }
  node.timer = setInterval(function() {
    node.counter = node.counter || 0;
    node.counter++;

    var rotation = (node.counter % 2 - 0.5) * 10
    $(node).css({
      "-webkit-transform": "rotate(" + rotation + "deg)"
    });
  }, 100);
}

function stopJiggle(node) {
  clearInterval(node.timer);
}
