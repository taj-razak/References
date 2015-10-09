app.directive('postsDir', function ($compile, socketServe, templateService, $http, $window) {


    var socket = socketServe.socket;


    return {

        restrict: 'E',
        template: '<ul class="media-list"></ul>',
        link: function (scope, elem, attr) {

            var maintemp = $compile(templateService.MainTemplate)(scope);

            $http.get('/getPosts').success(function (data) {

                console.log(data)
                scope.showUserData = data;
                if (data.length != 0) {
                    scope.usercomt.comments = data[0].comments;
                    //console.log(data[0].comments)
                }
                elem.append(maintemp);

            })

            //updating the post using via sockets...............
            socket.on("GettingPost", function (msg) {

                scope.$apply(function () {
                    scope.showUserData.unshift(msg.post.clientPostData);
                    //$window.location.reload();
                });
            })

            //updating the comments via sockets..................
            socket.on("GettingComment", function (msg) {
                //                console.log(msg);
                //                console.log(scope.showUserData)
                scope.$apply(function () {
                    var obj = scope.showUserData.filter(function (e) {
                        return e.userid == msg.uid
                    })
                    obj[0].comments.unshift(msg.cobj);
                    //                    console.log(scope.showUserData)
                })
            })


        }

    }




})