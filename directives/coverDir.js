angular.module('movieShelf').directive('movieDisplay', function(){
	
	var coverController = ['$scope', 'localStorageService', function($scope, localStorageService) {
		//Add a film to the Owned_Movies array
		$scope.addMovieToOwned = function(movie) {
			var localMovie = {
				imdbID:movie.imdbID,
				Title:movie.Title,
				Poster:movie.Poster,
				Year:movie.Year,
				own:!!!movie.own,
				watch:!!movie.watch
			}
			localStorageService.saveMovie(localMovie);
			$scope.reload();
		}

		//Add a film to the To_Watch_Movies array 
		$scope.addMovieToWatch = function(movie) {
			var localMovie = {
				imdbID:movie.imdbID,
				Title:movie.Title,
				Poster:movie.Poster,
				Year:movie.Year,
				own:!!movie.own,
				watch:!!!movie.watch
			}
			localStorageService.saveMovie(localMovie);
			$scope.reload();
		
		}

	
	}]

	return {
		restrict: "E",
		templateUrl: './directives/coverDir.html',
		scope: {
			movies: '=',
			reload: '&'
		},
		controller: coverController
	}
})