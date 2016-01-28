 
appConsumer.controller('ConsumerController', ['$scope', '$rootScope', '$http', '$location', 'DataServiceC', function ($scope, $rootScope, $http, $location, DataServiceC) {
    $scope.term = '';
    getProducts();
     function getProducts() {
         DataServiceC.ProductsList().then(function (response) {
             $scope.productList = response.data;
         });
        //redirection
     }
     getCommands();
     function getCommands() {
         DataServiceC.CommandsList("UserIsLoggged").then(function (response) {
             $scope.commandList = response.data;
        });
        //redirection
    }  
     insertCommand();
     function insertCommand() {
        $scope.insertCommand = function () {
            DataServiceC.insertCommand($rootScope.Cart).then(function (response) {
                alert("Command successfully  saved");
                initializeCart(true);
            });
        }  
     }
    //product section
     $scope.stateFormShow = false;
     $scope.bindProductDetails = function (elem) {
         $scope.stateFormShow = true;
         $scope.master = angular.copy(elem);
     }
    //end Product section
    //Cart Section

     function initializeCart(empty) {
         $scope.CartIsNotEmpty = false;
         if (angular.isUndefined($rootScope.Cart) || empty == true) {
             $rootScope.Cart = {};
             $rootScope.CartList = new Array();
         }
         if ($rootScope.CartList.length > 0) {
             $scope.CartIsNotEmpty = true;
         }
     }
     initializeCart(false);
 
     $scope.AddToCart = function () {
         if (angular.isUndefined($scope.Cart[$scope.master.idProduct])  ) {
             $rootScope.Cart[$scope.master.idProduct] = 1;
             $rootScope.CartList.push(angular.copy($scope.master));
         }else{
             $rootScope.Cart[$scope.master.idProduct]++;
         }
     }
     $scope.RemoveFromCart = function (elem) {
         delete $rootScope.Cart[elem.idProduct];
         var i = 0; 
         angular.forEach($rootScope.CartList, function (item) {
             if (item.idProduct == elem.idProduct) {              
                 $rootScope.CartList.splice(i,1);
                 return;
             }
             i++;
         });
     }
    //End Cart section
}]);
appConsumer.filter('fetch', function () {
    return function (items, term) {
        term = term.toUpperCase();
        if (term.length > 0) {
            var filteredInput = [];
            angular.forEach(items, function (item) {
                if (item.nameProduct.toUpperCase().search(term) != -1) {
                    filteredInput.push(item);
                }
            });
            // conditional based on optional argument
            return filteredInput;
        } else {
            return items;
        }
    };
});