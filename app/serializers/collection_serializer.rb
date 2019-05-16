class CollectionSerializer < ActiveModel::Serializer
  attributes :id, :name, :img, :description, :user_id, :currentUser

  def currentUser
    return current_user
  end

  belongs_to :user
  has_many :samples
end
