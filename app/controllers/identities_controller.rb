class IdentitiesController < ApplicationController
  def create  
    Identity.create!(
      {
        :session_id => session[:session_id],
        :email => params[:email],
        :gravatar => Gravatar.new(params[:email]).image_url
      }
    )
    redirect_to :back 
  end
  
  def destroy
    i = Identity.find_by_session_id(session[:session_id])
    i.destroy
    redirect_to :back
  end
end
