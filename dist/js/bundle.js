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

angular.module('movieShelf').controller('searchCtrl', function ($scope, omdbService) {
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
	var loadMovieData = function () {
		$scope.ownedMovies = [];
		$scope.watchMovies = [];

		var savedMovies = localStorageService.getSavedMovies();
		for (var i = 0; i < savedMovies.length; i++) {
			mergeData(savedMovies[i]);
		}
	}();

	//Add a film to the Owned_Movies array
	$scope.addMovieToOwned = function (id, watch) {
		var movie = {
			id: id,
			own: true,
			watch: watch
		};

		$scope.savedMovies.push(movie);
	};

	//Add a film to the To_Watch_Movies array 
	$scope.addMovieToWatch = function (id, own) {
		var movie = {
			id: id,
			own: own,
			watch: true
		};

		$scope.savedMovies.push(movie);
	};
});
'use strict';

angular.module('movieShelf').service('localStorageService', function (omdbService) {

	var testData = [{ id: 'tt0080684', own: true, watch: false }, { id: 'tt0848228', own: true, watch: false }, { id: 'tt1663662', own: true, watch: true }, { id: 'tt1675434', own: true, watch: true }, { id: 'tt0360717', own: false, watch: true }, { id: 'tt0108052', own: false, watch: true }];

	//Public end point
	this.getSavedMovies = function () {
		// return combineMovies();
		return loadMovieData();
	};

	//Get saved data from local storage. For now, return dummy data
	var loadMovieData = function loadMovieData() {
		return testData;
	};

	//Go through all the local data, extending each one with obdb data
	var combineMovies = function combineMovies() {
		var localMovies = loadMovieData();
		var combinedMovieData = [];
		for (var i = 0; i < localMovies.length; i++) {
			combinedMovieData.push(mergeData(localMovies[i]));
		}
		return combinedMovieData;
	};

	//This function gets the extended data for a local movie, combines it
	// with the local data, and returns the combined object
	var mergeData = function mergeData(localMovie) {
		omdbService.getMovieDetails(localMovie.id).then(function (omdbMovie) {
			var fullMovie = {};
			jQuery.extend(fullMovie, localMovie, omdbMovie);
			return fullMovie;
		});
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
//# sourceMappingURL=bundle.js.map
