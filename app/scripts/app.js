// Declare app level module which depends on filters, and services
angular.module('repoApp', [
  'ngRoute',
  'http-auth-interceptor',
  'repoApp.filters',
  'repoApp.directives',
  'repoApp.controllers'
]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/', {templateUrl: 'partials/home.html', controller: 'HomeController'});
  $routeProvider.when('/login', {templateUrl: 'partials/login.html', controller: 'LoginController'});
  $routeProvider.otherwise({redirectTo: '/'});
}]);
