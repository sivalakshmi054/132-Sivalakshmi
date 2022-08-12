var OEMSController = angular.module('OEMSController', ['ui.router','angucomplete-alt','smart-table','daypilot','frapontillo.bootstrap-duallistbox']);
OEMSController.config(function($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/loginpage');
    var baseUrl = $("base").first().attr("href");
    $stateProvider

    .state('loginpage', {
        url: '/loginpage',        
        templateUrl: 'Logincreate.html',
        controller: 'LoginPageController',        
      });

    //   .state('GeneralSettings', {
    //     url: '/GeneralSettings',
    //     templateUrl: 'Views/Administration/IdSettings.html',
    //     controller: 'IdSettingsController'
    // });
    

});