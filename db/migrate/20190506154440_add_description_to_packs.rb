class AddDescriptionToPacks < ActiveRecord::Migration[5.2]
  def change
    add_column :packs, :description, :text
  end
end
