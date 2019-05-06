class Api::V1::PacksController < ApplicationController
  protect_from_forgery unless: -> { request.format.json? }

  def index
    packs = Pack.all
    render json: packs
  end

  def user_signed_in
    current_user
  end

  def pack_params
    require(:pack).permit(:user_id, :name, :img, :path)
  end
end
