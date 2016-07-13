var app = angular.module("tensionApp", ["ngRoute", "firebase"]);

app.config(function($routeProvider) {
	$routeProvider.when("/", {
		controller: "MainCtrl",
		templateUrl: "templates/main.html"
	})
})

app.controller("MainCtrl", function($scope, $firebaseObject, $firebaseArray) {
	var ref = firebase.database().ref().child("messages");
	$scope.messages = $firebaseArray(ref);

	$scope.sendMessage = function() {
		$scope.messages.$add({
			sender: $scope.senderValue,
			text: $scope.messageValue
		});
	};
});