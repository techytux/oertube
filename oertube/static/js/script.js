var teaserWidth  = 320;
var teaserHeight = 160;
var teaserMargin = 10;

var scale = 3;
var zielX = 100;
var zielY = 100;

function makeZoomable(rowClass) {
	var elements = $(rowClass + " .items a").get();
	for(var element in elements) {
		elements[element].onclick = function(event) {
			event.preventDefault();
			event.stopPropagation();
			
			if($("main").hasClass("zoom")) {
				console.log("Voodoo");
				$("main").removeClass("zoom");
			} else {
				var indexX = $(this).index();
				var indexY = $(this).parent().parent().index(".popular-news"); // TODO .popular-news
				$("main").css("transform-origin", "" + getOffsetX(indexX) + "px " + getOffsetY(indexY) + "px")
				$("main").addClass("zoom");
			}
		};
	}
}

function getStartX(indexX) {
	return indexX*(teaserWidth+teaserMargin);
}

function getStartY(indexY) {
	return indexY*(teaserHeight+teaserMargin);
}

function getOffsetX(indexX) {
	return (zielX - (getStartX(indexX)*scale)) / (1-scale);
}

function getOffsetY(indexY) {
	return (zielY - (getStartY(indexY)*scale)) / (1-scale);
}
