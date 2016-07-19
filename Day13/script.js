var app = angular.module("tensionApp", ["ngRoute", "firebase"]);

app.run(["$rootScope", "$location", function($rootScope, $location) {
	$rootScope.$on("$routeChangeError", function(event, next, previous, error) {
	    if (error === "AUTH_REQUIRED") {
	    	$location.path("/signup");
	    }
	});
}]);

app.config(function($routeProvider) {
	$routeProvider.when("/", {
		controller: "ChannelCtrl",
		templateUrl: "templates/channel.html",
		resolve: {
			"currentAuth": function($firebaseAuth) {
				return $firebaseAuth().$requireSignIn();
			}
		}
	})

	$routeProvider.when("/chat/:channelName", {
		controller: "MainCtrl",
		templateUrl: "templates/main.html",
		resolve: {
			"currentAuth": function($firebaseAuth) {
				return $firebaseAuth().$requireSignIn();
			}
		}
	})

	$routeProvider.when("/signup", {
		controller: "SignUpCtrl",
		templateUrl: "templates/signup.html",
		resolve: {
			"currentAuth": function($firebaseAuth) {
				return $firebaseAuth().$waitForSignIn();
			}
		}
	})

	$routeProvider.otherwise("/", {
		resolve: {
			"currentAuth": function($firebaseAuth) {
				return $firebaseAuth().$requireSignIn();
			}
		}
	})
})

app.controller("HeaderCtrl", function($scope, $firebaseAuth, $window) {
	$scope.authObj = $firebaseAuth();

	$scope.signOut = function() {
		$scope.authObj.$signOut();
		console.log("User signed out");
		$window.location.href = "#/signup";
	}
})

app.controller("ChannelCtrl", function($scope, $firebaseObject, $firebaseAuth, $firebaseArray, $window, currentAuth) {
	console.log(currentAuth);

	var temp = firebase.database().ref().child("channels");
	$scope.channels = $firebaseArray(temp);

	var ref = firebase.database().ref().child("channels").child("random");
	$scope.channel = $firebaseObject(ref);
	$scope.channel.name = "Random";
	$scope.channel.description = "A place for all miscellaneous discussion and conversations that may not make sense.";
	$scope.channel.$save();

	ref = firebase.database().ref().child("channels").child("general");
	$scope.channel = $firebaseObject(ref);
	$scope.channel.name = "General";
	$scope.channel.description = "Discussion that is relevant to all members of a team and is congruous with the overall team mission.";
	$scope.channel.$save();

	$scope.addChannel = function() {
		ref = firebase.database().ref().child("channels").child($scope.newChannelName.toLowerCase());
		$scope.channel = $firebaseObject(ref);
		$scope.channel.name = $scope.newChannelName;
		$scope.channel.description = $scope.newChannelDescription;
		$scope.channel.$save();
	};
})

app.controller("MainCtrl", function($scope, $firebaseObject, $firebaseAuth, $firebaseArray, $window, currentAuth, $routeParams) {
	var ref = firebase.database().ref().child("messages").child($routeParams.channelName.toLowerCase());
	$scope.messages = $firebaseArray(ref);

	$scope.authObj = $firebaseAuth();
	$scope.currentUser = currentAuth;
	console.log(currentAuth);

	console.log(currentAuth.uid);
	var userRef = firebase.database().ref().child("users").child(currentAuth.uid);
	var user = $firebaseObject(userRef);

	$scope.sendMessage = function() {
		$scope.messages.$add({
			sender: $scope.currentUser.uid,
			name: user.name,
			text: $scope.messageValue
		});
		console.log(user.name);
		$scope.messages.$save();
	};
});

app.controller("SignUpCtrl", function($scope, $firebaseAuth, $firebaseObject, $window, currentAuth) {
	$scope.authObj = $firebaseAuth();

	$scope.signUp = function() {
		console.log($scope.name);
		console.log($scope.email);
		console.log($scope.password);

		$scope.authObj.$createUserWithEmailAndPassword($scope.email, $scope.password)
			.then(function(firebaseUser) {
			console.log("User" + firebaseUser.uid + " created successfully!");

			var ref = firebase.database().ref().child("users").child(firebaseUser.uid);
			$scope.user = $firebaseObject(ref);
			$scope.user.name = $scope.name;
			$scope.user.$save();

			$window.location.href = "#/";
		}).catch(function(error) {
			console.error("Error: ", error);
			$scope.errorMessage = error.message;
			$scope.showErrorMessage = true;
		})
	};

	$scope.logIn = function() {
		$scope.showErrorMessage = false;
		$scope.authObj.$signInWithEmailAndPassword($scope.loginEmail, $scope.loginPassword).then(function(firebaseUser) {
			console.log("Signed in as:", firebaseUser.uid);

			$window.location.href = "#/";
		}).catch(function(error) {
			console.error("Authentication failed:", error);
			$scope.errorMessage = error.message;
			$scope.showErrorMessage = true;
		})
	}
});