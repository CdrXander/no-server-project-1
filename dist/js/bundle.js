'use strict';

/*
*
*/
angular.module('movieShelf', ['ui.router', 'ngAnimate']).config(function ($stateProvider, $urlRouterProvider) {

	$stateProvider.state('home', {
		url: '/',
		templateUrl: './views/shelf.html',
		controller: 'shelfCtrl'
	}).state('search', {
		url: '/search',
		templateUrl: './views/search.html',
		controller: 'searchCtrl'
	}).state('details', {
		url: '/details/:id',
		templateUrl: './views/detail.html',
		controller: 'detailCtrl'
	});
}).run();
'use strict';

angular.module('movieShelf').controller('detailCtrl', function ($scope, $stateParams, omdbService) {

	omdbService.getMovieDetails($stateParams.id).then(function (serviceData) {
		$scope.movie = serviceData;
		console.log($scope.movie);
	});
});
'use strict';

angular.module('movieShelf').controller('mainCtrl', function ($scope) {
	$scope.test = "Test Main Ctrl";
});
'use strict';

angular.module('movieShelf').controller('searchCtrl', function ($scope, omdbService, localStorageService) {

	$scope.reloadMovies = function () {
		var savedMovies = localStorageService.getSavedMovies();
		for (var i = 0; i < $scope.movies.length; i++) {
			for (var j = 0; j < savedMovies.length; j++) {
				if ($scope.movies[i].imdbID == savedMovies[j].imdbID) {
					$scope.movies[i].own = savedMovies[j].own;
					$scope.movies[i].watch = savedMovies[j].watch;
					break;
				}
			}
		}
		// $scope.movies = $scope.movies
	};

	$scope.searchForMovie = function () {
		omdbService.searchForMovie($scope.searchTitle).then(function (serviceData) {
			$scope.movies = serviceData;
			$scope.reloadMovies();
		});
	};
});
'use strict';

angular.module('movieShelf').controller('shelfCtrl', function ($scope, omdbService, localStorageService) {

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
	$scope.loadMovieData = function () {
		$scope.ownedMovies = [];
		$scope.watchMovies = [];

		var savedMovies = localStorageService.getSavedMovies();
		for (var i = 0; i < savedMovies.length; i++) {
			if (savedMovies[i].own === true) {
				$scope.ownedMovies.push(savedMovies[i]);
			}
			if (savedMovies[i].watch === true) {
				$scope.watchMovies.push(savedMovies[i]);
			}

			//			mergeData(savedMovies[i]);
		}
	};
	$scope.loadMovieData();

	$scope.clearShelves = function () {
		localStorageService.clearShelves();
		$scope.loadMovieData();
	};
});
'use strict';

