PusherPresenceDemo::Application.routes.draw do
  resource :identity
  resources :messages
  match '/' => 'demo#index'
  match '/test' => 'demo#test_index'
  match '/pusher/auth' => 'pusher#auth'
end
