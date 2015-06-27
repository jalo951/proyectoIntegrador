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
                //$rootScope.setToken(email); // create a session kind of thing on the client side
                //$rootScope.hide();
                $rootScope.notify("Cargando...");
                //$window.location.href = ('www.google.com');
            }).error(function(error) {
                $rootScope.hide();
                $rootScope.notify("Invalid Username or password");
            });
        }
    }
})
