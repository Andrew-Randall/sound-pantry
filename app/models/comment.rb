class Comment < ApplicationRecord
  validates :rating, numericality: { greater_than_or_equal_to: 1, less_than_or_equal_to: 5 }, presence: true

  belongs_to :user
  belongs_to :pack
end
