$(document).ready(function() {
	setTimeout(function() {
        $('body').addClass('loaded');
    }, 1000);

	$(".clear-times-list").click(function () {
		$(".list-of-times").html("");
	});

	$('.popup-with-form').magnificPopup({
		type: 'inline',
		preloader: false,
		focus: '#name',

		// When elemened is focused, some mobile browsers in some cases zoom in
		// It looks not nice, so we disable it:
		callbacks: {
			beforeOpen: function() {
				if($(window).width() < 700) {
					this.st.focus = false;
				} else {
					this.st.focus = '#name';
				}
			}
		}
	});

	$(".switcher").children("ul").children("li").click(function () {
		$(".active").removeClass("active");
		$(this).addClass("active");

		if ($(this).is(".timer-s")) {
			$(".session-details").removeClass("active");
			$(".timer").addClass("active");
		} else {
			$(".timer").removeClass("active");
			$(".session-details").addClass("active");
		}
	});
});