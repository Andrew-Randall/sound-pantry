class Sample < ApplicationRecord
  mount_uploader :sample, SampleUploader

  belongs_to :user
  belongs_to :pack
end
