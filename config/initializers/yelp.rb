# require 'yelp'

# Yelp.client.configure do |config|
#   config.consumer_key = ENV['AmircKh17C3ce-NgWk1ljQ']
#   config.consumer_secret = ENV['Dp-xAEiGhsFmK2HQtWkFeQW9lwo']
#   config.token = ENV['s8OVi5XiCwhwb5H4tYU8OPJLzw3X-cAx']
#   # config.token_secret = ENV['yTz-ruSqGnVBr8gEguxrwGx8Ohc']
#   config.token_secret = 'yTz-ruSqGnVBr8gEguxrwGx8Ohc'
# end

# Yelp.client.search('San Francisco', { term: 'food' })


Yelp.client.configure do |config|
  config.consumer_key = 'AmircKh17C3ce-NgWk1ljQ'
  config.consumer_secret = 'Dp-xAEiGhsFmK2HQtWkFeQW9lwo'
  config.token = 's8OVi5XiCwhwb5H4tYU8OPJLzw3X-cAx'
  config.token_secret = 'yTz-ruSqGnVBr8gEguxrwGx8Ohc'
end
