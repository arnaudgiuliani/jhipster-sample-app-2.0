'use strict';

angular.module('hipster2App')
    .config(function ($routeProvider) {
        $routeProvider
            .when('/logs', {
                templateUrl: 'client/app/admin/logs/logs.html',
                controller: 'LogsController',
                authenticate: true,
                roles: 'ROLE_ADMIN'
           })
    })
    .controller('LogsController', function ($scope, LogsService) {
        $scope.loggers = LogsService.findAll();

        $scope.changeLevel = function (name, level) {
            LogsService.changeLevel({name: name, level: level}, function () {
                $scope.loggers = LogsService.findAll();
            });
        }
    });
