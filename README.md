# Pusher presence demo

Short and sweet example of how authentication and presence events hook together. 

There are two branches which demonstrate some different approaches:

* `demonstrate_use_of_socket_id`: Uses the sender's `socket_id` when triggering events to avoid sending the chat message via pusher to the sender's browser. See <http://pusher.com/docs/duplicates> for a fuller description of this issue.

* `send_messages_with_client_events`: Uses [client events](http://pusher.com/docs/client_events) to send chat messages rather than an ajax call to the rails app. This reduces latency but means that persistence isn't possible on the server. It also uses client events to send typing notifications to other browsers which is a nice use case for client events. Note: This will only work for you if client events have been enabled for your app.

Before running locally, add some Pusher credentials to `config/initializers/pusher_init.rb`. Then run with

    script/rails server

## Deploying to Heroku with the Pusher Heroku add-on

    git clone git@github.com:pusher/pusher-presence-demo.git
    heroku create
    heroku addons:add pusher
    git push heroku master
    heroku open
