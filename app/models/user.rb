class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable
  
  has_many :invites, foreign_key: :invited_by_id

  validates :first_name, :last_name, :email, presence: true

  validates :email, uniqueness: true

  def generate_jwt
    JWT.encode({ id: id, exp: 60.days.from_now.to_i }, Rails.application.secrets.secret_key_base)
  end
end
