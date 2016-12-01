angular.module("movieShelf").directive("movieCover", function() {
	return {
		restrict: "E",
		templateUrl: './components/resultItem.html', 
		scope: {
			movies: "="
		}
	}
})