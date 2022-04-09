Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"
  scope :api, defaults: { format: :json } do
    scope :v1 do
      devise_for :users,
      controllers: {
        registrations: 'api/v1/registrations',
        sessions: 'api/v1/sessions',
      }
    end
  end

  namespace :api, defaults: { format: :json } do
    namespace :v1 do
      get 'invites/get_invite', to: 'invites#get_invite'
      devise_scope :user do
        post 'users/create_user_with_referral_code', to: 'registrations#create_user_with_referral_code'
      end
      resources :invites
    end
  end
end
