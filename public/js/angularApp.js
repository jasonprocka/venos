var app = angular.module('mango',['ngRoute']);
//Routes
app.config(function($routeProvider) {
  $routeProvider
  .when("/", {
    templateUrl : "/www/html/main.html"
  })
  .when("/create-hub", {
    templateUrl : "/www/html/create-hub.html"
  })
  .when("/register", {
    templateUrl : "/www/html/register.html"
  })
  .when("/hubs", {
    templateUrl : "/www/html/hub.html"
  });
});

app.controller('AuthCtrl', [
        '$scope',
        function($scope) {
            $scope.loginUser = function() {
                firebase.auth().signInWithEmailAndPassword($scope.email, $scope.password).catch(function(error) {
                    // Handle Errors here.
                    if(error.code) {
                        console.log(error.code);
                        console.log(error.message);
                    }
                });

            };
            $scope.signOutUser = function() {
                firebase.auth().signOut().then(function() {
                      console.log('Signed Out');
                }, function(error) {
                      console.error('Sign Out Error', error);
                });

            };

            $scope.addUser = function() {
                firebase.auth().createUserWithEmailAndPassword($scope.email, $scope.password).catch(function(error) {
                    if(error) {
                        var errorCode = error.code;
                        var errorMessage = error.message;
                        console.log(errorMessage);
                        console.log(errorCode);
                        console.log("error!!!");
                        return;
                    }
                });
                var user = firebase.auth().currentUser;
                console.log("User Created");
                firebase.database().ref('users/' + user.uid).set({
                    uuid: user.uid,
                    username: $scope.username,
                });

            };
        }]);

app.controller('HubCtrl', [
    '$scope',
    function($scope) {
        $scope.createHub = function() {
        };
    }]);
app.controller('HomeCtrl', [
    '$scope',
    function($scope) {
        $scope.createHub = function() {
        $scope.username = firebase.auth().currentUser.uid;
        };
    }]);