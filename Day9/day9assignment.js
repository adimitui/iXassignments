var app = angular.module("nyTimesApp", []);
var NY_TIMES_API_KEY = "f586dd9d49f04a589e6aec0628a74e12";

app.controller("MainCtrl", function($scope, $http) {
	// Do this request when the user hits a search button
	$scope.searchArticles = function() {
		$http({
			url: "https://api.nytimes.com/svc/search/v2/articlesearch.json",
			method: "GET",
			params: {
				"api-key": NY_TIMES_API_KEY,
				"q": $scope.searchText
			}
		}).then(function(response) {
			console.log(response.data.response.docs);
			$scope.articles = response.data.response.docs;
		})
	}
});