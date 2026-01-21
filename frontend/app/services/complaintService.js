app.factory('ComplaintService', function($http) {
  const API_URL = 'http://localhost:8080/api/complaints';
  return {
    getAll: () => $http.get(API_URL),
    getByUser: (userId) => $http.get(`${API_URL}?userId=${userId}`),
    add: (complaint) => $http.post(API_URL, complaint),
    upvote: (id) => $http.put(`${API_URL}/${id}/upvote`),
    updateStatus: (id, status) => $http.put(`${API_URL}/${id}/status?status=${status}`),
    assignToStaff: (complaintId, staffId) =>
        $http.put(`${API_URL}/${complaintId}/assign/${staffId}`)
  };
});
