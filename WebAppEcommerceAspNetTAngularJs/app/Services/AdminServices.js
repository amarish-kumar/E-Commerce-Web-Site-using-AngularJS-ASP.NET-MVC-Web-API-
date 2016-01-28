appAdmin.factory('DataServiceA', ['$http', function ($http) {

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

    var updateCommand = function (commandId, status) {

        var parameters = {
            commandId: commandId,
            status: status
        };
        var config = {
            params: parameters
        };
        return $http.get("api/Services/updateCommand", config);
    }

    var insertProduct = function (fd) {

        return $http.post("api/Services/insertProduct", fd, {
            transformRequest: angular.identity,
            headers: { 'Content-Type': undefined }
        });
    }
    var updateProduct = function (fd) {

        return $http.post("api/Services/updateProduct", fd, {
            transformRequest: angular.identity,
            headers: { 'Content-Type': undefined }
        });

    }
    return {
        ProductsList: ProductsList,
        CommandsList: CommandsList,
        insertProduct: insertProduct,
        updateProduct: updateProduct,
        updateCommand: updateCommand,
    }
}]); 