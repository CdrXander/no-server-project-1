'use strict';

/*
*
*/
angular.module('movieShelf', ['ui.router']).config(function ($stateProvider, $urlRouterProvider) {

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
});
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
	$scope.test = "Test Search Ctrl";

	$scope.searchForMovie = function () {
		omdbService.searchForMovie($scope.searchTitle).then(function (serviceData) {
			$scope.movies = serviceData;
			console.log($scope.movies);
		});
	};
});
'use strict';

angular.module('movieShelf').controller('shelfCtrl', function ($scope, omdbService, localStorageService) {

	//Load the extended film data asynchronously
	var mergeData = function mergeData(localMovie) {
		omdbService.getMovieDetails(localMovie.id).then(function (omdbMovie) {
			var fullMovie = {};
			jQuery.extend(fullMovie, localMovie, omdbMovie);
			if (fullMovie.own === true) {
				$scope.ownedMovies.push(fullMovie);
			}
			if (fullMovie.watch === true) {
				$scope.watchMovies.push(fullMovie);
			}
		});
	};

	//Initial load
	var loadMovieData = function loadMovieData() {
		$scope.ownedMovies = [];
		$scope.watchMovies = [];

		var savedMovies = localStorageService.getSavedMovies();
		for (var i = 0; i < savedMovies.length; i++) {
			mergeData(savedMovies[i]);
		}
	};
	loadMovieData();

	$scope.clearShelves = function () {
		localStorageService.clearShelves();
		loadMovieData();
	};
});
'use strict';

angular.module('movieShelf').service('localStorageService', function (omdbService) {

	var LOCAL_STORAGE_NAME = "movieList";

	var testData = [{ id: 'tt0080684', own: true, watch: false }, { id: 'tt0848228', own: true, watch: false }, { id: 'tt1663662', own: true, watch: true }, { id: 'tt1675434', own: true, watch: true }, { id: 'tt0360717', own: false, watch: true }, { id: 'tt0108052', own: false, watch: true }];

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
			return element.id == movieObj.id;
		});

		if (index > 0) {
			if (movieObj.own != undefined) {
				localMovieData[index].own = movieObj.own;
			}
			if (movieObj.watch != undefined) {
				localMovieData[index].watch = movieObj.watch;
			}
		} else {
			localMovieData.push(movieObj);
		}

		//Finally, save the data to local storage
		localStorage.setItem(LOCAL_STORAGE_NAME, JSON.stringify(localMovieData));
	};

	//DELETE MOVIE - remove movie by movieId	=	=	=
	this.deleteMovie = function (movieId) {
		//Get the local movie data
		var localMovieData = loadMovieData();
		//find the id in the array
		var index = localMovieData.findIndex(function (element) {
			element.id = movieObj.id;
		});
		if (index > 0) {
			localMovieData.splice(index, 1);
			localStorage.setItem(LOCAL_STORAGE_NAME, JSON.stringify(localMovieData));
		}
	};

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

    var url = 'http://www.omdbapi.com/?s=' + title + '&page=1';
    $http.get(url).success(function (response) {
      var searchResults = response.Search;
      deferred.resolve(searchResults);
    });
    return deferred.promise;
  };

  //Get specific details for a single movie
  this.getMovieDetails = function (id) {
    var deferred = $q.defer();

    var url = "http://www.omdbapi.com/?i=" + id + "&plot=full&r=json&tomatoes=true";

    $http.get(url).success(function (response) {
      deferred.resolve(response);
    });
    return deferred.promise;
  };
});
'use strict';

angular.module('movieShelf').directive('movieCover', function (localStorageService) {

	var coverController = ['$scope', 'localStorageService', function ($scope, localStorageService) {
		//Add a film to the Owned_Movies array
		$scope.addMovieToOwned = function (id) {
			var movie = {
				id: id,
				own: true
			};
			localStorageService.saveMovie(movie);
		};

		//Add a film to the To_Watch_Movies array 
		$scope.addMovieToWatch = function (id) {
			var movie = {
				id: id,
				watch: true
			};
			localStorageService.saveMovie(movie);
		};
	}];

	return {
		restrict: "E",
		templateUrl: './directives/coverDir.html',
		scope: {
			movie: '='
		},
		controller: coverController
	};
});
//# sourceMappingURL=bundle.js.map
