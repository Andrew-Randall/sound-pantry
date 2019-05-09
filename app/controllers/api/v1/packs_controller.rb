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

  def create
    user_input = JSON.parse(request.body.read)
    pack = Pack.new(
      user: user_signed_in,
      name: user_input["name"],
      img: user_input["img"],
      description: user_input["description"]
    )

    if pack.save
      render json: { pack: pack }
    else
      render json: { error: pack.errors.full_messages }, status: :unprocessable_entity
    end
  end

  private
  def user_signed_in
    current_user
  end

  def pack_params
    require(:pack).permit(:user_id, :name, :img, :path)
  end
end
