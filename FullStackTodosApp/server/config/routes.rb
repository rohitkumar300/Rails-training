Rails.application.routes.draw do

  resources :todos, only: [:index, :create, :destroy, :edit, :update]
end
