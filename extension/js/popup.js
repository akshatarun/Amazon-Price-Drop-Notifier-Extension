let amazonextension = angular.module("amazonextension", ['ui.router']).config([
  '$stateProvider',
  '$urlRouterProvider',
  function($stateProvider, $urlRouterProvider) {
  
    $stateProvider
      .state('home', {
        url: '/home',
        templateUrl: '../html/home.html',
        //controller: 'MainCtrl'
      }).state('login', {
          url: '/login',
          templateUrl: '../html/login.html',
          controller: 'LoginController'
        }).state('signup', {
          url: '/signup',
          templateUrl: '../html/signup.html',
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
    chrome.runtime.sendMessage({form: "login", username: $scope.username, password: $scope.password}, (resp) => {
      console.log("Consoled login's credentials in background.js");
    });
    $scope.username="";
    $scope.password="";
  }
});

amazonextension.controller('SignupController', function($scope){
  $scope.username="";
  $scope.password="";
  $scope.signup = function(){
    console.log("signup's console",$scope.username,$scope.password);
    chrome.runtime.sendMessage({form: "signup", username: $scope.username, password: $scope.password}, (resp) => {
      console.log("Consoled signup's credentials in background.js");
    });
    $scope.username="";
    $scope.password="";
  }
  
});