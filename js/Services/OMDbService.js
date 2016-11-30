angular.module('movieShelf').service('omdbService', function($http, $q){
  
    this.searchForMovie = function(title) {
      var deferred = $q.defer();

      var url = 'http://www.omdbapi.com/?s=' + title +'&page=1';
      $http.get(url)
        .success(function(response) {
          var searchResults = response.Search;
          deferred.resolve(searchResults);
        })
        return deferred.promise;
    }

});