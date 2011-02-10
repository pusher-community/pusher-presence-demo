Pusher.log = function() {
  if (window.console) window.console.log.apply(window.console, arguments);
};

$().ready(function(){
  channel = socket.subscribe('presence-demo');
  channel.bind('pusher:subscription_succeeded', function(members){
    $('#presence').empty()

    var container, rand

    members.each(add_member);

    console.log("Count", members.count)
  })

  channel.bind('pusher:member_removed', function(member){
    $('#presence_'+member.id).remove();
    console.log("Count", channel.members.count)
  })

  channel.bind('pusher:member_added', function(member){
    add_member(member)
    console.log("Count", channel.members.count)
  })

  $("#message").submit(function() {
    text = $(this).find("input[name=text]").val()
    channel.trigger('client-message', {
      text: text
    })
    show_message(me, text)
    this.reset()
    return false
  })

  channel.bind("client-message", function(data) {
    show_message(data.user_id, data.text)
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
    "-webkit-transform": "rotate(" + rand + "deg)"
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

function show_message(user_id, message) {
  var user = $("#presence_" + user_id)
  var bubble = $("<div>", {
    "class": "bubble",
    text: message
  })

  user.find(".bubble").remove()
  user.append(bubble)

  setTimeout(function() {
    bubble.fadeOut(function() {
      $(this).remove()
    })
  }, 30000)
}
