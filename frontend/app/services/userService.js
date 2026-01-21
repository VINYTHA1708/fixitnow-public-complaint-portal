angular.module('fixitnowApp')
  .factory('UserService', function($http) {
    const API_URL = 'http://localhost:8080/api/users';

    return {
      getAll: () => $http.get(API_URL)
    };
  });
