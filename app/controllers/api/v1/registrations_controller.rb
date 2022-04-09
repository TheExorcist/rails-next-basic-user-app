class Api::V1::RegistrationsController < Devise::RegistrationsController
  include ApplicationHelper
  respond_to :json

  def create
    build_resource(sign_up_params)
    resource.save
    render_resource(resource)
  end

  def update
    if params[:user][:password].blank?
      params[:user].delete(:password)
      params[:user].delete(:password_confirmation)
    end
    self.resource = resource_class.to_adapter.get!(send(:"current_#{resource_name}").to_key)
    prev_unconfirmed_email = resource.unconfirmed_email if resource.respond_to?(:unconfirmed_email)

    resource_updated = update_resource(resource, account_update_params)
    yield resource if block_given?
    if resource_updated
      sign_in resource_name, resource, bypass: true
      render_resource(resource)
    else
      clean_up_passwords resource
      render_resource(resource)
    end
  end

  def create_user_with_referral_code
    referral_code = referral_user_params.fetch(:referral_code, nil)
    if referral_code.present?
      invite = Invite.where(referral_code: referral_code).first
      if invite.present?
        user = User.new(sign_up_params)
        if user.save && user.persisted?
          invite.status = :accepted
          invite.user = user
          invite.save
        end
        render_resource(user)
      else
        render json: {
          success: false,
          info: "Referral code not found",
          data: {}
        }, status: :unprocessable_entity
      end
    else
      render json: {
        success: false,
        info: "Referral code is required",
        data: {}
      }, status: :unprocessable_entity
    end
  end

  private

  def sign_up_params
    params.require(:user).permit(:email, :password, :password_confirmation, :first_name, :last_name, :phone_number, :address)
  end

  def account_update_params
    params.require(:user).permit(:email, :password, :password_confirmation, :current_password)
  end

  def referral_user_params
    params.require(:user).permit(:email, :referral_code)
  end
end
