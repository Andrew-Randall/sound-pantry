class CreateComments < ActiveRecord::Migration[5.2]
  def change
    create_table :comments do |t|
      t.string :body, null: false
      t.integer :rating, null: false

      t.belongs_to :user
      t.belongs_to :collection

      t.timestamps
    end
  end
end
