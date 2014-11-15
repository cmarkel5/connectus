class CreateUsers < ActiveRecord::Migration
  def change
    create_table :users do |t|
      t.string :name
      t.string :email
      t.integer :phone_number
      t.string :address
      t.string :city
      t.string :state
      t.integer :zip_code
      t.string :password_digest
      t.string :remember_token

      t.timestamps
    end
  end
end
