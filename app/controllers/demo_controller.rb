class DemoController < ApplicationController
  def index
    @identity = session[:identity]
  end
end