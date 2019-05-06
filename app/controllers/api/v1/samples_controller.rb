class Api::V1::SamplesController < ApplicationController
  protect_from_forgery unless: -> { request.format.json? }

  def index
    pack = Pack.find(params[:pack_id])
    samples = pack.samples
    render json: samples
  end

  private

  def sample_params
    params.require(:sample).permit(:user_id, :pack_id, :name, :path)
  end
end
