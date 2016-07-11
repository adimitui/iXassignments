var app = angular.module("movieApp", ["ngRoute"]);

var GIPHY_KEY = "dc6zaTOxFJmzC";

app.config(function($routeProvider) {
	$routeProvider.when("/", {
		controller: "MainCtrl",
		templateUrl: "templates/home.html"
	})
	$routeProvider.when("/movie/:imdbID", {
		controller: "MovieCtrl",
		templateUrl: "templates/movie.html"
	})
});

app.controller("MainCtrl", function($scope, $http) {
	$scope.searchMovies = function() {
		$http({
			url: "http://www.omdbapi.com/?",
			method: "GET",
			params: {
				s: $scope.searchText
			}
		}).then(function(response) {
			$scope.movieArray = response.data.Search;
		})
	}
});

app.controller("MovieCtrl", function($scope, $http, $routeParams) {
	var movieTitle = "";

	$http({
		url: "http://www.omdbapi.com/?",
		method: "GET",
		params: {
			i: $routeParams.imdbID
		}
	}).then(function(response) {
		movieTitle = response.data.Title;
		$scope.movie = response.data;

		$http({
			url: "http://api.giphy.com/v1/gifs/search",
			method: "GET",
			params: {
				api_key: GIPHY_KEY,
				q: movieTitle
			}
		}).then(function(response) {
			$scope.movieImages = response.data.data;
			console.log($scope.movieImages);
		})
	})

	// $http({
	// 	blahblah
	// }).then(getGifs(response));

	// var getGifs = function(response) {
	// 	do the stuff here
	// }
});