angular.module('movieShelf')
.controller('detailCtrl', function($scope, $stateParams, omdbService) {

	omdbService.getMovieDetails($stateParams.id).then(function(serviceData) {
		$scope.movie = serviceData;
		console.log($scope.movie);
	});

})