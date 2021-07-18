chrome.runtime.sendMessage({
  destination: 'open popup'
}, (response) => {
  if(response.status === 'logged in') {
      window.location.href = '#!/home'
  } else {
      window.location.href = '#!/login'
  }
});

let amazonextension = angular.module("amazonextension", ['ui.router']).config([
  '$stateProvider',
  '$urlRouterProvider',
  function($stateProvider, $urlRouterProvider) {
  
    $stateProvider
      .state('home', {
        url: '/home',
        templateUrl: '../html/home.html',
        controller: 'HomeController'
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
  $scope.email="";
  $scope.password="";
  $scope.message = "";
  $scope.login = function(){
    chrome.runtime.sendMessage({destination: "login", email: $scope.email, password: $scope.password}, (resp) => {
      if(resp.status==='success'){
        //chrome.storage.local.get('token',(result)=>console.log("everything is working properly and token is "+result.token));
        $scope.email="";
        $scope.password="";
        window.location.href="#!/home"
      } else {
        $scope.message = 'Error: Could not log in\nPlease check your credentials'
    }
    $scope.$apply();
    });
  }
});

amazonextension.controller('SignupController', function($scope){
  $scope.username="";
  $scope.email="";
  $scope.password="";
  $scope.message="";
  $scope.signup = function(){
    $scope.message = "";
    //console.log("signup's console",$scope.username, $scope.email, $scope.password);
    chrome.runtime.sendMessage({destination: "signup", username: $scope.username, email: $scope.email, password: $scope.password}, (resp) => {
      if(resp.status==='success'){
        $scope.username="";
        $scope.email="";
        $scope.password="";
        window.location.href="#!/login"
      } else if(resp.action === 'Retry') {
        $scope.message = ('Encountered an error. Please try again later')
    } else if(resp.action === 'Redirect Login') {
        $scope.message = ('This email is already registered with a user')
    } else if(resp.errors) {
        $scope.message = 'Please enter valid credentials\n';
    } else {
        $scope.message = ('Please try again')
    }

    $scope.$apply();
    });
  }
  
});

amazonextension.controller('HomeController', function($scope){
  $scope.fetching = false;
    $scope.itemList = [];
    $scope.message = "";
    $scope.showTracked = function() {
        chrome.runtime.sendMessage({
            destination: 'show tracked'
        }, function(response) {
          if(response.status === 'success') {
            $scope.itemList = response.itemList;
            $scope.message = '';
        } else {
            $scope.message = 'Encountered an error. \n Please try again later';
        };

        $scope.$apply();
        })
    };

    $scope.openWebPage = function(url) {
      chrome.tabs.create({url:"https://"+url});
      return false;
    }
    
    $scope.trackItem = () => {
      $scope.itemList = [];
        chrome.runtime.sendMessage({
            destination: 'track current'
        }, (response) => {
            if(response.status === 'success') {
                $scope.message = "Successfully Added Item"
            } else {
                if(response.action === 'Change Page') {
                  $scope.message = "This doesn't seem to be a valid item page"
              } else {
                  $scope.message = 'Encountered an error \n Please try again later'
              }
            }
            $scope.$apply();
        })
    }

    $scope.logout = () => {
      chrome.runtime.sendMessage({
          destination: 'logout'
      }, () => {
          window.location.href = '#!/login'
      })
    }

})