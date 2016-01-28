var app = angular.module("app", []);
function Person(id, img, name, age) {
    this.id = id;
    this.img = img;
    this.name = name;
    this.age = age;
}

app.controller("myController", function ($scope) {
    $scope.showContent = true;
    
    var arrays = new Array();
    arrays[0] = new Person(0, "/Content/images/nature1.jpeg", "AB", 25);
    arrays[1] = new Person(1, "/Content/images/nature2.jpeg", "CD", 25);
    arrays[2] = new Person(2, "/Content/images/nature1.jpeg", "EE", 25);
    arrays[3] = new Person(3, "/Content/images/nature2.jpeg", "FF", 25);
    $scope.items = arrays;
    $scope.Listitems = angular.copy($scope.items);
    $scope.Save = function () {
        alert(JSON.stringify($scope.Listitems));
    }
    $scope.term = '';
   
    $scope.stateFormShow = false;
    $scope.stateIsUpdate = false;
    $scope.bindUserDetails = function (user) {
        $scope.stateFormShow = true;
        $scope.stateIsUpdate = true;
        $scope.master = angular.copy(user);
     
    };
    $scope.showFormAddUser = function () {
        $scope.master = null;
        $scope.stateFormShow = true;
        $scope.stateIsUpdate = false;
       
    };
    $scope.updateUser = function (user) {
         if ($scope.stateIsUpdate == false) {
             user.id = $scope.items.length;
             user.img = "/Content/images/nature2.jpeg"
            $scope.items[$scope.items.length] = angular.copy(user);
        } else {
            $scope.items[user.id] = angular.copy(user);
        } 
    };
    $scope.deleteUser = function (id) {
        for (var i = id; i < $scope.items.length - 1; i++) {
            $scope.items[i + 1].id = i;
            $scope.items[i] = $scope.items[i+1];
        }
        $scope.items.splice( $scope.items.length-1, 1);
    };
});
app.filter('fetch', function () {
    return function (items, term) {
        term = term.toUpperCase();
        if (term.length > 0) {
            var out = new Array();
            var cp = 0;
            for (var i = 0; i < items.length; i++) {
                if (items[i].name.toUpperCase().search(term) != -1) {
                    out[cp++] = items[i];
                }
            }
            // conditional based on optional argument

            return out;
        } else {
            return items;
        }
    };
});
 