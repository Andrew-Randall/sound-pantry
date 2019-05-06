class Pack < ApplicationRecord
  belongs_to :user
  has_many :samples
  has_many :comments
end
