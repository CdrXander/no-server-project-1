angular.module('movieShelf').controller('shelfCtrl', function($scope, omdbService, localStorageService) {
	


	//Load the extended film data asynchronously
	var mergeData = function(localMovie) {
		omdbService.getMovieDetails(localMovie.id).then(function(omdbMovie) {
			var fullMovie = {};
			jQuery.extend(fullMovie, localMovie, omdbMovie);
			if(fullMovie.own === true) {
			$scope.ownedMovies.push(fullMovie);
			}
			if(fullMovie.watch === true) {
				$scope.watchMovies.push(fullMovie);
			}
		})
	}

	//Initial load
	var loadMovieData = function() {
		$scope.ownedMovies = [];
		$scope.watchMovies = [];

		var savedMovies = localStorageService.getSavedMovies();
		for(var i = 0; i < savedMovies.length; i++) {
			mergeData(savedMovies[i]);
		}
	}
	loadMovieData();


	$scope.clearShelves = function() {
		localStorageService.clearShelves();
		loadMovieData();
	}

});