angular.module('movieShelf').service('localStorageService', function (omdbService) {

	var LOCAL_STORAGE_NAME = "movieList";

	var testData = [{ imdbID: 'tt0080684', Year: 1980, own: true, watch: false, Rated: "PG", Title: "Star Wars: Episode V - The Empire Strikes Back", Poster: "https://images-na.ssl-images-amazon.com/images/M/MV5BYmViY2M2MTYtY2MzOS00YjQ1LWIzYmEtOTBiNjhlMGM0NjZjXkEyXkFqcGdeQXVyNDYyMDk5MTU@._V1_SX300.jpg" }, { imdbID: 'tt0848228', Year: 2012, own: true, watch: false, Rated: "PG-13", Title: "The Avengers", Poster: "https://images-na.ssl-images-amazon.com/images/M/MV5BMTk2NTI1MTU4N15BMl5BanBnXkFtZTcwODg0OTY0Nw@@._V1_SX300.jpg" }, { imdbID: 'tt1663662', Year: 2013, own: true, watch: true, Rated: "PG-13", Title: "Pacific Rim", Poster: "https://images-na.ssl-images-amazon.com/images/M/MV5BMTY3MTI5NjQ4Nl5BMl5BanBnXkFtZTcwOTU1OTU0OQ@@._V1_SX300.jpg" }, { imdbID: 'tt1675434', Year: 2011, own: true, watch: true, Rated: "R", Title: "The Intouchables", Poster: "https://images-na.ssl-images-amazon.com/images/M/MV5BMTYxNDA3MDQwNl5BMl5BanBnXkFtZTcwNTU4Mzc1Nw@@._V1_SX300.jpg" }, { imdbID: 'tt0360717', Year: 2005, own: false, watch: true, Rated: "PG-13", Title: "King Kong", Poster: "https://images-na.ssl-images-amazon.com/images/M/MV5BMjYxYmRlZWYtMzAwNC00MDA1LWJjNTItOTBjMzlhNGMzYzk3XkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg" }, { imdbID: 'tt0108052', Year: 1993, own: false, watch: true, Rated: "R", Title: "Schindler's List", Poster: "https://images-na.ssl-images-amazon.com/images/M/MV5BMzMwMTM4MDU2N15BMl5BanBnXkFtZTgwMzQ0MjMxMDE@._V1_SX300.jpg" }];

	//Eliminates the problem of dead data
	var cleanData = function cleanData(movieData) {
		for (var i = movieData.length - 1; i >= 0; i--) {
			if (!!!movieData[i].own && !!!movieData[i].watch) {
				movieData.splice(i, 1);
			}
		}
		return movieData;
	};

	//GET SAVED MOVIES - public end point to get all saved movies
	this.getSavedMovies = function () {
		return loadMovieData();
	};

	//LOAD MOVIE DATA - Load movie data from local storage
	var loadMovieData = function loadMovieData() {
		var localMovieData;
		if (localStorage.movieList) {
			localMovieData = JSON.parse(localStorage.getItem(LOCAL_STORAGE_NAME));
		} else {
			//TODO: CHANGE FOR PROD
			localMovieData = testData;
		}
		return localMovieData;
	};

	//SAVE MOVIE - save a movie object to local local storage 	=	=
	this.saveMovie = function (movieObj) {
		//Get the local movie data
		var localMovieData = loadMovieData();

		//if id exists in array, update it
		var index = localMovieData.findIndex(function (element) {
			return element.imdbID == movieObj.imdbID;
		});

		if (index > 0) {
			localMovieData[index].own = !!movieObj.own;
			localMovieData[index].watch = !!movieObj.watch;
		} else {
			localMovieData.push(movieObj);
		}
		// localMovieData = cleanData(localMovieData);
		//Finally, save the data to local storage
		localStorage.setItem(LOCAL_STORAGE_NAME, JSON.stringify(localMovieData));
		console.log(localMovieData);
	};

	// //DELETE MOVIE - remove movie by movieId	=	=	=
	// this.deleteMovie = function(movieId) {
	// 	//Get the local movie data
	// 	var localMovieData = loadMovieData();
	// 	//find the id in the array
	// 	var index = localMovieData.findIndex(function(element) {
	// 		element.id = movieObj.id;
	// 	})
	// 	if(index > 0) {
	// 		localMovieData.splice(index, 1);
	// 		localStorage.setItem(LOCAL_STORAGE_NAME, JSON.stringify(localMovieData));
	// 	}
	// }

	//CLEAR SHELVES - remove all movieShelf		=	=	=
	this.clearShelves = function () {
		localStorage.removeItem(LOCAL_STORAGE_NAME);
	};
});
'use strict';

angular.module('movieShelf').service('omdbService', function ($http, $q) {

  //Acquire results for a movie search
  this.searchForMovie = function (title) {
    var deferred = $q.defer();

    var url = 'https://www.omdbapi.com/?s=' + title + '&page=1';
    $http.get(url).success(function (response) {
      var searchResults = response.Search;
      deferred.resolve(searchResults);
    });
    return deferred.promise;
  };

  //Get specific details for a single movie
  this.getMovieDetails = function (id) {
    var deferred = $q.defer();

    var url = "https://www.omdbapi.com/?i=" + id + "&plot=full&r=json&tomatoes=true";

    $http.get(url).success(function (response) {
      deferred.resolve(response);
    });
    return deferred.promise;
  };
});
'use strict';

angular.module('movieShelf').directive('movieDisplay', function () {

	var coverController = ['$scope', 'localStorageService', function ($scope, localStorageService) {
		//Add a film to the Owned_Movies array
		$scope.addMovieToOwned = function (movie) {
			var localMovie = {
				imdbID: movie.imdbID,
				Title: movie.Title,
				Poster: movie.Poster,
				Year: movie.Year,
				own: !!!movie.own,
				watch: !!movie.watch
			};
			localStorageService.saveMovie(localMovie);
			$scope.reload();
		};

		//Add a film to the To_Watch_Movies array 
		$scope.addMovieToWatch = function (movie) {
			var localMovie = {
				imdbID: movie.imdbID,
				Title: movie.Title,
				Poster: movie.Poster,
				Year: movie.Year,
				own: !!movie.own,
				watch: !!!movie.watch
			};
			localStorageService.saveMovie(localMovie);
			$scope.reload();
		};
	}];

	return {
		restrict: "E",
		templateUrl: './directives/coverDir.html',
		scope: {
			movies: '=',
			reload: '&'
		},
		controller: coverController
	};
});
//# sourceMappingURL=bundle.js.map
