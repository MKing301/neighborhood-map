var viewModel = {
  places: [ {
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
};

viewModel.Query = ko.observable('');

viewModel.searchResults = ko.computed(function() {
    var q = viewModel.Query();
    return viewModel.places.filter(function(i) {
      return i.title.toLowerCase().indexOf(q) >= 0;
    }); 
});


$(document).ready(function() {
	$('.toggle-button').click(function() {
	    $('.list-box').toggle();
	    $('#map').toggleClass('active');
	    $('.content-nav-bar').toggleClass('active');
	});
});

ko.applyBindings(viewModel);