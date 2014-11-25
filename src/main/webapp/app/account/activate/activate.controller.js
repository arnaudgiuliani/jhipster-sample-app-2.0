'use strict';

angular.module('hipster2App')
    .config(function ($stateProvider) {
        $stateProvider
            .state('activate', {
                parent: 'account',
                url: '/activate?key',
                data: {
                    roles: []
                },
                views: {
                    'content@': {
                        templateUrl: 'app/account/activate/activate.html',
                        controller: 'ActivationController'
                    }
                }
            });
    })
    .controller('ActivationController', function ($scope, $stateParams, Auth) {
        Auth.activateAccount({key: $stateParams.key}).then(function () {
            $scope.error = null;
            $scope.success = 'OK';
        }).catch(function () {
            $scope.success = null;
            $scope.error = "ERROR";
        });
    });

