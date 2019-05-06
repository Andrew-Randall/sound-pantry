class CreatePacks < ActiveRecord::Migration[5.2]
  def change
    create_table :packs do |t|
      t.string :name, unique: true
      t.string :path
      t.string :img

      t.belongs_to :user

      t.timestamps
    end
  end
end
