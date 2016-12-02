angular.module('movieShelf').service('localStorageService', function(omdbService){
  
	var testData = [
						{id:'tt0080684',own:true, watch:false},
						{id:'tt0848228',own:true, watch:false},
						{id:'tt1663662',own:true, watch:true},
						{id:'tt1675434',own:true, watch:true},
						{id:'tt0360717',own:false, watch:true},
						{id:'tt0108052',own:false, watch:true}
					]

	//Public end point
	this.getSavedMovies = function() {
		// return combineMovies();
		return loadMovieData();
	}



	//Get saved data from local storage. For now, return dummy data
	var loadMovieData = function() {
		return testData;
	}

	//Go through all the local data, extending each one with obdb data
	var combineMovies = function() {
		var localMovies = loadMovieData();
		var combinedMovieData = [];
		for(var i = 0; i < localMovies.length; i++) {
			combinedMovieData.push(mergeData(localMovies[i]));			
		}
		return combinedMovieData;
	}

	//This function gets the extended data for a local movie, combines it
	// with the local data, and returns the combined object
	var mergeData = function(localMovie) {
		omdbService.getMovieDetails(localMovie.id).then(function(omdbMovie) {
			var fullMovie = {};
			jQuery.extend(fullMovie, localMovie, omdbMovie);
			return fullMovie;
		})
	}

});