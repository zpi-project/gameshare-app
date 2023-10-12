import requests
 
# api-endpoint
URL = "https://boardgamegeek.com/xmlapi"

# /xmlapi/geeklist/<listid>
# Parameters
# start: Item to start with (0 indexed) (default = 0)
# count: Number of items to retrieve (default and max = 150)
# comments: Retrieve comments? (default absent, set to 1 if you want comments)
GEEKLIST_URL = URL + "/geeklist"

# /xmlapi/search
# Parameters
# search: String to search for (required)
# exact: Exact name/aka search only (set it to 1, absent by default)
SEARCH_URL = URL + "/search"

# /xmlapi/boardgame/<gameid>,<gameid2>...
# Parameters
# comments: Show brief user comments on games (set it to 1, absent by default)
# stats: Include game statistics (set it to 1, absent by default)
# historical: Include historical game statistics (set it to 1, absent by default) - Use from/end parameters to set starting and ending dates. Returns all data starting from 2006-03-18.
# from: Set the start date to include historical data (format: YYYY-MM-DD, absent by default )
# to: Set the end date to include historical data (format: YYYY-MM-DD, absent by default )
# pricehistory: retrieve the marketplace history for this item (set it to 1, absent by default)
# marketplace: retrieve the current marketplace listings (set it to 1, absent by default)
BOARDGAME_URL = URL + "/boardgame"
 
# location given here
location = "delhi technological university"
 
# defining a params dict for the parameters to be sent to the API
PARAMS = {'address':location}
 
# sending get request and saving the response as response object
r = requests.get(url = URL, params = PARAMS)
 
# extracting data in json format
data = r.json()
 
 
# extracting latitude, longitude and formatted address
# of the first matching location
latitude = data['results'][0]['geometry']['location']['lat']
longitude = data['results'][0]['geometry']['location']['lng']
formatted_address = data['results'][0]['formatted_address']
 
# printing the output
print("Latitude:%s\nLongitude:%s\nFormatted Address:%s"
    %(latitude, longitude,formatted_address))