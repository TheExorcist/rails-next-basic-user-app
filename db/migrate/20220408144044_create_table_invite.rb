class CreateTableInvite < ActiveRecord::Migration[7.0]
  def change
    create_table :invites do |t|
      t.string :referral_code, null: false
      t.string :email, null: false
      t.string :status, null: false, default: 'pending'
      t.boolean :active, null: false, default: true 
      t.date :expire_date, null: false

      t.references :user
      t.integer :invited_by_id, null: false

      t.timestamps
    end

    add_index :invites, :referral_code, unique: true
    add_index :invites, :email, unique: true
    add_index :invites, :status
  end
end
