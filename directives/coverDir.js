angular.module('movieShelf').directive('movieDisplay', function(){
	
	var coverController = ['$scope', 'localStorageService', function($scope, localStorageService) {
		//Add a film to the Owned_Movies array
		$scope.addMovieToOwned = function(id, own) {
			own = !!own;		//To deal w/ undefined on initial load
			var movie = {
				id:id,
				own:!own
			}
			localStorageService.saveMovie(movie);
		}

		//Add a film to the To_Watch_Movies array 
		$scope.addMovieToWatch = function(id, watch) {
			watch = !!watch;	//To deal w/ undefined on initial load
			var movie = {
				id:id,
				watch:!watch
			}
			localStorageService.saveMovie(movie);
		}
	
	}]

	return {
		restrict: "E",
		templateUrl: './directives/coverDir.html',
		scope: {
			movies: '='
		},
		controller: coverController
	}
})