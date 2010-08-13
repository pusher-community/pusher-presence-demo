ActionController::Routing::Routes.draw do |map|
  map.resource :identity
  map.resources :messages, :only => :create
  map.root :controller => "demo"
  map.connect('/pusher/auth', :controller => 'pusher', :action => 'auth')
end
