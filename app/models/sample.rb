class Sample < ApplicationRecord
  belongs_to :user
  belongs_to :collection

  mount_uploader :sample, SampleUploader
end
