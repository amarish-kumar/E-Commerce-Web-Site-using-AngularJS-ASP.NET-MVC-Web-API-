appConnexion.controller('loginController', ['$scope', '$location', 'DataService', function ($scope, $location, DataService) {
    $scope.GoLogin = function(login, mp)
    {
        //assure la navigation angular
        DataService.userExist(login, mp).then(function (response) {
              switch (response.data){
                        case "A": {
                            window.location = "/Home/Admin?login="+ login;
                             break;
                        }
                        case "U": {
                            window.location = "/Home/Consumer?login=" + login;
                             break;
                        }
                        default:{
                            alert("User not exist");
                        }
                   } 
        });
    }
}]);
appConnexion.controller('signupController', ['$scope', '$location', 'DataService', function ($scope, $location, DataService) {
    $scope.GoSingup = function(login, mp)
     {
        //assure la navigation angular
        //.then(function (response) { alert(response.data); })
        DataService.insertUser(login, mp).then(function (response) { alert(response.data); });
        //$location.path("/signup");
     }
}]);
 