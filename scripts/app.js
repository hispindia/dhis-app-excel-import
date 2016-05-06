/**
 * Created by hisp on 1/12/15.
 */

var skeletonApp = angular.module('skeletonApp',['ui.bootstrap',
    'ngRoute',
    'ngCookies',
    'ngSanitize',
    'ngMessages',
    'd2HeaderBar',
    'd2Directives',
    'd2Filters',
    'd2Services',
    'pascalprecht.translate',
    'skeletonAppServices'
])

.config(function($routeProvider,$translateProvider){
        $routeProvider.when('/', {
            templateUrl:'views/home.html',
            controller: 'homeController'
        }).when('/panel', {
            templateUrl:'views/panel.html',
            controller: 'PanelController'
        }).otherwise({
            redirectTo : '/'
        });

        $translateProvider.preferredLanguage('en');
        $translateProvider.useSanitizeValueStrategy('escaped');
        $translateProvider.useLoader('i18nLoader');
    })