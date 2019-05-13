class Api::V1::DrumsController < ApplicationController
  protect_from_forgery unless: -> { request.format.json? }

  def index
    kickCollection = Collection.find_by(name: "Kicks")
    kickSamples = kickCollection.samples

    snareCollection = Collection.find_by(name: "Snares")
    snareSamples = snareCollection.samples

    hatsCollection = Collection.find_by(name: "Hi-Hats")
    hatSamples = hatsCollection.samples

    render json: {kicks: kickSamples, snares: snareSamples, hats: hatSamples }
  end
end
