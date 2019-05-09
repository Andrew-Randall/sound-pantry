class Api::V1::SamplesController < ApplicationController
  protect_from_forgery unless: -> { request.format.json? }

  def index
    pack = Pack.find(params[:pack_id])
    samples = pack.samples
    render json: samples
  end

  def create
    binding.pry
    user = User.find(params[:user_id])
    pack = Pack.find(params[:pack_id])
    name = params[:name]
    path = params[:path]

    sample = Sample.new(user_id: user.id, pack_id: pack.id, name: name, path: path)
    if sample.save
      render json: { sample: sample }
    else
      render json: { error: review.errors.full_messages },
        status: :unprocessable_entity
    end
  end

  private
  #
  # def sample_params
  #   params.require(:sample).permit(:user_id, :pack_id, :name, :path)
  # end
end
