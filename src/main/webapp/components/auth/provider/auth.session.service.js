'use strict';

angular.module('hipster2App')
    .factory('AuthServerProvider', function loginService($http, localStorageService) {
        return {
            login: function(credentials) {
                var data = "j_username=" + encodeURIComponent(credentials.username) +
                    "&j_password=" + encodeURIComponent(credentials.password) +
                    "&_spring_security_remember_me=" + credentials.rememberMe + "&submit=Login";
                return $http.post('app/authentication', data, {
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded"
                    }
                }).success(function (response) {
                    localStorageService.set('token', btoa(credentials.username + ':' + credentials.password));
                    return response;
                });
            },
            logout: function() {
                localStorageService.clearAll();

                // logout from the server
                $http.get('app/logout');
            },
            getToken: function () {
                var token = localStorageService.get('token');
                return token;
            },
            hasValidToken: function () {
                var token = this.getToken();
                return !!token;
            }
        };
    });

