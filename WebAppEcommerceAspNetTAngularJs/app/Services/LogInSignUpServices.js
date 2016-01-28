appConnexion.factory('DataService', ['$http', function ($http) {

    var userExist = function (loginUser, mp) {

        var parameters = {
            loginUser: loginUser,
            mp : mp
        };
        var config = {
            params: parameters
        };
        return $http.get("api/Services/userExist", config);
    }
    var insertUser = function (loginUser, mpUser) {
     
        var parameters = {
            loginUser: loginUser,
            mpUser: mpUser,
        };
        var config = {
            params: parameters
        };
        return $http.get("api/Services/insertUser", config);
    }
    return {
        userExist: userExist,
        insertUser: insertUser
    }
}]);