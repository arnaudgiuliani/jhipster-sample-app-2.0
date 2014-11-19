'use strict';

angular.module('hipster2App')
    .config(function ($routeProvider) {
        $routeProvider
            .when('/sessions', {
                templateUrl: 'client/app/account/sessions/sessions.html',
                controller: 'SessionsController',
                authenticate: true,
                roles: 'ROLE_USER'
            })
    })
    .controller('SessionsController', function ($scope, Sessions) {
        $scope.success = null;
        $scope.error = null;
        $scope.sessions = Sessions.getAll();
        $scope.invalidate = function (series) {
            Sessions.delete({series: encodeURIComponent(series)},
                function () {
                    $scope.error = null;
                    $scope.success = "OK";
                    $scope.sessions = Sessions.getAll();
                },
                function () {
                    $scope.success = null;
                    $scope.error = "ERROR";
                });
        };
    });
