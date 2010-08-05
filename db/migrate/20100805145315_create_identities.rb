class CreateIdentities < ActiveRecord::Migration
  def self.up
    create_table :identities do |t|
      t.string :email
      t.string :gravatar
      t.string :session_id
      t.timestamps
    end
  end

  def self.down
    drop_table :identities
  end
end
