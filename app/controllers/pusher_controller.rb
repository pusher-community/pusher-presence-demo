class PusherController < ApplicationController
  def auth
    identity = Identity.find_by_session_id(session[:session_id])
    response = Pusher[params[:channel_name]].authenticate(params[:socket_id], {
      :user_id => current_user.id,
      :user_info => identity ? {
        :email =>  identity.email,
        :gravatar => identity.gravatar
      } : {}
    })
		render :json => response
  end
end