json.array!(@users) do |user|
  json.extract! user, :name, :email, :phone_number, :address, :city, :state, :zip_code
end