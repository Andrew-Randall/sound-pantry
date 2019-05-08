class Api::V1::PacksController < ApplicationController
  protect_from_forgery unless: -> { request.format.json? }

  def index
    packs = Pack.all
    render json: packs
  end

  def show
    pack = Pack.find(params[:id])
    creator = User.find(pack.user_id)
    user = user_signed_in
    render json: {pack: pack, creator: creator, current_user: user, samples: pack.samples}
  end

  def user_signed_in
    current_user
  end

  private

  def pack_params
    require(:pack).permit(:user_id, :name, :img, :path)
  end
end
