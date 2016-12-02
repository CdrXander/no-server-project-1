angular.module('movieShelf').directive('movieCover', function(){
	
	var coverController = ['$scope', function($scope, localStorageService) {
		//Add a film to the Owned_Movies array
		$scope.addMovieToOwned = function(id, watch) {
			var movie = {
				id:id,
				own:true,
			}
			localStorageService.saveMovie(movie);
		}

		//Add a film to the To_Watch_Movies array 
		$scope.addMovieToWatch = function(id, own) {
			var movie = {
				id:id,
				watch:true
			}
			localStorageService.saveMovie(movie);
		}
	
	}]

	return {
		restrict: "E",
		templateUrl: './directives/coverDir.html',
		scope: {
			movie: '='
		},
		controller: coverController
	}
})