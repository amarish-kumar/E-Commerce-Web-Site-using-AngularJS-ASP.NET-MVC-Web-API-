appConsumer.factory('DataServiceC', ['$http', function ($http) {
    var ProductsList = function () {
        return $http.get("api/Services/ProductsList");
    }
    var CommandsList = function (loginUser) {
        var parameters = {
            loginUser: loginUser
        };
        var config = {
            params: parameters
        };
        return $http.get("api/Services/CommandsList", config);
    }

    var insertCommand = function (shoppingcart) {
        var parameters = {
            shoppingcart: shoppingcart,
        };
        var config = {
            params: parameters
        };
        return $http.get("api/Services/insertCommand", config);
    }
    return {
        ProductsList: ProductsList,
        CommandsList: CommandsList,
        insertCommand: insertCommand,
    }
}]);