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

angular.module('movieShelf').controller('shelfCtrl', function ($scope) {
	$scope.test = "Test Shelf Ctrl";
});
'use strict';

angular.module('movieShelf').service('localStorageService.js', function () {});
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
