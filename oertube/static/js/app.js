'use strict';

angular.module('AngularFlask', ['angularFlaskServices', 'angularFlaskControllers']);

function fixImages(responseList){
	for (let i = 0; i < responseList.length; i++){
		// console.log('HERE1 ' + i);
		responseList[i].image = 'http://' + responseList[i].image.split('://')[1]
		responseList[i].image = responseList[i].image.replace('(', '\\(');
		responseList[i].image = responseList[i].image.replace(')', '\\)');
	}
	return responseList;
}

angular.module('angularFlaskControllers', []).
	controller('indexController', function($scope, $http){
		$http.get('/list/480517bd-9993-5c3d-a704-0779f32a30e6')
		.then(function(response){
			$scope.infoHighlights = fixImages(response.data.msg.data);
			// console.log($scope.infoHighlights);
			makeZoomable("#popular-1");
		})

		$http.get('/list/95b326b9-af67-5e5c-9d03-e4daee12b00a')
		.then(function(response){
			$scope.docuHighlights = fixImages(response.data.msg.data);

			// $scope.docuHighlights = response.data.msg.data;
			// console.log($scope.infoHighlights);
			makeZoomable("#popular-2");
		})

		$http.get('/list/dbdef3c5-b589-566c-9cc4-19f521f07934')
		.then(function(response){
			$scope.movieHighlights = fixImages(response.data.msg.data);
			// console.log($scope.infoHighlights);
			makeZoomable("#popular-3");
		})

		$http.get('/list/d6438f5f-9357-5945-b081-e086e512f5b9')
		.then(function(response){
			$scope.seriesHighlights = fixImages(response.data.msg.data);
			// console.log($scope.infoHighlights);
			makeZoomable("#popular-4");
		})

		$http.get('/list/0826cf97-3c0d-50d5-bd54-ef84f4733c0a')
		.then(function(response){
			let responseList = fixImages(response.data.msg.data);
			$scope.comedyHighlights = responseList;
			// console.log($scope.infoHighlights);
			makeZoomable("#popular-5");
		})

		$http.get('/list/6cc246df-624e-5473-87e6-0a7006c943f3')
		.then(function(response){
			$scope.recommendationHighlights = fixImages(response.data.msg.data);
			// console.log($scope.infoHighlights);
			makeZoomable("#popular-6");
		})
	});
