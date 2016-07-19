var app = angular.module("groceryApp", []);

app.controller("GroceryCtrl", function($scope) {
	$scope.newItem = "";
	$scope.newItemQuantity = "";
	$scope.items = [];
	var lowercaseItems = []; // for non-case-sensitive purposes

	$scope.addItem = function() {
		if (isNaN($scope.newItem)) {
			var repeat = false;

			for (var i = 0; i < $scope.items.length; i++) {
				if ($scope.items[i].name.toUpperCase() === $scope.newItem.toUpperCase()) {
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
	}

	$scope.increaseQuantity = function(item) {
		item.quantity = parseInt(item.quantity) + 1;
	}

	$scope.decreaseQuantity = function(item) {
		if (item.quantity > 0) {
			item.quantity = parseInt(item.quantity) - 1;
		}
	}

	$scope.emptyCart = function() {
		while ($scope.items.length > 0) {
			$scope.items.pop();
		}
	}

	$scope.deleteItem = function(item) {
		var key = item.name;
		var index = 0;
		for (var i = 0; i < $scope.items.length; i++) {
			if ($scope.items[i].name === key) {
				index = i;
			}
		}
		console.log(index);
		console.log($scope.items[index]);
		$scope.items.splice(index,1);
	}
});