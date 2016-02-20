var teaserWidth  = 407;
var teaserHeight = 229;
var teaserMargin = 40;

var zielX = 373;
var zielY = 193;
var zielHeightAndMargin = 773;

var baseOffsetX = zielX;
var baseOffsetY = zielY;

function makeZoomable(rowClass) {
	var elements = $(rowClass + " .items a").get();
	for(var element in elements) {
		registerClickEvent(elements[element]);
	}
}

function registerClickEvent(a)
{
	a.onclick = function(event) {
		event.preventDefault();
		event.stopPropagation();

		if($("main").hasClass("zoom"))
		{
			zoomHalfTo(a);
		}
		else
		{
			zoomFullTo(a);

			function playVideo(){
					var MP4Link = a.href;
					console.log($(a))
					var description = $(a).find($("span p")).text();
					console.log("DESC" + description)
					var videoPlayer = $('.videoPlayer')[0];

					$('.video-container').css("z-index", "100");
					videoPlayer.src = MP4Link
					videoPlayer.load();
			        videoPlayer.play();

					$('.video-overlay-h1').text(description)
			}

			setTimeout(playVideo, 600)
		}
	};
}

function zoomHalfTo(a)
{
	var zoomFactor = 1170.0 / teaserWidth;
	zoomTo(a, zoomFactor, zielX, zielY);
}

function zoomFullTo(a)
{
	var zoomFactor = 1920.0 / teaserWidth;
	zoomTo(a, zoomFactor, 0, 0);
}


function zoomTo(a, zoomFactor, destX, destY)
{
	var indexX = $(a).index();
	var indexY = $(a).parent().parent().index(".popular-news");
	$("main .zoomer").css("transform-origin", "" + getOffsetX(indexX, destX, zoomFactor) + "px " + getOffsetY(indexY, destY, zoomFactor) + "px")
	$("main .categories-container").css("margin-top", "-" + getMarginY(indexY) + "px");
	$("main .zoomer").css("transform", "scale(" + zoomFactor + ")");


	if(!$("main").hasClass("zoom")) {
		$("main").addClass("zoom");
	}
	else
	{
		if(!$("main").hasClass("withOrigin")) {
			$("main").addClass("withOrigin");
		}
	}
}

function zoomOut()
{
	if($("main").hasClass("zoom")) {
		$("main").removeClass("zoom");
		$("main .categories-container").css("margin-top", "0px");
		$("main .zoomer").css("transform", "scale(1)");
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

function getOffsetX(indexX, destX, zoomFactor) {
	return (destX - (getStartX(indexX)*zoomFactor)) / (1-zoomFactor);
}

function getOffsetY(indexY, destY, zoomFactor) {
	return (destY - (getStartY(indexY)*zoomFactor)) / (1-zoomFactor);
}
