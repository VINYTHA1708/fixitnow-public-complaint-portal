var app = angular.module('fixitnowApp', ['ngRoute']);

app.config(function($routeProvider) {
  $routeProvider
    .when('/login', {
      templateUrl: 'views/login.html',
      controller: 'AuthController'
    })
    .when('/signup', {
      templateUrl: 'views/signup.html',
      controller: 'AuthController'
    })
    .when('/citizen', {
      templateUrl: 'views/citizen.html',
      controller: 'ComplaintController'
    })
    .when('/staff', {
      templateUrl: 'views/staff.html',
      controller: 'StaffController'
    })
    .when('/admin', {
      templateUrl: 'views/admin.html',
      controller: 'AdminController'
    })
    .otherwise({ redirectTo: '/login' });
});
