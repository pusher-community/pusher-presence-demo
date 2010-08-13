Pusher.log = function() {
  if (window.console) window.console.log.apply(window.console, arguments);
};

$().ready(function(){
  var channel = socket.subscribe('presence-demo');
  channel.bind('pusher:subscription_succeeded', function(member_list){
    $('#presence').empty()

    var container, rand

    $.each(member_list, function(i, member){
      add_member(member)
    })
  })

  channel.bind('pusher:member_removed', function(member){
    $('#presence_'+member.user_id).remove();
  })

  channel.bind('pusher:member_added', function(member){
    add_member(member)
  })
});

function add_member(member) {
  var content
  var rand = rand = (Math.random() * 20) - 10
  var container = $("<div>", {
    id: "presence_" + member.user_id
  }).css({
    "-moz-transform": "rotate(" + rand + "deg)",
    "-webkit-transform": "rotate(" + rand + "deg)"
  })

  if (member.user_info.gravatar) {
    content = $("<img>", {
      src: member.user_info.gravatar,
      valign: "middle"
    })
  } else if (member.user_id == me) {
    container.addClass("no-gravatar")
    content = 'you are here'
  } else {
    content = null
  }

  if (member.user_id == me) container.addClass("me")

  $('#presence').append(container.html(content))
}
