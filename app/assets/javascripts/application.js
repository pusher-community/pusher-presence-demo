//= require_tree .

Pusher.log = function() {
  if (window.console) window.console.log.apply(window.console, arguments);
};

$().ready(function(){
  $("#message").submit(function() {
    $.post(this.action, $(this).serialize())
    this.reset()
    return false
  })

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

  $("#message input[name=text]").keydown(function() {
    if (typing) {
      clearInterval(typing)
    } else {
      start_typing(me)
      channel.trigger('client-starttyping', {})
    }

    typing = setTimeout(function() {
      stop_typing(me)
      channel.trigger('client-stoptyping', {})
      clearInterval(typing)
      typing = null
    }, 1000)
  })

  channel.bind('client-starttyping', function(data) {
    start_typing(data.user_id)
  })

  channel.bind('client-stoptyping', function(data) {
    stop_typing(data.user_id)
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

var animation
var animation_counter = 0

function start_typing(user_id) {
  animation = setInterval(function() {
    animation_counter++

    var rotation = (animation_counter % 2 - 0.5) * 10
    $("#presence_" + user_id).css({
      "-webkit-transform": "rotate(" + rotation + "deg)"
    })
  }, 100)

}

function stop_typing(user_id) {
  clearInterval(animation)
}
