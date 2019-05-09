Rails.application.routes.draw do
  root 'packs#index'
  devise_for :users

  namespace :api do
    namespace :v1 do
      resources :packs, only: [:index, :create, :show, :destroy, :update] do
        resources :samples, only: [:index, :show, :create, :destroy, :update]
      end
      resources :users, only: [:show]
    end
  end

  resources :packs, only: [:index, :new, :show] do
    resources :samples, only: [:index, :show, :new]
  end
  resources :users, only: [:show]
end
