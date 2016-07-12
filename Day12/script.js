var app = angular.module("chommiesApp", ["ngRoute"]);

app.config(function($routeProvider) {
	$routeProvider.when("/", {
		controller: "FeedCtrl",
		templateUrl: "templates/feed.html"
	})

	$routeProvider.when("/me", {
		controller: "MeCtrl",
		templateUrl: "templates/me.html"
	})

	$routeProvider.otherwise("/");
})

app.controller("FeedCtrl", function($scope, $http) {
	$http({
		url: "http://ixchommies.herokuapp.com/props",
		method: "GET",
		params: {
			token: "5c00e4f6c7df6fdedacc6518c31cee73"
		}
	}).then(function(response) {
		$scope.props = response.data;
		console.log($scope.props);
	})

	$http({
		url: "http://ixchommies.herokuapp.com/brus",
		method: "GET",
		params: {
			token: "5c00e4f6c7df6fdedacc6518c31cee73"
		}
	}).then(function(response) {
		$scope.brus = response.data;
	})


	$scope.sendProps = function() {
 		$scope.undefinedProp = false;
		$scope.notPositive = false;

		if ($scope.newPropsValue !== undefined) {
			console.log($scope.selectedBru + " " + $scope.newPropsValue);

			$http({
				url: "http://ixchommies.herokuapp.com/props",
				method: "POST",
				params: {
					token: "5c00e4f6c7df6fdedacc6518c31cee73"
				},
				data: {
					for: $scope.selectedBru,
					props: $scope.newPropsValue
				}
			}).then(function(response) {
				console.log(response.data);
				$scope.props.unshift(response.data);
			}).catch(function(response) {
				$scope.errorMessage = "We can't accept your input. Try writing something more positive!";
				console.log($scope.errorMessage);
				$scope.notPositive = true;
			})
		} else {
			$scope.undefinedProp = true;
			console.log($scope.undefinedProp);
		}
	}

	$scope.refresh = function() {
		$http({
			url: "http://ixchommies.herokuapp.com/props",
			method: "GET",
			params: {
				token: "5c00e4f6c7df6fdedacc6518c31cee73"
			}
		}).then(function(response) {
			$scope.props = response.data;
			console.log($scope.props);
		})
	}
});

app.controller("MeCtrl", function($scope, $http) {
	$http({
		url: "http://ixchommies.herokuapp.com/props/me",
		method: "GET",
		params: {
			token: "5c00e4f6c7df6fdedacc6518c31cee73"
		}
	}).then(function(response) {
		console.log(response.data);
		$scope.myProps = response.data;
	})
})