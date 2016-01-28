appAdmin.controller('AdminController', ['$scope', '$route', '$routeParams', '$location', 'DataServiceA', function ($scope, $route, $routeParams, $location, DataServiceA) {
    $scope.term = '';
    $scope.selectedState = "Processing";
    $scope.data = {
        availableOptions: [
          { id: 'Received', name: 'Received' },
          { id: 'Processing', name: 'Processing' },
          { id: 'Finish', name: 'Finish' }
        ]};
        getProducts();
        function getProducts() {
            DataServiceA.ProductsList().then(function (response) {
                $scope.productList = response.data;
            });
        }
        getCommands();
        function getCommands() {
            DataServiceA.CommandsList().then(function (response) {

                $scope.commandList = response.data;
            });
        }
        $scope.updateCommand = function (commandId, status) {
           
            DataServiceA.updateCommand(commandId, status).then(function (response) {
                alert("Change is saved");
            }); 
        }
        function insertProduct(ProductName, ProductDescription, ProductPrice) {
            var file = $('#myFile')[0].files[0];
            var fd = new FormData();
            fd.append("file", file);
            fd.append("ProductName", ProductName);
            fd.append("ProductDescription", ProductDescription);
            fd.append("ProductPrice", ProductPrice);
            DataServiceA.insertProduct(fd).then(function (response) {
                getProducts();
                alert("Product is inserted");
                });
            }
        function updateProduct(productKey, ProductName, ProductDescription, ProductPrice) {
            var file = $('#myFile')[0].files[0];
            var fd = new FormData();
            fd.append("file", file);
            fd.append("productKey", productKey);
            fd.append("ProductName", ProductName);
            fd.append("ProductDescription", ProductDescription);
            fd.append("ProductPrice", ProductPrice);
            alert(productKey);
            DataServiceA.updateProduct(fd).then(function (response) {
                getProducts();
               alert("Changes are done");
           });
        }
     
    //product section
         $scope.stateFormShow = false;
         $scope.stateIsUpdate = false;
         $scope.showFormAddProduct = function () {
             $scope.master = null;
             $scope.stateFormShow = true;
             $scope.stateIsUpdate = false;
         };
        $scope.bindProductDetails = function (elem) {
        $scope.stateFormShow = true;
        $scope.stateIsUpdate = true;
        $scope.master = angular.copy(elem); 

    }
    //end Product section
    $scope.saveP = function () {    
        if ($scope.stateIsUpdate == false) {
            insertProduct($scope.master.nameProduct, $scope.master.descriptionProduct, $scope.master.price);
        } else {
            updateProduct($scope.master.idProduct, $scope.master.nameProduct, $scope.master.descriptionProduct, $scope.master.price);
        }
    };
 
}]);
//create filter by product name
appAdmin.filter('fetch', function () {
    return function (items, term) {
        term = term.toUpperCase();
        if (term.length > 0) {
            var filteredInput = [];
            angular.forEach(items, function (item) {
                if (item.nameProduct.toUpperCase().search(term) != -1) {
                    filteredInput.push(item);
                }
            });
             return filteredInput;
        } else {
            return items;
        }
    };
}); 