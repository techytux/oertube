'use strict';

/* Controllers */


function AboutController($scope) {

}

function PostListController($scope, Post) {
	var postsQuery = Post.get({}, function(posts) {
		$scope.posts = posts.objects;
	});
}

function PostDetailController($scope, $routeParams, Post) {
	var postQuery = Post.get({ postId: $routeParams.postId }, function(post) {
		$scope.post = post;
	});
}

function GetInfoHighlightsController($scope, $http) {


}

var hiding_overlay = 0;

function hideOverlay(){
	hiding_overlay -= 1
	if (hiding_overlay == 0) {
		var content = $(".video-overlay");
		var contentx = $(".video-overlay-x");
		// make sure the overlay is only hidden after no mouse move was induces in the last 3 seconds
		content.css({opacity: 1.0, visibility: "visible"}).animate({opacity: 0}, 10);
		contentx.css({opacity: 1.0, visibility: "visible"}).animate({opacity: 0}, 10);
	}
}

function onVideoMouseMove(){
	setTimeout(hideOverlay, 3000)
	var content = $(".video-overlay");
	var contentx = $(".video-overlay-x");
	content.css({opacity: 1.0, visibility: "visible"}).animate({opacity: 0.6}, 10);
	contentx.css({opacity: 1.0, visibility: "visible"}).animate({opacity: 0.6}, 10);
	hiding_overlay += 1
}
