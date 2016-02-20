var teaserWidth  = 407;
var teaserHeight = 229;
var teaserMargin = 40;

var zielX = 373;
var zielY = 193;
var zielHeightAndMargin = 773;

var baseOffsetX = zielX;
var baseOffsetY = zielY;

var currentVideoA;
var videoPlayer;
var isVideoPlaying = false;

var selectedStart = 0;

function makeZoomable(rowClass) {
	var elements = $(rowClass + " .items a").get();
	for(var element in elements) {
		registerClickEvent(elements[element]);
	}
}

var space = false;
$(function() {
  $(document).keyup(function(evt) {
    if (evt.keyCode == 32) {
      	space = false;
    }
  }).keydown(function(evt) {
    if (evt.keyCode == 32) {
      space = true;
	  if (isVideoPlaying){
		  videoPlayer.pause()
		  isVideoPlaying = false
	  } else {
		  unpauseVideo(currentVideoA)
		  isVideoPlaying = true
	  }
    }
  });
})


function mouseOverStar(){
	console.log("Over a Star!")
}

function onVideoClick(){
	videoPlayer.pause()
}

function onVideoPause(){
	$('.video-container').css("z-index", "-1");
	zoomHalfTo(currentVideoA)
}

function playVideo(a){
		var MP4Link = a.href;
		var description = $(a).find($("span p")).text();
		videoPlayer = $('.videoPlayer')[0];

		$('.video-container').css("z-index", "100");
		videoPlayer.src = MP4Link

		videoPlayer.onpause = onVideoPause

		$('.video-overlay-h1').text(description)
}

function unpauseVideo(a){
		var description = $(a).find($("span p")).text();
		videoPlayer = $('.videoPlayer')[0];

		$('.video-container').css("z-index", "100");
		videoPlayer.play();

		videoPlayer.onpause = onVideoPause

		$('.video-overlay-h1').text(description)
}

function playVideoTimeout(){
	playVideo(currentVideoA)
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
			currentVideoA = a
			setTimeout(playVideoTimeout, 600)
		}
	};
}

function onXClick(){
	$('.video-container').css("z-index", "-1");
	videoPlayer.pause();
	zoomOut()
}

function zoomHalfTo(a)
{
	var zoomFactor = 1170.0 / teaserWidth;
	zoomTo(a, zoomFactor, zielX, zielY);
	$(".stars_div").css("display", "block")
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
