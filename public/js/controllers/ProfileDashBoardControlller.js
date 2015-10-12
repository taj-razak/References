app.controller('ProfileDashBoardCtrl', ['$scope', '$http', '$state', '$document', '$location', 'socketServe', 'templateService', '$compile', '$window', function ($scope, $http, $state, $document, $location, socketServe, templateService, $compile, $window) {

    var socket = socketServe.socket;


    $scope.posts = {};
    $scope.usercomt = {};

    $scope.havelike = true;


    //this will change the state of the $stateProvider in the router................... 
    $state.go('userHome');

    $document.ready(function () {
        $('[data-toggle="tooltip"]').tooltip();
    })


    //checking For Session it already existed or not if session is existed than retrive the userdata.......
    $http.get('/sessionCheck').success(function (data) {

        if (data) {
            $http.get('/getUserDetails').success(function (data) {

                console.log(data);
                $scope.username = data.FirstName + " " + data.LastName;
                $scope.email = data.Email;
                $scope.loggerid = data._id;

            })

        } else {
            $location.path('/')
        }
    })





    //sending the post content to the backend which saves into database.................
    $scope.addPost = function (showUserData) {

        console.log($scope.posts.content)

        $http.post("/textPosted", {
            content: $scope.posts.content
        }).success(function (data) {

            if (data) {
                showUserData.unshift(data)
                $scope.posts = {};
                //socket code which call the socket.on at backend........................
                socket.emit("clientPost", {
                    clientPostData: data
                });
            }

        })

    }


    //sending and adding the comments to the posts.................
    $scope.addComment = function (udata) {
        console.log(udata.userid)

        // console.log(cometline)


        $http.post('/postcomment', {
            comment: udata.commented,
            id: udata.userid
        }).success(function (data) {
            // console.log(data);
            //console.log($scope.showUserData)

            udata.comments.unshift(data.comments[0]); //issue
            console.log($scope.commented)

            //console.log(data.comments)
            //here cobj is comments object and 'cid' comment id (this id use to identify the user's post object)
            socket.emit("sendcomment", {
                cobj: data.comments[0],
                uid: udata.userid
            });

            udata.commented = "";

        });



        //console.log($scope.commented)
    }

    $scope.likeAndDislike = function (userid, like) {
            // console.log(userid)
            //console.log(like)
            if (like == true) {
                like = false;

            } else {
                like = true;

            }
            //console.log(like)
            $http.post('/like', {
                postid: userid,
                likeStatus: !like
            }).success(function (data) {
                console.log(data);
            })

        }
        //    $scope.disLike = function (userid) {
        //        $scope.havelike = true;
        //        console.log(userid)
        //    }


 }])