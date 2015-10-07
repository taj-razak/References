//Angular Routes
var app = angular.module("app", ['ngRoute', 'ui.bootstrap', 'ui.router']);
app.config(['$routeProvider', '$stateProvider', '$urlRouterProvider', function ($routeProvider, $stateProvider, $urlRouterProvider) {

    $routeProvider
        .when('/', {
            templateUrl: "LoginPage.html"
        }).when('/signup', {
            templateUrl: "SignupPage.html"
        }).otherwise({
            redirectTo: '/'
        })

    $stateProvider.state("profileDetails", {
        templateUrl: "ProfileDashboard.html"
    }).state("userHome", {
        templateUrl: "UserCommentWall.html"
    })

}]).run(['$route', angular.noop]);