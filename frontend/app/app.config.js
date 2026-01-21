angular.module('fixitnowApp')
.config(function($routeProvider, $locationProvider) {
  $routeProvider
    .when('/login', {
      templateUrl: 'views/login.html',
      controller: 'UserController'
    })
    .when('/signup', {
      templateUrl: 'views/signup.html',
      controller: 'UserController'
    })
    .when('/citizen', {
      templateUrl: 'views/citizen.html',
      controller: 'ComplaintController'
    })
    .when('/staff', {
      templateUrl: 'views/staff.html',
      controller: 'ComplaintController'
    })
    .when('/admin', {
      templateUrl: 'views/admin.html',
      controller: 'ComplaintController'
    })
    .otherwise({
      redirectTo: '/login'
    });

  $locationProvider.hashPrefix('');
});
