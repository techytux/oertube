var teaserWidth  = 407;
var teaserHeight = 229;
var teaserMargin = 40;

var zielX = 373;
var zielY = 193;
var zielHeightAndMargin = 773;

var baseOffsetX = zielX;
var baseOffsetY = zielY;

var scrollOffset = 20;
var currentScrollOffset = 0;

var currentVideoA;
var videoPlayer;
var isVideoPlaying = false;

var selectedStart = 0;

var currentColumn = Array(0,0,0,0,0,0,0,0,0);

var currentIndexX = 0;
var currentIndexY = 0;
var isHalfZoomed = false;
var isFullZoomed = false;

function makeZoomable(rowClass) {
	var elements = $(rowClass + " .items a").get();
	for(var element in elements) {
		registerClickEvent(elements[element]);
	}
}

function makeArrows()
{
	$(".move-left").click(function(event)
	{
		event.preventDefault();
		var indexY = $(this).parent().find(".popular-news").index(".popular-news");
		currentColumn[indexY]--;
		if(currentColumn[indexY] < 0)
		{
			currentColumn[indexY] = 0;	
		}
		adjustColumn($(this).parent().find(".popular-news"));
	});
	$(".move-right").click(function(event)
	{
		event.preventDefault();
		var indexY = $(this).parent().find(".popular-news").index(".popular-news");
		currentColumn[indexY]++;
		if(currentColumn[indexY] > 7)
		{
			currentColumn[indexY] = 7;	
		}
		adjustColumn($(this).parent().find(".popular-news"));
	});
}

var space = false;
$(function() {

  makeArrows();

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
});


function mouseOverStar(){
	console.log("Over a Star!")
}

function onVideoClick(){
	videoPlayer.pause()
}

function onVideoPause(){
	$('.video-container').css("z-index", "-1");
	zoomHalfTo(currentVideoA, true)
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
			zoomHalfTo(a, false);
		}
		else
		{
			showVideo(a);
		}
	};
}

function showVideo(a)
{
	zoomFullTo(a);
	currentVideoA = a;
	setTimeout(playVideoTimeout, 600);
}

function goToNextVideo()
{
	currentColumn[currentIndexY] = currentColumn[currentIndexY] + 1;
	adjustColumn($(currentVideoA).parent().parent());
	showVideo($(currentVideoA).parent().parent().find("a").get(currentColumn[currentIndexY]));
}

function mouseOverStar1(){
	$('.deathstar').css("background-image", 'url("/static/img/star_selected.png")');
	$('.moonstar').css("background-image", 'url("/static/img/star_non_selected.png")');
	$('.daystar').css("background-image", 'url("/static/img/star_non_selected.png")');
}

function mouseOverStar2(){
	$('.deathstar').css("background-image", 'url("/static/img/star_selected.png")');
	$('.moonstar').css("background-image", 'url("/static/img/star_selected.png")');
	$('.daystar').css("background-image", 'url("/static/img/star_non_selected.png")');
}

function mouseOverStar3(){
	$('.deathstar').css("background-image", 'url("/static/img/star_selected.png")');
	$('.moonstar').css("background-image", 'url("/static/img/star_selected.png")');
	$('.daystar').css("background-image", 'url("/static/img/star_selected.png")');
}

function mouseClick1() {
	window.event.preventDefault();
	window.event.stopPropagation();
	var clickedEntityId = $('#entityIdSpan').text();
	goToNextVideo();
	$.ajax({
		type: "GET",
		url: "/rate/" + clickedEntityId + "/1"
	})
}

function mouseClick2() {
	window.event.preventDefault();
	window.event.stopPropagation();
	var clickedEntityId = $('#entityIdSpan').text();
	goToNextVideo();
	$.ajax({
		type: "GET",
		url: "/rate/" + clickedEntityId + "/2"
	})
}

function mouseClick3() {
	window.event.preventDefault();
	window.event.stopPropagation();
	var clickedEntityId = $('#entityIdSpan').text();
	goToNextVideo();
	$.ajax({
		type: "GET",
		url: "/rate/" + clickedEntityId + "/3"
	})
}

function onXClick(){
	$('.video-container').css("z-index", "-1");
	videoPlayer.pause();
	zoomOut();
}

