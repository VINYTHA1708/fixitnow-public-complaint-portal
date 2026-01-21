angular.module('fixitnowApp')
.controller('UserController', function($scope, $http, $location) {

  $scope.user = {}; 

  $scope.register = function() {
    $http.post('http://localhost:8080/api/auth/signup', $scope.user)
      .then(function(response) {
        alert('Signup successful! Please login.');
        $location.path('/login'); 
      })
      .catch(function(error) {
        console.error(error);
        alert('Signup failed: ' + (error.data?.message || 'Unknown error'));
      });
  };

  $scope.login = function() {
    $http.post('http://localhost:8080/api/auth/login', $scope.user)
      .then(function(response) {
        const loggedInUser = response.data;
        sessionStorage.setItem('user', JSON.stringify(loggedInUser)); 
        const roleId = loggedInUser.role?.id || loggedInUser.roleId;
        console.log('Logged in user roleId:', roleId);

        if (roleId === 1) {
          $location.path('/citizen');
        } else if (roleId === 2) {
          $location.path('/staff');
        } else if (roleId === 3) {
          $location.path('/admin');
        } else {
          alert('Unknown role ID: ' + roleId);
        }
      })
      .catch(function(error) {
        console.error(error);
        alert('Invalid email or password!');
      });
  };

  $scope.logout = function() {
    sessionStorage.removeItem('user');
    $location.path('/login');
  };
});
