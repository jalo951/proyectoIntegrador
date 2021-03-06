angular.module('login.services', [])
    .factory('API', function($rootScope, $http, $ionicLoading, $window) {
        var base = "http://localhost:9804";

        $rootScope.show = function(text) {
            $rootScope.loading = $ionicLoading.show({
              template: '<p class="item-icon-left">'+ text+'<ion-spinner class= "spinner-energized" icon="crescent"/></p>'
 
            });
        };


        $rootScope.hide = function() {
            $ionicLoading.hide();
        };

        $rootScope.notify = function(text) {
            $rootScope.show(text);
            $window.setTimeout(function() {
                $rootScope.hide();
            }, 1999);
        };
        $rootScope.notify = function(text) {
            $rootScope.show(text);
            $window.setTimeout(function() {
                $rootScope.hide();
            }, 1999);
        };

         $rootScope.logout = function () {
            $rootScope.setToken("");
            $window.location.href = '#/entrar';
        };

        $rootScope.setToken = function(token) {
            return $window.localStorage.token = token;
        }

        $rootScope.getToken = function() {
            return $window.localStorage.token;
        }

        $rootScope.isSessionActive = function() {
            return $window.localStorage.token ? true : false;
        }

        return {
            signin: function(form) {
                return $http.post(base+'/login', form);
            },
            getAll: function(email) {
                alert("getAll");
                return $http.get(base + '/list', {
                    method: 'GET',
                    params: {
                        token: email
                    }
                });
            }
        }
    });