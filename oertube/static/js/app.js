'use strict';

angular.module('AngularFlask', ['angularFlaskServices', 'angularFlaskControllers']);


angular.module('angularFlaskControllers', []).
	controller('indexController', function($scope, $http){
		console.log('Hello');
		$http.get('/list/dbdef3c5-b589-566c-9cc4-19f521f07771')
		.then(function(response){
			$scope.infoHighlights = response.data.msg.data;
			console.log($scope.infoHighlights);
		})

		$http.get('/list/dbdef3c5-b589-566c-9cc4-19f521f07770')
		.then(function(response){
			$scope.docuHighlights = response.data.msg.data;
			console.log($scope.infoHighlights);
		})

		$http.get('/list/dbdef3c5-b589-566c-9cc4-19f521f07773')
		.then(function(response){
			$scope.movieHighlights = response.data.msg.data;
			console.log($scope.infoHighlights);
		})

		$http.get('/list/dbdef3c5-b589-566c-9cc4-19f521f07774')
		.then(function(response){
			$scope.seriesHighlights = response.data.msg.data;
			console.log($scope.infoHighlights);
		})

		$http.get('/list/dbdef3c5-b589-566c-9cc4-19f521f07775')
		.then(function(response){
			$scope.comedyHighlights = response.data.msg.data;
			console.log($scope.infoHighlights);
		})
	});
