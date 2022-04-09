class Invite < ApplicationRecord
  belongs_to :user, optional: true
  belongs_to :invited_by, class_name: User.to_s, foreign_key: :invited_by_id

  enum status: { pending: 'pending', accepted: 'accepted', rejected: 'rejected' }

  validates :email, presence: true, uniqueness: { message: 'invite is already created' }

  before_create :validate_email

  before_create do
    self.referral_code = SecureRandom.hex(6)
    self.expire_date = Date.today + 1.month
  end

  after_create do
    InviteMailer.send_email(self).deliver_now
  end

  def self.find_by_referral_code(referral_code)
    Invite.find_by(referral_code: referral_code)
  end

  def self.find_by_email(email)
    Invite.find_by(email: email)
  end

  def invite_url
    app_url = 'http://localhost:3000' if Rails.env.development?
    app_url = 'https://www.myapp.com' if Rails.env.production?

    "#{app_url}/users/signup?referral_code=#{referral_code}"
  end

  private

  def validate_email
    return if email.blank?

    errors.add(:email, 'is invalid') unless email.match?(/\A([^@\s]+)@((?:[-a-z0-9]+\.)+[a-z]{2,})\z/i)

    User.exists?(email: email) ? errors.add(:email, 'user is already invited') : nil
    Invite.exists?(email: email) ? errors.add(:email, 'user is already invited') : nil

    errors.blank?
  end
end
