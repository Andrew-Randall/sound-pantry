class CollectionSerializer < ActiveModel::Serializer
  attributes :id, :name, :img, :description, :user_id, :currentUser, :creator

  def currentUser
    return current_user
  end

  def creator
    return User.find(object.user_id)
  end

  belongs_to :user
  has_many :samples
end
