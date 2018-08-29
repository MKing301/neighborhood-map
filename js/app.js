// Global variables
var map;
var markers = [];
var infowindows = [];

// Model (Data)
var locations = [ 
	{
		title: 'Saint Louis Zoo',
		phone: '(314) 781-0900',
		location: {lat: 38.6385721, lng: -90.2938032}
	},
	{
		title: 'The Gateway Arch',
		phone: '(877) 982-1410',
		location: {lat: 38.624691, lng: -90.186965}
	},
	{
		title: 'Delmar Loop',
		phone: '(314) 727-8000',
		location: {lat: 38.6560226, lng: -90.3075077}
	},
	{
		title: 'Saint Louis Art Museum',
		phone: '(314) 721-0072',
		location: {lat: 38.6390952, lng: -90.2971418}
	},
	{
		title: 'Missouri History Museum',
		phone: '(314) 746-4599',
		location: {lat: 38.6452478, lng: -90.287927}
	},
	{
		title: 'Missouri Botanical Garden',
		phone: '(314) 577-5100',
		location: {lat: 38.6161054, lng: -90.260256}
	},
	{
		title: 'Ted Drewes Frozen Custard',
		phone: '(314) 481-2652',
		location: {lat: 38.589412, lng: -90.307809}
	} ]
	// mapViewModel
	function initMap() {
		map = new google.maps.Map(document.getElementById('map'), {
	        center: {lat: 38.63268284, lng: -90.1869568},
	        zoom: 13
	      });
		
		var largeInfoWindow = new google.maps.InfoWindow();
        var bounds = new google.maps.LatLngBounds();
        
        // Create map markers from array of locations
		for (var i = 0; i < locations.length; i++) {
		    // Get the position from the location array.
		    var position = locations[i].location;
		    var title = locations[i].title;
		    var phone = locations[i].phone;
		    // Create a marker per location, and put into markers array.
		    marker = new google.maps.Marker({
		      position: position,
		      title: title,
		      phone: phone,
		      map: map,
		      animation: google.maps.Animation.DROP,
		      icon: 'http://maps.google.com/mapfiles/ms/icons/green-dot.png',
		      id: i
		    });
		    markers.push(marker);
		    
		    locations[i].marker = marker;
		    
		    bounds.extend(markers[i].position);
		    	
		    /*Two event listeners - one for mouseover, one for mouseout,
	      	to change the colors back and forth.*/
		    marker.addListener('mouseover', function() {
            this.setIcon('http://maps.google.com/mapfiles/ms/icons/blue-dot.png');
            	//source:  https://sites.google.com/site/gmapsdevelopment/
		    });
          
	        marker.addListener('mouseout', function() {
	        	this.setIcon('http://maps.google.com/mapfiles/ms/icons/green-dot.png');
	            	// source:  https://sites.google.com/site/gmapsdevelopment/
	        });
          
	        // Function animates marker from map and populates infoWindow
	        marker.addListener('click', function() {
	        	setTimeout(1000);
	        	this.setMap(map);
	        	this.setAnimation(google.maps.Animation.DROP);
	        	populateInfoWindow(this, largeInfoWindow);;
            });
	        
	        // Create info window for each location and store in infowindows array
	        locations[i].largeInfoWindow = largeInfoWindow;
	        infowindows.push(largeInfoWindow);
	        
	        // Fit locations within map view
	        map.fitBounds(bounds);
			};
ko.applyBindings(new ViewModel())
}; // End initMap function

// Function toggles list box
toggleListBox = function() {
	    $('.list-box').toggle();
	    $('#map').toggleClass('active');
	    $('.content-nav-bar').toggleClass('active');
	};

// Function animates marker and populate infowindow from list item
openFromList = function(selection) {
	selection.marker.setMap(null);
	setTimeout(1000);
	selection.marker.setMap(map);
	selection.marker.setAnimation(google.maps.Animation.DROP);
	populateInfoWindow(selection.marker, selection.largeInfoWindow);
	  };
	
/*This function populates the infowindow when the marker is clicked. We'll only allow
one infowindow which will open at the marker that is clicked, and populate based
on that markers position.*/
function populateInfoWindow(marker, infowindow)  {
    // Check to make sure the infowindow is not already opened on this marker.
	  if (infowindow.marker != marker ) {
      infowindow.marker = marker;
      
      var $wikiElem = $('#wikipedia-links');
      $wikiElem.text("");
      inputStr = marker.title;
      
   // load wikipedia data
	    var wikiUrl = 'http://en.wikipedia.org/w/api.php?action=opensearch&search='+inputStr+'&format=json&callback=wikiCallback';
	    var wikiRequestTimeout = setTimeout(function(){
	        $wikiElem.text("failed to get wikipedia resources");
	    }, 8000); //end setTimeout

	    $.ajax({
	        url: wikiUrl,
	        dataType: "jsonp",
	        jsonp: "callback",
	        success: function( response ) {
	        	
	        	/* Obtain main wikipedia link  from ajax response 
	        	and create a link to display in info window */
	        	var linkDiv = document.getElementById("wikipedia-links")
	        	var aTag = document.createElement('a');
	        	aTag.setAttribute('href', response[3][0]);
	        	aTag.innerHTML = response[3][0];
	        	linkDiv.appendChild(aTag);
	        	
	        	// Clear timeout for request
	        	clearTimeout(wikiRequestTimeout);
	        },
	        error: function(jqXHR, textStatus, errorThrown) {
	        	infowindow.setContent(
	        			  '<div><h5>' + marker.title + '<h5></div>' + 
	        			  '<div>' + marker.phone + '</div>' +
	        			  '<div><h6>Wiki Link<h6></div>' +
	        			  '<div>An Error Occurred!</div>'
	        			  );
	        }
	    }) // End ajax
	    
	    infowindow.setContent(
		  '<div><h5>' + marker.title + '<h5></div>' + 
		  '<div>' + marker.phone + '</div>' +
		  '<div><h6>Wiki Link<h6></div>' +
		  '<div id="wikipedia-links"></div>'
		  
		  );
	  
      infowindow.open(map, marker);
      // Make sure the marker property is cleared if the infowindow is closed.
      infowindow.addListener('closeclick',function(){
        infowindow.setMarker = null;
      });
    } // End if infoWindow.marker
  } // End populateInfoWindow function

var ViewModel = function() {
	  var self = this;

	  self.listLoc = ko.observableArray();

	  locations.forEach(function(locItem) {
	    self.listLoc.push(locItem)
	  });

	  self.filter = ko.observable('');

	  self.filteredItems = ko.computed(function() {
	    var filter = self.filter().toLowerCase();
	    if (!filter) {
	      ko.utils.arrayForEach(self.listLoc(), function (item) {
	        item.marker.setVisible(true);
	      });
	      return self.listLoc();
	    } else {
	      return ko.utils.arrayFilter(self.listLoc(), function(item) {
	        // set all markers visible (false)
	        var result = (item.title.toLowerCase().search(filter) >= 0)
	        item.marker.setVisible(result);
	        return result;
	      });
	    };
	  });
	}
