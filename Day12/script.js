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
		$scope.isSending = true;
 		$scope.showErrorMessage = false;
 		console.log($scope.selectedBru);

		if ($scope.newPropsValue === undefined) {
			$scope.showErrorMessage = true;
			$scope.errorMessage = "Type something into the compliment box before submitting!";
			console.log($scope.errorMessage);
			$scope.isSending = false;
		} else if ($scope.selectedBru === undefined) {
			$scope.showErrorMessage = true;
			$scope.errorMessage = "Choose a bru to send your prop to before submitting!";
			console.log($scope.errorMessage);
			$scope.isSending = false;
		} else if ($scope.selectedBru === "adelle") {
			$scope.showErrorMessage = true;
			$scope.errorMessage = "You can't send a compliment to yourself. Try spreading the love around!";
			console.log($scope.errorMessage);
			$scope.isSending = false;
		} else {
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
				$scope.isSending = false;
				$scope.newPropsValue = "";
			}).catch(function(response) {
				$scope.showErrorMessage = true;
				$scope.errorMessage = "We can't accept your input. Try writing something more positive!";
				$scope.isSending = false;
			}).finally(function() {
				if ($scope.showErrorMessage === true) {
					console.log($scope.errorMessage);
				}
				$scope.isSending = false;
			})
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