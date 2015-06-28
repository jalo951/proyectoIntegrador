angular.module('login.controllers', ['login.services'])

.controller('loginController', function($rootScope, $scope, API, $window) {

    $scope.user = {
        email: '',
        contrasena: ''
    };

    $scope.ingresar = function() { // Duda con ingresar
        var email = this.user.email;
        var contrasena = this.user.contrasena;
        if (!email || !contrasena) {

            $rootScope.notify('No se admiten espacios vacíos');

        } else {

            API.signin({
                email: email,
                contrasena: contrasena
            }).success(function(data) {
                console.log('Successs');
                $rootScope.setToken(email); // create a session kind of thing on the client side
                $rootScope.hide();
                $rootScope.notify("Cargando...");
                $window.location.href = ('#/list');
            }).error(function(error) {
                $rootScope.hide();
                $rootScope.notify(error.error);
            });
        }
    }
})

.controller('myListCtrl', function($rootScope, $scope, API, $timeout, $ionicModal, $window) {
    $scope.newTask = function() {
        API.getAll($rootScope.getToken()).success(function(data, status, headers, config) {
            $rootScope.hide();
            $rootScope.notify("Please wait... Processing");
            
        }).error(function(data, status, headers, config) {
            $rootScope.hide();
            $rootScope.notify("Oops something went wrong!! Please try again later");
        });
    }
})
