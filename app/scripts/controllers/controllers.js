'use strict';

angular.module('repoApp.controllers', [])
  .controller('HomeController', ['$scope',
    function($scope) {

    }
  ])
  .controller('AppController', ['$scope',
    function($scope) {

    }
  ])
  .controller('LoginController', function($scope, $http, authService) {
      $scope.submit = function() {
      $http.defaults.headers.common.username = $scope.username
      $http.defaults.headers.common.password = $scope.password
        $http.post('http://localhost:1337/api/auth').success(function(response) {
          $scope.token = response.token;
          delete $scope.password;
          authService.loginConfirmed();
          console.log(response);
      });
}
});
