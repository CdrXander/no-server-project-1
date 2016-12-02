angular.module('movieShelf').service('localStorageService', function(omdbService){
  
	var LOCAL_STORAGE_NAME = "movieList";

	var testData = [
						{id:'tt0080684',own:true, watch:false},
						{id:'tt0848228',own:true, watch:false},
						{id:'tt1663662',own:true, watch:true},
						{id:'tt1675434',own:true, watch:true},
						{id:'tt0360717',own:false, watch:true},
						{id:'tt0108052',own:false, watch:true}
					]

	//GET SAVED MOVIES - public end point to get all saved movies
	this.getSavedMovies = function() {
		return loadMovieData();
	}

	//LOAD MOVIE DATA - Load movie data from local storage
	var loadMovieData = function() {
		var localMovieData;
		if(localStorage.movieList) {
			localMovieData = JSON.parse(localStorage.getItem(LOCAL_STORAGE_NAME));
		} else {
			//TODO: CHANGE FOR PROD
			localMovieData = testData;

		}
		return localMovieData;
	}

	//SAVE MOVIE - save a movie object to local local storage 	=	=
	this.saveMovie = function(movieObj) {
		//Get the local movie data
		var localMovieData = loadMovieData();

		//if id exists in array, update it
		var index = localMovieData.findIndex(function(element) {
			return element.id == movieObj.id;
		})

		if(index > 0) {
			if(movieObj.own != undefined) {
				localMovieData[index].own = movieObj.own;
			}
			if(movieObj.watch != undefined) {
				localMovieData[index].watch = movieObj.watch;
			}
			
		} else {
			localMovieData.push(movieObj);
		}

		//Finally, save the data to local storage
		localStorage.setItem(LOCAL_STORAGE_NAME, JSON.stringify(localMovieData));

	}

	//DELETE MOVIE - remove movie by movieId	=	=	=
	this.deleteMovie = function(movieId) {
		//Get the local movie data
		var localMovieData = loadMovieData();
		//find the id in the array
		var index = localMovieData.findIndex(function(element) {
			element.id = movieObj.id;
		})
		if(index > 0) {
			localMovieData.splice(index, 1);
			localStorage.setItem(LOCAL_STORAGE_NAME, JSON.stringify(localMovieData));
		}
	}

	//CLEAR SHELVES - remove all movieShelf		=	=	=
	this.clearShelves = function() {
		localStorage.removeItem(LOCAL_STORAGE_NAME);
	}


});