# Load the rails application
require File.expand_path('../application', __FILE__)

# Initialize the rails application
PusherPresenceDemo::Application.initialize!

# not strictly necessary, but referenced in views
PUSHER_JS_DOMAIN = 'http://js.pusherapp.com'
PUSHER_SOCKET_HOST = 'ws.pusherapp.com'
