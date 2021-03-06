class CollectionsController < ApplicationController
  before_action :authorize_user, except: [:index, :show]

  def index
  end

  def show
  end

  def new
  end

  protected

  def authorize_user
    if !user_signed_in?
      flash[:notice] = "Please sign in or create an account."
      redirect_to new_user_session_path
    end
  end
end
