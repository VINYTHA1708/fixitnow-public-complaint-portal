angular.module('fixitnowApp')
  .controller('StaffController', function($scope, $http, $location) {
    const API_COMPLAINTS = 'http://localhost:8080/api/complaints';

    const storedUser = JSON.parse(sessionStorage.getItem("user"));
    if (!storedUser) {
      alert("Please login first!");
      $location.path('/login');
      return;
    }

    $scope.staff = storedUser;
    $scope.assignedComplaints = [];

    $scope.loadAssignedComplaints = function() {
      $http.get(`${API_COMPLAINTS}/staff/${$scope.staff.id}`)
        .then(function(response) {
          $scope.assignedComplaints = response.data;
          console.log("Assigned complaints:", response.data);
        })
        .catch(function(err) {
          console.error("Failed to load complaints:", err);
        });
    };

    $scope.updateStatus = function(complaintId, newStatus) {
      if (!newStatus) {
        alert("Please select a status!");
        return;
      }

      $http.put(`${API_COMPLAINTS}/${complaintId}/status?status=${newStatus}`)
        .then(function(response) {
          alert("Status updated!");
          $scope.loadAssignedComplaints();
        })
        .catch(function(err) {
          console.error("Failed to update status:", err);
          alert("Error updating complaint!");
        });
    };

    $scope.logout = function() {
      sessionStorage.clear();
      $location.path('/login');
    };

    $scope.loadAssignedComplaints();
  });
