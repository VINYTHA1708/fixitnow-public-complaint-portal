app.factory('AuthService', function($http) {
  const BASE_URL = 'http://localhost:8080/api/auth';

  return {
    login: (data) => $http.post(`${BASE_URL}/login`, data),
    signup: (data) => $http.post(`${BASE_URL}/signup`, data)
  };
});
