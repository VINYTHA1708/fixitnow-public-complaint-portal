var app = angular.module('fixitnowApp', ['ngRoute']);

app.config(function($routeProvider, $locationProvider) {
  $routeProvider
    .when('/', { 
      templateUrl: 'views/home.html' 
    })

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
    .when("/signup-choice", {
  templateUrl: "views/signup-choice.html",
  controller: "AuthController"
})
.when("/signup-citizen", {
  templateUrl: "views/signup-citizen.html",
  controller: "AuthController"
})
.when("/signup-staff", {
  templateUrl: "views/signup-staff.html",
  controller: "AuthController"
})
.when("/signup-admin", {
  templateUrl: "views/signup-admin.html",
  controller: "AuthController"
})

.when("/login-citizen", {
  templateUrl: "views/login-citizen.html"
})
.when("/login-staff", {
  templateUrl: "views/login-staff.html"
})
.when("/login-admin", {
  templateUrl: "views/login-admin.html"
})



    .otherwise({ redirectTo: '/' });

  $locationProvider.hashPrefix('!');
});
