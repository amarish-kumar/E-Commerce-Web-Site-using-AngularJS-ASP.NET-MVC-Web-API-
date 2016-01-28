// also include ngRoute for all our routing needs
var appConnexion = angular.module('appConnexion', ['ngRoute']);
// configure  routes for SignIn & SingUp space 
appConnexion.config(function ($routeProvider, $locationProvider) {
    $routeProvider
        //route for the Login html page
        .when('/login', {
            templateUrl: 'app/Login.html',
            controller: 'loginController'
        })
        // route for the Signup html page
        .when('/signup', {
            templateUrl: 'app/Signup.html',
            controller: 'signupController'
        }).otherwise({ redirectTo: '/login' });
  
   $locationProvider.html5Mode({
        enabled: true,
        requireBase: false
    });//fix url problem*/
});
var appConsumer = angular.module('appConsumer', ['ngRoute']);
// configure  routes for Consumer space 
appConsumer.config(function ($routeProvider, $locationProvider) {
    $routeProvider
        //route for the ConsumerProducts.html
        .when('/consumerproducts', {
            templateUrl: 'app/ConsumerProducts.html',
            controller: 'ConsumerController'
        })
        //route for the ConsumerCommand.html
        .when('/consumercommand', {
            templateUrl: 'app/ConsumerCommand.html',
            controller: 'ConsumerController'
        })
         //route for the ConsumerCart.html
        .when('/consumercart', {
            templateUrl: 'app/ConsumerCart.html',
            controller: 'ConsumerController'
        })
        .otherwise({ redirectTo: '/consumerproducts' });
    $locationProvider.html5Mode({
        enabled: true,
        requireBase: false
    });//fix url problem*/
});
var appAdmin = angular.module('appAdmin', ['ngRoute']);
// configure routes for Admin space 
appAdmin.config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
    $routeProvider
        //route for AdminProducts.html
        .when('/adminproducts', {
            templateUrl: 'app/AdminProducts.html',
            controller: 'AdminController'
        })
        //route for AdminCommand.html
        .when('/admincommand', {
            templateUrl: 'app/AdminCommand.html',
            controller: 'AdminController'
        })  
        .otherwise({ redirectTo: '/adminproducts' });

    $locationProvider.html5Mode({
        enabled: true,
        requireBase: false
    });//fix url problem*/
}]);