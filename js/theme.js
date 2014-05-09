/* 
jslint browser : true;
*/
var themer, t;

$.mobile.changeTheme = function (theme) {
	var themes = " a c d e";
	function setTheme(csselector,themeclass,theme) {
		$(csselector).removeClass(themes.split(" ").join(" " + themeclass + "-"))
		.addClass(themeclass + "-" + theme)
		.attr('data-theme',theme);
	}
	setTheme("[data-role='page']", "ui-body", theme);
}


function handleTheme(i) {
	themer[i].onclick = function () {
		$.mobile.changeTheme(themer[i].id);
	}
}

$(document).bind('pagecontainershow', function(e, data) {
	var i;
	if ($.mobile.activePage.attr('id') == "mainpage") {
		}
		if($.mobile.activePage.attr('id') == "themepage") {
			themer = document.getElementsByClassName('themes');
			for(i = 0; i < themer.length; i += 1) {
				handleTheme(i);
			}

		}
});
