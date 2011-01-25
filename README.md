# Pusher presence demo

Short and sweet example of how authentication and presence events hook together. 

Before running locally, add some Pusher credentials to `config/environments/development.rb`.

## Deploying to Heroku with the Pusher Heroku add-on

    git clone git@github.com:newbamboo/pusher-presence-demo.git
    heroku create
    heroku addons:add pusher
    git push heroku master
    heroku open
