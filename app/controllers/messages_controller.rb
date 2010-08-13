class MessagesController < ApplicationController
  def create
    Pusher['presence-demo'].trigger('message', {
      :user_id => params[:user_id],
      :text => params[:text]
    })
    head :ok
  end
end
