angular.module('movieShelf').controller('searchCtrl', function($scope, omdbService, localStorageService) {

	$scope.reloadMovies = function() {
		var savedMovies = localStorageService.getSavedMovies();
		for(var i = 0; i < $scope.movies.length;i++) {
			for(var j = 0; j < savedMovies.length; j++) {
				if($scope.movies[i].imdbID == savedMovies[j].imdbID) {
					$scope.movies[i].own = savedMovies[j].own;
					$scope.movies[i].watch = savedMovies[j].watch;
					break;
				}
			}
		}
		// $scope.movies = $scope.movies
	}

	$scope.searchForMovie = function() {
		omdbService.searchForMovie($scope.searchTitle).then(function(serviceData) {
			$scope.movies = serviceData;
			$scope.reloadMovies();
		})
	}


	
});