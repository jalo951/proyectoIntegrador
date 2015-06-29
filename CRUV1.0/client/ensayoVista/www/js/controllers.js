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

            $rootScope.show('No se admiten espacios vacíos');

        } else {

            API.signin({
                email: email,
                contrasena: contrasena
            }).success(function(data) {
                console.log('Successs');
                $rootScope.setToken(email); // create a session kind of thing on the client side
                $rootScope.show("Cargando...");
                $window.location.href = ('#/list');
            }).error(function(error) {
                $rootScope.show(error.error);
            });
        }
    }

    $scope.irRegistro = function() {
        $window.location.href = ('#/registrar');
    }
})

.controller('myListCtrl', function($rootScope, $scope, API, $timeout, $ionicModal, $window) {
    $scope.newTask = function() {
        API.getAll($rootScope.getToken()).success(function(data, status, headers, config) {
            $rootScope.show("Please wait... Processing");

        }).error(function(data, status, headers, config) {
            $rootScope.show("Oops something went wrong!! Please try again later");
        });
    }
    $scope.irModificar = function() {
        $window.location.href = ('#/modificar');
    }
})

.controller('RegistroController', function($rootScope, $scope, API, $window) {

    $scope.user = {
        email: '',
        nombre: '',
        apellido: '',
        genero: '',
        contrasenaRep: '',
        contrasena: ''
    };

    $scope.registrar = function() {
        var email = this.user.email;
        var contrasena = this.user.contrasena;
        var nombre = this.user.nombre;
        var apellido = this.user.apellido;
        var genero = this.user.genero;
        var contrasenaRep = this.user.contrasenaRep;

        console.log(genero);
        if (!email || !contrasena || !nombre || !apellido || !contrasenaRep) {

            $rootScope.show('No se admiten espacios vacíos');

        } else {

            if (contrasenaRep != contrasena) {
                $rootScope.show('Las contraseñas no coinciden');
            } else {

                API.registrar({
                    _id: email,
                    contrasena: contrasena,
                    nombre: nombre,
                    apellido: apellido,
                    genero: genero,
                    colorCabello: "#000000",
                    colorCara: "#ffe4c4",
                    colorCamisa: "#228b22",
                    puntos: 10,
                    nivel: "1",
                    trofeos: [],
                    accesorios_id: []
                }).success(function(data) {
                    console.log('Successs');
                    $rootScope.show("Cargando...");
                    $window.location.href = ('#/entrar');
                }).error(function(error) {
                    $rootScope.show(error.error);
                });
            }
        }
    }
})

.controller('modificarController', function($rootScope, $scope, API, $window,$ionicPopup) {

    $scope.user = {

        nombre: '',
        apellido: '',
        genero: '',
        contrasena: ''
    };

    $scope.modificarDatos = function(contrasena) {

        var contrasena = contrasena;
        var nombre = this.user.nombre;
        var apellido = this.user.apellido;
        var genero = this.user.genero;

        console.log(contrasena);
        if (!contrasena || !nombre || !apellido ) {

            $rootScope.show('No se admiten espacios vacíos');

        } else {

            

                API.modificarDatos({
                    contrasena: contrasena,
                    nombre: nombre,
                    apellido: apellido,
                    genero: genero
                }, $rootScope.getToken()).success(function(data) {
                    console.log('Successs');
                    $rootScope.show("Cargando...");
                    $window.location.href = ('#/list');
                }).error(function(error) {
                    $rootScope.show(error.error);
                });
            
        }
    }
    $scope.showPopup = function() {
        $scope.data = {}

        // An elaborate, custom popup
        var myPopup = $ionicPopup.show({
            template: '<input type="password" ng-model="data.contrasena">',
            title: 'Confirmación',
            subTitle: 'Ingrese la contraseña para confirmar los cambios',
            scope: $scope,
            buttons: [{
                text: 'Cancelar'
            }, {
                text: '<b>Aceptar</b>',
                type: 'button-positive',
                onTap: function(e) {
                    if (!$scope.data.contrasena) {
                        //don't allow the user to close unless he enters wifi password
                        e.preventDefault();
                    } else {
                        return $scope.data.contrasena;
                    }
                }
            }]
        });
        myPopup.then(function(res) {
            console.log(res);
            $scope.modificarDatos(res);
        });
       /* $timeout(function() {
            myPopup.close(); //close the popup after 3 seconds for some reason
        }, 100000);*/
    };

})
