app.controller('ComplaintController', function($scope, $http, $location, ComplaintService) {
  $scope.currentUser = JSON.parse(sessionStorage.getItem("user"));
  if (!$scope.currentUser) {
    $location.path('/login');
    return;
  }

  $scope.complaints = [];
  $scope.myComplaints = [];
  $scope.newComplaint = { user: { id: $scope.currentUser.id }, category: 'OTHER' };

  function loadAllComplaints() {
    ComplaintService.getAll()
      .then(res => {
        $scope.complaints = res.data;
        console.log("All complaints:", res.data);
      })
      .catch(err => console.error("Error loading complaints:", err));
  }

  function loadMyComplaints() {
    $http.get(`http://localhost:8080/api/complaints/user/${$scope.currentUser.id}`)
      .then(res => {
        $scope.myComplaints = res.data;
        console.log("My complaints:", res.data);
      })
      .catch(err => console.error("Error loading my complaints:", err));
  }

  $scope.addComplaint = function() {
    ComplaintService.add($scope.newComplaint)
      .then(() => {
        alert("Complaint submitted successfully!");
        $scope.newComplaint.title = '';
        $scope.newComplaint.description = '';
        loadAllComplaints();
        loadMyComplaints();
      })
      .catch(err => {
        console.error("Error submitting complaint:", err);
        alert("Error submitting complaint!");
      });
  };

  $scope.upvote = function(id) {
    ComplaintService.upvote(id)
      .then(() => {
        loadAllComplaints();
        loadMyComplaints();
      })
      .catch(err => console.error("Error upvoting:", err));
  };

  $scope.logout = function() {
    sessionStorage.clear();
    $location.path('/login');
  };

  loadAllComplaints();
  loadMyComplaints();
});
