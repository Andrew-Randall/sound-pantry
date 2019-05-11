Rails.application.routes.draw do
  root 'collections#index'
  devise_for :users

  namespace :api do
    namespace :v1 do
      resources :collections, only: [:index, :create, :show, :destroy, :update] do
        resources :samples, only: [:index, :show, :create, :destroy, :update]
      end
      resources :users, only: [:show]
    end
  end

  resources :collections, controller: :collections, only: [:index, :new, :show] do
    resources :samples, only: [:index, :show, :new]
  end
  resources :users, only: [:show]
end
