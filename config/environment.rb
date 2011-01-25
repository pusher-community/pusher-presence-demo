# Load the rails application
require File.expand_path('../application', __FILE__)

# Initialize the rails application
PusherPresenceDemo::Application.initialize!

Pusher.app_id = ENV['PUSHER_APP_ID']
Pusher.key = ENV['PUSHER_KEY']
Pusher.secret = ENV['PUSHER_SECRET']

# not strictly necessary, but referenced in views
PUSHER_JS_DOMAIN = 'http://js.pusherapp.com'
PUSHER_SOCKET_HOST = 'ws.pusherapp.com'