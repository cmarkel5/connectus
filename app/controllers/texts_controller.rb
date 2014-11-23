class TextsController < ApplicationController
  
  def send_text(message, user_phone_number)
    account_sid = "ACd2ddae5650ca06720b7a7ba52f6a04d4"
    auth_token = "1d2ced219c26754a5bd66f297aa45945"
    client = Twilio::REST::Client.new account_sid, auth_token
    from = "+17702855442" # My Twilio number
    client.account.messages.create(
      :from => from,
      :to => user_phone_number,
      :body => message )
  end

  def send_to_all
    users = JSON.parse(params[:users])
    place = params[:place]
    address = params[:address]

    place_and_address = "#{place} #{address}"
    
    users.each do |user|
      send_text(place_and_address, user["phone_number"])
    end
  end


end