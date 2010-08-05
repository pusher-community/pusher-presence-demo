class DemoController < ApplicationController
  def index
    @identity = Identity.find_by_session_id(session[:session_id])
  end
end