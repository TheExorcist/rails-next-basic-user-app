class InviteMailer < ApplicationMailer
  default from: 'montyrex11rhcp@gmail.com',
    reply_to: 'montyrex11rhcp@gmail.com'

  def send_email(invite)
    @invite = invite
    mail(:to => @invite.email,
      :from => 'montyrex11rhcp@gmail.com',
      :subject => 'You have been referred !!' )
  end
end
