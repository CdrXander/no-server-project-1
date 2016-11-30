/*
*
*/
angular.module('movieShelf', ['ui.router']).config(function($stateProvider, $urlRouterProvider) {
	

	$stateProvider
		.state('home', {
			url: '/',
			templateUrl: './views/shelf.html',
			controller: 'shelfCtrl'
		})
		.state('search', {
			url: '/search',
			templateUrl: './views/search.html',
			controller: 'searchCtrl'
		})
		.state('details', {
			url: '/details',
			templateUrl: './views/detail.html'
		})

});
