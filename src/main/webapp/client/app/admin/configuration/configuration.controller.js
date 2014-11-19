'use strict';

angular.module('hipster2App')
    .config(function ($routeProvider) {
        $routeProvider
            .when('/configuration', {
                templateUrl: 'client/app/admin/configuration/configuration.html',
                controller: 'ConfigurationController',
                authenticate: true,
                roles: 'ROLE_ADMIN'
            })
    })
    .controller('ConfigurationController', function ($scope, ConfigurationService) {
        $scope.configuration = ConfigurationService.get();
    });
