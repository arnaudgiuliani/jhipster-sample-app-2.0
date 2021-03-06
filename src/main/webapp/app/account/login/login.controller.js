'use strict';

angular.module('hipster2App')
    .config(function ($stateProvider) {
        $stateProvider
            .state('login', {
                parent: 'account',
                url: '/login',
                data: {
                    roles: []
                },
                views: {
                    'content@': {
                        templateUrl: 'app/account/login/login.html',
                        controller: 'LoginController'
                    }
                }
            });
    })
    .controller('LoginController', function ($rootScope, $scope, $state, Auth) {
        $scope.user = {};
        $scope.errors = {};

        $scope.rememberMe = true;
        $scope.login = function () {
            Auth.login({
                username: $scope.username,
                password: $scope.password,
                rememberMe: $scope.rememberMe
            }).then(function () {
                $scope.authenticationError = false;
                $rootScope.back();
            }).catch(function (err) {
                $scope.authenticationError = true;
            });
        }
    });
