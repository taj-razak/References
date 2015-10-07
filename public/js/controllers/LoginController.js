app.controller('LoginCtrl', function ($scope, $http, $location, $window) {

    $scope.loginValid = false;
    $http.get('/sessionCheck').success(function (data) {
        if (data) {
            $window.location.href = '/loginuser';
        }
    })
})