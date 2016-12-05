angular.module('movieShelf')
.controller('shelfCtrl', function($scope, omdbService, localStorageService) {
	


	//Load the extended film data asynchronously
	// var mergeData = function(localMovie) {
	// 	omdbService.getMovieDetails(localMovie.id).then(function(omdbMovie) {
	// 		var fullMovie = {};
	// 		jQuery.extend(fullMovie, localMovie, omdbMovie);
	// 		if(fullMovie.own === true) {
	// 		$scope.ownedMovies.push(fullMovie);
	// 		}
	// 		if(fullMovie.watch === true) {
	// 			$scope.watchMovies.push(fullMovie);
	// 		}
	// 	})
	// }

	//Initial load
	$scope.loadMovieData = function() {
		$scope.ownedMovies = [];
		$scope.watchMovies = [];

		var savedMovies = localStorageService.getSavedMovies();
		for(var i = 0; i < savedMovies.length; i++) {
			if(savedMovies[i].own === true) {
			$scope.ownedMovies.push(savedMovies[i]);
			}
			if(savedMovies[i].watch === true) {
				$scope.watchMovies.push(savedMovies[i]);
			}

//			mergeData(savedMovies[i]);
		}
	}
	$scope.loadMovieData();


	$scope.clearShelves = function() {
		localStorageService.clearShelves();
		$scope.loadMovieData();
	}

});