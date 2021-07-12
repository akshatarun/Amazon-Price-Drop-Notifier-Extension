let amazonextension = angular.module("amazonextension", ['ui.router']).config([
  '$stateProvider',
  '$urlRouterProvider',
  function($stateProvider, $urlRouterProvider) {
  
    $stateProvider
      .state('home', {
        url: '/home',
        templateUrl: '/home.html',
        //controller: 'MainCtrl'
      }).state('login', {
          url: '/login',
          templateUrl: '/login.html',
          controller: 'LoginController'
        }).state('signup', {
          url: '/signup',
          templateUrl: '/signup.html',
          controller: 'SignupController'
        });
  
    $urlRouterProvider.otherwise('login');
  }
]);

amazonextension.controller('LoginController', function($scope){
  $scope.username="";
  $scope.password="";
  $scope.login = function(){
    console.log("login's console",$scope.username,$scope.password);
  }
});

amazonextension.controller('SignupController', function($scope){
  $scope.username="";
  $scope.password="";
  $scope.signup = function(){
    console.log("signup's console",$scope.username,$scope.password);
  }
});