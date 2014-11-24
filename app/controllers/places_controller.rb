class PlacesController < ActionController::Base

  # GET /places
  # GET /places.json

  # def search_places
  #   location = params[:location]
  #   search_url = "https://maps.googleapis.com/maps/api/place/nearbysearch/json?key=AIzaSyATtqKSdyRFCZNA1Lce8OxV3_TD-NEyxaA&location=#{location}&rankby=distance&keyword=wifi&types=bakery|bar|book_store|cafe|food|library|restaurant"
  #   # search_url = "https://maps.googleapis.com/maps/api/place/nearbysearch/json?key=AIzaSyATtqKSdyRFCZNA1Lce8OxV3_TD-NEyxaA&location=#{location}&rankby=distance&keyword=free%20wifi&types=bakery|bar|book_store|cafe|food|library|restaurant"
  #   search_url = URI::encode(search_url)
  #   places = HTTParty.get search_url
  #   @places = places["results"].uniq
  # end

  def search_places
      location = params[:location]
      search_url = "https://maps.googleapis.com/maps/api/place/nearbysearch/json?key=AIzaSyATtqKSdyRFCZNA1Lce8OxV3_TD-NEyxaA&location=#{location}&rankby=distance&keyword=wifi&types=bakery|bar|book_store|cafe|food|library|restaurant"
      # search_url = "https://maps.googleapis.com/maps/api/place/nearbysearch/json?key=AIzaSyATtqKSdyRFCZNA1Lce8OxV3_TD-NEyxaA&location=#{location}&rankby=distance&keyword=free%20wifi&types=bakery|bar|book_store|cafe|food|library|restaurant"
      search_url = URI::encode(search_url)
      places = HTTParty.get search_url
      @places = places["results"].uniq
  end


end


 
# coordinates
coordinates = { latitude: 37.7577, longitude: -122.4376 }
client.search_by_coordinates(coordinates, params, locale)