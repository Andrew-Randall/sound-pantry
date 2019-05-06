class CreateSamples < ActiveRecord::Migration[5.2]
  def change
    create_table :samples do |t|
      t.string :name
      t.string :path

      t.belongs_to :user
      t.belongs_to :pack

      t.timestamps
    end
  end
end
