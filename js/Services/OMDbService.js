angular.module('movieShelf').service('omdbService', function($http, $q){
  
    //Acquire results for a movie search
    this.searchForMovie = function(title) {
      var deferred = $q.defer();

      var url = 'https://www.omdbapi.com/?s=' + title +'&page=1';
      $http.get(url)
        .success(function(response) {
          var searchResults = response.Search;
          deferred.resolve(searchResults);
        })
        return deferred.promise;
    } 

    //Get specific details for a single movie
    this.getMovieDetails = function(id) {
      var deferred = $q.defer();

      var url = "https://www.omdbapi.com/?i=" + id + "&plot=full&r=json&tomatoes=true";

      $http.get(url)
        .success(function(response) {
          deferred.resolve(response);
        })
        return deferred.promise;
    }
});