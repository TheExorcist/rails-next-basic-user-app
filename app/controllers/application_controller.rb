class ApplicationController < ActionController::Base
  skip_before_action :verify_authenticity_token
  before_action :process_token

  def process_token
    if request.headers['Authorization'].present?
      begin
        jwt_payload = JWT.decode(request.headers['Authorization'].split(' ')[1], Rails.application.secrets.secret_key_base).first
        @current_user_id = jwt_payload['id']
      rescue JWT::ExpiredSignature, JWT::VerificationError, JWT::DecodeError
        head :unauthorized
      end
    end
  end

  def authenticate_user!(options = {})
    head :unauthorized unless @current_user_id.present?
  end

  def current_user
    @current_user ||= User.find_by(id: @current_user_id)
  end
end
