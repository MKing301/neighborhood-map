$(document).ready(function() {
	$('.toggle-button').click(function() {
	    $('.list-box').toggle();
	    $('#map').toggleClass('active');
	    $('.content-nav-bar').toggleClass('active');
	});
});