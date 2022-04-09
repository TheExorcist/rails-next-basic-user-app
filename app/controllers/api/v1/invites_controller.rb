class Api::V1::InvitesController < ApplicationController
  before_action :authenticate_user!
  skip_before_action :process_token, :authenticate_user!, only: [:get_invite]
  
  before_action :find_invite, :only => [:show, :update, :destroy]

  def index
    referral_code = params.fetch(:referral_code, nil)
    @invites = current_user.invites.order('created_at DESC')
    @invites = @invites.where(referral_code: referral_code) if referral_code.present?
    respond_to do |format|
      format.json { render :json => @invites, methods: :invite_url }
    end
  end

  def show
    respond_to do |format|
      format.json { render :json => @invite }
    end
  end

  def get_invite
    referral_code = params.fetch(:referral_code, nil)
    @invite = Invite.pending.where(referral_code: referral_code).first if referral_code.present?
    respond_to do |format|
      format.json { render :json => Array(@invite) || [], methods: :invite_url }
    end
  end

  def create
    @invite = Invite.new(invite_params)
    @invite.invited_by = current_user
    respond_to do |format|
      if @invite.save
        format.json { render :json => @invite, :status => :created }
      else
        format.json { render :json => @invite.errors, :status => :unprocessable_entity }
      end
    end
  end

  def update
    respond_to do |format|
      if @invite.update_attributes(params[:invite])
        format.json { render :json => @invite, :status => :ok }
      else
        format.json { render :json => @invite.errors, :status => :unprocessable_entity }
      end
    end
  end

  def destroy
    @invite.destroy
    respond_to do |format|
      format.json { head :ok }
    end
  end

  private

  def invite_params
    params.require(:invite).permit(:email)
  end

  def find_invite
    @invite = Invite.find(params[:id])
  end
end
