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
        }

        return {
            signin: function(form) {
                return $http.post(base+'/login', form);
            }
        }
    });