app.controller('AuthController', function($scope, $http, $location) {
  const BASE_URL = 'http://localhost:8080/api/auth';
  $scope.loginData = {};
  $scope.signupData = { role: { id: 1 } };

  $scope.login = function(roleId) {
    const payload = {
      phone: $scope.loginData.phone,
      password: $scope.loginData.password,
      roleId: roleId.toString()
    };

    $http.post(`${BASE_URL}/login`, payload)
      .then(function(response) {
        const user = response.data;
        sessionStorage.setItem("user", JSON.stringify(user));

        const id = user.role.id;
        if (id === 1) $location.path('/citizen');
        else if (id === 2) $location.path('/staff');
        else if (id === 3) $location.path('/admin');
      })
      .catch(function(error) {
        $scope.loginError = error.data?.message || "Invalid credentials or role.";
      });
  };

  $scope.signup = function() {
    $http.post(`${BASE_URL}/signup`, $scope.signupData)
      .then(() => {
        alert("Signup successful! Please login.");
        $location.path('/login');
      })
      .catch(error => {
        $scope.signupError = error.data?.message || "Signup failed. Try again.";
      });
  };
  $scope.goToSignup = function(type) {
  if (type === 'citizen') window.location = "#!/signup-citizen";
  else if (type === 'staff') window.location = "#!/signup-staff";
  else if (type === 'admin') window.location = "#!/signup-admin";
};

});
