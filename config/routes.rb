PusherPresenceDemo::Application.routes.draw do
  resource :identity
  resources :messages
  match '/' => 'demo#index'
  match '/pusher/auth' => 'pusher#auth'
end
