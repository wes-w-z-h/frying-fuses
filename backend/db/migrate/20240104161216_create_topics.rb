class CreateTopics < ActiveRecord::Migration[7.1]
  def change
    create_table :topics do |t|
      t.string :title 
      t.string :content
      t.string  :slug
      t.references :category, null: false, foreign_key: true
      t.references :user, null: false, foreign_key: true
      t.index :title, unique: true
      t.timestamps
    end
  end
end
