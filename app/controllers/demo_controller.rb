class DemoController < ApplicationController
  def index
    @identity = session[:identity]
    @use_local_js = false
  end

  def test_index
    @identity = session[:identity]
    @use_local_js = true
    render :index
  end
end
