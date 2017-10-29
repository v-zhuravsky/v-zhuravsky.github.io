$(function() {

	var menuCounter = 0;
	$(".menu-button").click(function () {
		$(".top-nav-menu").slideToggle();
		if (menuCounter == 0) {
			menuCounter = 1;
			this.innerHTML = "close";
		} else {
			menuCounter = 0;
			this.innerHTML = "menu";
		}
	});

});
