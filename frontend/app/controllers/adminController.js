angular.module('fixitnowApp')
  .controller('AdminController', function($scope, $http, $window, $location) {
    const API_COMPLAINTS = 'http://localhost:8080/api/complaints';
    const API_USERS = 'http://localhost:8080/api/users';

    $scope.currentUser = JSON.parse(sessionStorage.getItem("user"));
    if (!$scope.currentUser) {
      alert("Please login first!");
      $location.path('/login');
      return;
    }

    $scope.complaints = [];
    $scope.staffList = [];

    $scope.logout = function() {
      sessionStorage.clear();
      $location.path('/login');
    };

    $scope.loadComplaints = function() {
      $http.get(API_COMPLAINTS)
        .then(function(response) {
          console.log("Complaints loaded:", response.data);
          $scope.complaints = response.data;
        })
        .catch(function(err) {
          console.error("Failed to load complaints:", err);
        });
    };

    $scope.loadStaff = function() {
      $http.get(API_USERS)
        .then(function(response) {
          console.log("Users from backend:", response.data);
          $scope.staffList = response.data.filter(u => u.role && u.role.id === 2);
          console.log("Filtered staff (role.id === 2):", $scope.staffList);
        })
        .catch(function(err) {
          console.error("Failed to load staff:", err);
        });
    };

    $scope.assignComplaint = function(complaintId, staffId) {
      if (!staffId) {
        alert("Please select a staff member first!");
        return;
      }

      $http.put(`${API_COMPLAINTS}/${complaintId}/assign/${staffId}`)
        .then(function(response) {
          console.log("Assign Response:", response.data);
          alert(response.data.message);
          $scope.loadComplaints();
        })
        .catch(function(err) {
          console.error("FULL ERROR:", err);
          alert("⚠️ Assignment failed: " + (err.data || err.statusText || "Unknown error"));
        });
    };

    $scope.loadComplaints();
    $scope.loadStaff();
  });
