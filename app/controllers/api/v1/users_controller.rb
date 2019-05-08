class Api::V1::UsersController < ApplicationController
  protect_from_forgery unless: -> { request.format.json? }

  def show
    user = User.find(params[:id])
    packs = user.packs

    render json: {user: user, packs: packs}
  end

  private

  def user_params
    require(:user).permit(:id, :email, :username, :profile_photo, :role)
  end
end
