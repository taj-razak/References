app.controller('signupCtrl', function ($scope, $http, $document, $location, $window) {

    console.log("hello");
    $scope.user = {};


    //jquery datePicker function.............
    $document.ready(function () {
        $("#datepicker").datepicker();
    });

    $http.get('/sessionCheck').success(function (data) {

        if (data) {
            $window.location.href = '/loginuser';
        }
    })




    $scope.submittedData = function () {
        console.log("this is the data")
        console.log($scope.user)
        $http.post('/saveUserData', {
            userData: $scope.user
        }).success(function (data) {

            console.log(data)
            if (data) {
                $location.path('/')
            }

        })
    }

})