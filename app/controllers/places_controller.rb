class PlacesController < ActionController::Base

  # GET /places
  # GET /places.json
  def index
    # Default to params, second is test, third is realsies
    location = params[:location] || "38.8977332,-77.0365305" || "33.771527,-84.367367"
    search_url = "https://maps.googleapis.com/maps/api/place/nearbysearch/json?key=AIzaSyATtqKSdyRFCZNA1Lce8OxV3_TD-NEyxaA&location=#{location}&rankby=distance&keyword=wifi&types=bakery|bar|book_store|cafe|food|library|restaurant"
    # search_url = "https://maps.googleapis.com/maps/api/place/nearbysearch/json?key=AIzaSyATtqKSdyRFCZNA1Lce8OxV3_TD-NEyxaA&location=#{location}&rankby=distance&keyword=free%20wifi&types=bakery|bar|book_store|cafe|food|library|restaurant"
    search_url = URI::encode(search_url)
    places = HTTParty.get search_url
    @places = places["results"].uniq
  end
end


 
