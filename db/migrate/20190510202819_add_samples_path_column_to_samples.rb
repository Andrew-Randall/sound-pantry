class AddSamplesPathColumnToSamples < ActiveRecord::Migration[5.2]
  def change
    add_column :samples, :sample_path, :string
  end
end
