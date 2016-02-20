var teaserWidth  = 407;
var teaserHeight = 229;
var teaserMargin = 40;

var scale = 2.874692875;
var zielX = 373;
var zielY = 193;
var zielHeightAndMargin = 773;

var baseOffsetX = zielX;
var baseOffsetY = zielY;

function makeZoomable(rowClass) {
	var elements = $(rowClass + " .items a").get();
	for(var element in elements) {
		elements[element].onclick = function(event) {
			event.preventDefault();
			event.stopPropagation();
			var indexY = $(this).parent().parent().index(".popular-news");
			

			if($("main").hasClass("zoom")) {
				$("main").removeClass("zoom");
				$("main .categories-container").css("margin-top", "0px");
			} else {
				var indexX = $(this).index();
				$("main .zoomer").css("transform-origin", "" + getOffsetX(indexX) + "px " + getOffsetY(indexY) + "px")
				$("main").addClass("zoom");
				$("main .categories-container").css("margin-top", "-" + getMarginY(indexY) + "px");
			}
		};
	}
}

function getStartX(indexX) {
	return (indexX*(teaserWidth+teaserMargin)) + baseOffsetX;
}

function getStartY(indexY) {
	return (indexY*(teaserHeight+teaserMargin)) + baseOffsetY;
}

function getMarginY(indexY) {
	return indexY*zielHeightAndMargin;
}

function getOffsetX(indexX) {
	return (zielX - (getStartX(indexX)*scale)) / (1-scale);
}

function getOffsetY(indexY) {
	return (zielY - (getStartY(indexY)*scale)) / (1-scale);
}
