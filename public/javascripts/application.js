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

  channel.bind("message", function(data) {
    var user = $("#presence_" + data.user_id)
    var bubble = $("<div>", {
      "class": "bubble",
      text: data.text
    })

    user.find(".bubble").remove()
    user.append(bubble)

    setTimeout(function() {
      bubble.fadeOut(function() {
        $(this).remove()
      })
    }, 30000)
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
