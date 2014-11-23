json.array!(@users) do |user|
  json.coords user, :latitude, :longitude
  json.extract! user, :id, :name, :email, :phone_number, :street_address, :city, :state, :zip_code, :latitude, :longitude
end
