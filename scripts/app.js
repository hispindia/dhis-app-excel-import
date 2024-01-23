/**
 * Created by hisp on 1/12/15.
 */
//$('document').ready(function() {

    var excelImport = angular.module('excelImport', ['ui.bootstrap',
            'ngRoute',
            'ngCookies',
            'ngSanitize',
            'ngMessages',
            'd2HeaderBar',
            'd2Directives',
            'd2Filters',
            'd2Services',
            'pascalprecht.translate',
            'excelImportAppServices',
            'jsonFormatter'
        ])

        .config(function ($routeProvider, $translateProvider) {
            $routeProvider.when('/', {
                templateUrl: 'views/home.html',
                controller: 'homeController'
            }).when('/import', {
                templateUrl: 'views/import.html',
                controller: 'importController'

            }).when('/aggregate_data', {
                templateUrl: 'views/aggregate-data.html',
                controller: 'aggregateDataController'

            }).otherwise({
                redirectTo: '/'
            });

            $translateProvider.preferredLanguage('en');
            $translateProvider.useSanitizeValueStrategy('escaped');
            $translateProvider.useLoader('i18nLoader');
        })
//})