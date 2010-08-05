class PusherController < ApplicationController
  def auth
    auth = Pusher[params[:channel_name]].socket_auth(params[:socket_id])
    identity = Identity.find_by_session_id(session[:session_id])
    render :json => { 
            :auth => auth, 
            :user_id => session[:session_id], 
            :user_info => identity ? {
              :email =>  identity.email,
              :gravatar => identity.gravatar
            } : {}
    }
  end
end