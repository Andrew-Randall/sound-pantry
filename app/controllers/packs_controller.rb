class PacksController < ApplicationController
  before_action :authorize_user, except: [:index, :show]

  def index
    @packs = Pack.all
    @user = current_user
  end

  protected

  def authorize_user
    if !user_signed_in?
      flash[:notice] = "Please sign in or create an account."
      redirect_to new_user_session_path
    end
  end
end
