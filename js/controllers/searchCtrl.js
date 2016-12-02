angular.module('movieShelf').controller('searchCtrl', function($scope, omdbService, localStorageService) {
	$scope.test = "Test Search Ctrl";


	$scope.searchForMovie = function() {
		omdbService.searchForMovie($scope.searchTitle).then(function(serviceData) {
			$scope.movies = serviceData;
			console.log($scope.movies);
		})
	}
});