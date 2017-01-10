/**
 * Created by harsh on 5/1/17.
 */


    var excelImport = angular.module('excelImport',['ui.bootstrap',
            'ngRoute',
            'ngCookies',
            'ngSanitize',
            'ngMessages',
            'd2HeaderBar',
            'd2Directives',
            'd2Filters',
            'd2Services',
            'pascalprecht.translate'
        ])

        .config(function($routeProvider,$translateProvider){
            $translateProvider.preferredLanguage('en');
            $translateProvider.useSanitizeValueStrategy('escaped');
            $translateProvider.useLoader('i18nLoader');
        })
