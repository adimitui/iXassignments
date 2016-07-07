var app = angular.module("groceryApp", []);

app.controller("GroceryCtrl", function($scope) {
	$scope.newItem = "";
	$scope.newItemQuantity = "";
	$scope.items = [];

	$scope.addItem = function() {
		var repeat = false;

		for (var i = 0; i < $scope.items.length; i++) {
			if ($scope.items[i].name === $scope.newItem) {
				$scope.items[i].quantity = parseInt($scope.items[i].quantity) + parseInt($scope.newItemQuantity);
				repeat = true;
			}
		}

		if (!repeat) {
			var item = {
				"name": $scope.newItem,
				"quantity": $scope.newItemQuantity
			};
			$scope.items.push(item);
			$scope.newItem = "";
			$scope.newItemQuantity = "";
		}
	}

	$scope.increaseQuantity = function(item) {
		item.quantity = parseInt(item.quantity) + 1;
	}

	$scope.decreaseQuantity = function(item) {
		if (item.quantity > 0) {
			item.quantity = parseInt(item.quantity) - 1;
		}
	}
});