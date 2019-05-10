class Api::V1::CollectionsController < ApplicationController
  protect_from_forgery unless: -> { request.format.json? }

  def index
    collections = Collection.all
    render json: collections
  end

  def show
    collection = Collection.find(params[:id])
    creator = User.find(collection.user_id)
    user = user_signed_in
    render json: {collection: collection, creator: creator, current_user: user, samples: collection.samples}
  end

  def create
    user_input = JSON.parse(request.body.read)
    collection = Collection.new(
      user: user_signed_in,
      name: user_input["name"],
      img: user_input["img"],
      description: user_input["description"]
    )

    if collection.save
      render json: { collection: collection }
    else
      render json: { error: collection.errors.full_messages }, status: :unprocessable_entity
    end
  end

  private
  def user_signed_in
    current_user
  end

  def collection_params
    require(:collection).permit(:user_id, :name, :img, :path)
  end
end
