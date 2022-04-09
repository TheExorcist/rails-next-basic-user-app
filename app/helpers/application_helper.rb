module ApplicationHelper
  def render_resource(resource)
    if resource.errors.empty?
      render json: {
        success: true,
        info: "OK",
        data: resource.as_json.merge(jwt: resource.generate_jwt)
      }
    else
      render json: {
        success: false,
        info: resource.errors.full_messages.join(", "),
        data: {}
      }, status: :unprocessable_entity
    end
  end

  def invalid_login_attempt
    render json: {
      message: 'Invalid email or password',
    }, status: 401
  end
end
