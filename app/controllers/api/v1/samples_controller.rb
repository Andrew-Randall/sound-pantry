class Api::V1::SamplesController < ApplicationController
  protect_from_forgery unless: -> { request.format.json? }
  skip_before_action :verify_authenticity_token

  def index
    collection = Collection.find(params[:collection_id])
    samples = collection.samples
    render json: samples
  end

  def create
    user = current_user
    collection = Collection.find(params[:collection_id])
    name = params[:name]
    path = params[:sample_path]
    sampleId = Sample.last.id + 1
    pathHelper = path.original_filename

    sample = Sample.new(user_id: user.id, collection_id: collection.id, name: name, path: "https://sound-pantry-dev.s3.amazonaws.com/uploads/sample/#{pathHelper}", sample_path: path)
    if sample.save
      render json: { sample: sample }
    else
      render json: { error: review.errors.full_messages },
        status: :unprocessable_entity
    end
  end

  def destroy
    sample = Sample.find(params[:id])
    user = current_user

    if user.id == sample.user.id || user.role == "admin"
      sample.delete
      render json: {id: params[:id]}
    else
      flash.now[:errors] = "You must be the creator of this pack to delete samples!"
      render json: {id: params[:id]}
    end
  end

  private

  def sample_params
    params.require(:sample).permit(:user_id, :collection_id, :name, :path, :sample_path)
  end
end
