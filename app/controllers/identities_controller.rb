class IdentitiesController < ApplicationController
  def create  
    session[:identity] = {
      :email => params[:email],
      :gravatar => Gravatar.new(params[:email]).image_url
    }
    redirect_to :back 
  end
  
  def destroy
    session.delete(:identity)
    redirect_to :back
  end
end
