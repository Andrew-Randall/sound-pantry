class AddSampleToSamples < ActiveRecord::Migration[5.2]
  def change
    add_column :samples, :sample, :string
  end
end
