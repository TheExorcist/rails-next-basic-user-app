class Api::V1::SessionsController < Devise::SessionsController
  skip_before_action :require_no_authentication
  
  include ApplicationHelper

  respond_to :json

  def create
    resource = User.find_for_database_authentication(email: user_params[:email])
    invalid_login_attempt and return unless resource

    if resource.valid_password?(user_params[:password])
      render_resource(resource) and return
    end
    invalid_login_attempt
  end

  def destroy
  end

  def failure
  end

  private

  def user_params
    params.require(:user).permit(:email, :password)
  end
end
