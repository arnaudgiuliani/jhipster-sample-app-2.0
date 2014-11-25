'use strict';

angular.module('hipster2App')
    .config(function ($stateProvider) {
        $stateProvider
            .state('health', {
                parent: 'admin',
                url: '/health',
                data: {
                    roles: ['ROLE_ADMIN']
                },
                views: {
                    'content@': {
                        templateUrl: 'app/admin/health/health.html',
                        controller: 'HealthController'
                    }
                }
            });
    })
    .controller('HealthController', function ($scope, MonitoringService) {
        $scope.updatingHealth = true;

        $scope.refresh = function () {
            $scope.updatingHealth = true;
            MonitoringService.checkHealth().then(function (reponse) {
                $scope.healthCheck = reponse;
                $scope.updatingHealth = false;
            }, function (reponse) {
                $scope.healthCheck = reponse.data;
                $scope.updatingHealth = false;
            });
        };

        $scope.refresh();

        $scope.getLabelClass = function (statusState) {
            if (statusState == 'UP') {
                return "label-success";
            } else {
                return "label-danger";
            }
        }
    });
