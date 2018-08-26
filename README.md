# neighborhood-map
This application will display 7 popular locations in St. Louis, MO on a Google Map web page.  All location markers are visible by default, and a side panel which displays the markers in a list.  There is a search box at the top of the list to filter the available locations.  The list and the markers will both be filtered when text is typed in the search field..

You can click on a marker on the map or the list item to view an info window that contains the name of the location, the phone number and a link to the main wikipedia page for the selected location.

The application only allows one infowindow to be open at a time.

## Code
HTML - index.html file contains what is visible to the user and the data binding.

Javascript  - app.js file contains the main application file and the knockout-3.2.0 library

CSS - style.css contains the styling for the web page

images  - a search icon in the filter field and a "hamburger" menu image is included

## APIs
Google Maps API is used to show the map and display the markers on the map within the visible window.

Wikipedia API is used to obtain the main wikipedia article on the location and place the link in the infowindow of the marker, when the marker is clicked.

## Installation
Clone or download [this repository](https://github.com/MKing301/neighborhood-map) and open the index.html file in your browser.