function onZoomXClick(){
	var content = $('.close_zoom_x');
	content.css({opacity: 1.0, visibility: "visible"}).animate({opacity: 0}, 20);

	zoomOut();
}

function zoomHalfTo(a, showStars)
{
	var indexX = $(a).index();
	var indexY = $(a).parent().parent().index(".popular-news");

	if(indexX == currentIndexX && indexY == currentIndexY
	   && isHalfZoomed)
	{
		showVideo(a);
		return;
	}

	isHalfZoomed = true;
	isFullZoomed = false;

	var zoomFactor = 1170.0 / teaserWidth;
	zoomTo(a, zoomFactor, zielX, zielY);

	if(showStars)
	{
		if(!$(a).hasClass("showStars"))
		{
			$(a).addClass("showStars");
		}
		$(a).removeClass("showDescription");
	}
	else
	{
		$(a).removeClass("showStars");
		if(!$(a).hasClass("showDescription"))
		{
			$(a).addClass("showDescription");
		}
	}

	var content = $('.close_zoom_x');
	content.css({opacity: 1.0, visibility: "visible"}).animate({opacity: 1}, 20);
	

}

function zoomFullTo(a)
{
	var zoomFactor = 1920.0 / teaserWidth;
	zoomTo(a, zoomFactor, 0, 0);

	$(".popular-news .items a").removeClass("showStars");
	$(".popular-news .items a").removeClass("showDescription");


	isHalfZoomed = false;
	isFullZoomed = true;

}


function zoomTo(a, zoomFactor, destX, destY)
{
	var indexX = $(a).index();
	var indexY = $(a).parent().parent().index(".popular-news");

	currentIndexX = indexX;
	currentIndexY = indexY;

	if(indexX != currentColumn[indexY])
	{
		currentColumn[indexY] = indexX;
		adjustColumn($(a).parent().parent());
	}

	$("main .zoomer").css("transform-origin", "" + getOffsetX(indexX, destX, zoomFactor) + "px " + (getOffsetY(indexY, destY, zoomFactor) - currentScrollOffset) + "px");
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
	$(".popular-news .items a").removeClass("showStars");
	$(".popular-news .items a").removeClass("showDescription");
	isHalfZoomed = false;
	isFullZoomed = false;
}


function adjustColumn(jQueryElement)
{
	var indexY = jQueryElement.index(".popular-news");
	jQueryElement.find(".items").css("margin-left", (-currentColumn[indexY] * (teaserWidth + teaserMargin)) + "px");
	jQueryElement.parent().find(".move-left").css("opacity", currentColumn[indexY] > 0 ? 1 : 0);
}



function getStartY(indexY) {
	return (indexY*(teaserHeight+teaserMargin)) + baseOffsetY + currentScrollOffset;
}

function getMarginY(indexY) {
	return indexY*zielHeightAndMargin;
}

function getOffsetX(indexX, destX, zoomFactor) {
	return (destX - (baseOffsetX*zoomFactor)) / (1-zoomFactor);
}

function getOffsetY(indexY, destY, zoomFactor) {
	return (destY - (getStartY(indexY)*zoomFactor)) / (1-zoomFactor);
}



$(document).ready(function(){
    $(window).bind('mousewheel DOMMouseScroll', function(event){
	    if (event.originalEvent.wheelDelta > 0 || event.originalEvent.detail < 0) {
	    	scollUp();
	    }
	    else {
	    	scrollDown();
	    }
	});
});

function scollUp() {
	if($("main").hasClass("zoom") || currentScrollOffset >= 0) {
		return;
	}
    $(".zoomer").css("top", $(".zoomer").position().top + scrollOffset);
    $(".categories-container").css("top", $(".categories-container").position().top + scrollOffset);
    currentScrollOffset += scrollOffset;
    scrollHeadlineFading();
}

function scrollDown() {
	if($("main").hasClass("zoom")) {
		return;
	}
    $(".zoomer").css("top", $(".zoomer").position().top - scrollOffset);
    $(".categories-container").css("top", $(".categories-container").position().top - scrollOffset);
    currentScrollOffset -= scrollOffset;
    scrollHeadlineFading();
}

function scrollHeadlineFading() {
    if(currentScrollOffset >= -80 && currentScrollOffset <= 0) {
    	$(".titleContainer").css("opacity", ((currentScrollOffset+80)/80));
    }
}
