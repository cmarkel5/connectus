class User < ActiveRecord::Base
  def complete_address
    "#{street_address}, #{city}, #{state}, #{zip_code}"
  end

  geocoded_by :complete_address
  after_validation :geocode, :if => :street_address_changed? ||
                                    :city_changed? ||
                                    :state_changed? ||
                                    :zip_code_changed?
end
