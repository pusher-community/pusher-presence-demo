# Be sure to restart your server when you modify this file

# Specifies gem version of Rails to use when vendor/rails is not present
RAILS_GEM_VERSION = '2.3.5' unless defined? RAILS_GEM_VERSION

# Bootstrap the Rails environment, frameworks, and default configuration
require File.join(File.dirname(__FILE__), 'boot')

Rails::Initializer.run do |config|
  config.time_zone = 'UTC'
  config.gem "pusher"
  config.gem "gravatar-ultimate"
end

# staging account
Pusher.app_id = 'your_id'
Pusher.key = 'key'
Pusher.secret = 'secret'

# not strictly necessary, but referenced in views
PUSHER_JS_DOMAIN = 'http://js.pusherapp.com'
PUSHER_SOCKET_HOST = 'ws.pusherapp.com'