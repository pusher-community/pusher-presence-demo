class MessagesController < ApplicationController
  def create
    Pusher['presence-demo'].trigger('message', {
      :user_id => session[:session_id],
      :text => params[:text]
    })
    head :ok
  end
end
