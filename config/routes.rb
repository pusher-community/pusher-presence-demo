ActionController::Routing::Routes.draw do |map|
  map.resource :identity

  map.root :controller => "demo"
  map.connect('/pusher/auth', :controller => 'pusher', :action => 'auth')
end
