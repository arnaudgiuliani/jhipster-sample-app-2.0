'use strict';

angular.module('hipster2App')
    .config(function ($stateProvider) {
        $stateProvider
            .state('register', {
                parent: 'account',
                url: '/register',
                data: {
                    roles: []
                },
                views: {
                    'content@': {
                        templateUrl: 'app/account/register/register.html',
                        controller: 'RegisterController'
                    }
                }
            });
    })
    .controller('RegisterController', function ($scope, $translate, Auth) {
        $scope.success = null;
        $scope.error = null;
        $scope.doNotMatch = null;
        $scope.errorUserExists = null;
        $scope.registerAccount = {};

        $scope.register = function () {
            if ($scope.registerAccount.password != $scope.confirmPassword) {
                $scope.doNotMatch = "ERROR";
            } else {
                $scope.registerAccount.langKey = $translate.use();
                $scope.doNotMatch = null;

                Auth.createAccount($scope.registerAccount).then(function (account) {
                    $scope.error = null;
                    $scope.errorUserExists = null;
                    $scope.success = 'OK';
                }).catch(function (response) {
                    $scope.success = null;
                    if (response.status === 304 &&
                        response.data.error && response.data.error === "Not Modified") {
                        $scope.error = null;
                        $scope.errorUserExists = "ERROR";
                    } else {
                        $scope.error = "ERROR";
                        $scope.errorUserExists = null;
                    }
                });
            }
        }
    });
