app.service('templateService', function () {


    var template1 = '<li class="media media-replied" ng-repeat="userdata in showUserData">',

        template2 = '<div class="media-body"><div class="well well-lg"><h4><img class="media-object img-circle" src="profile.png" alt="profile"><span>{{userdata.userProfileName}}</span></h4><ul class="media-date text-uppercase reviews list-inline"><li>{{userdata.post_time|date:"MM/dd/yyyy @ h:mma"}}</li></ul>',

        template3 = '<p style="font-weight:bold;font-size:20px;">{{userdata.post_content}}</p><div>' + '<p style="font-weight:bold;display:block;" ng-repeat="comment in userdata.comments">{{comment.user}}:-&nbsp;&nbsp;{{comment.cmt}}</p></div>' + '<div class="input-group"><input  type="text" class="form-control" ng-model="userdata.commented"/><div class="input-group-btn"><button class="btn btn-warning" ng-click="addComment(userdata)">Add Comment</button></div></div><br/>',

        template4 = '<div ng-init="id=(userdata.likes|filter:loggerid);userdata.havelike=true"><a href="" data-toggle="tooltip" title="like!"  ng-click="likeAndDislike(userdata.userid,true);userdata.havelike=false" ng-show="userdata.havelike && id.length==0"><span class="fa fa-thumbs-o-up fa-lg" ></span></a>',

        template5 = '<a href="" data-toggle="tooltip" title="unlike!"  ng-click="likeAndDislike(userdata.userid,false);userdata.havelike=true" ng-show="!userdata.havelike || !id.length==0">' + '<span class="fa fa-thumbs-o-down fa-lg"></span></a>',
        template6 = '&nbsp;({{userdata.likes.length}}) &nbsp;&nbsp;' + '<a href="" data-toggle="tooltip" title="comments!"><span class="fa fa-comments-o fa-lg"></span></a> ({{userdata.comments.length}})</div></div></div></li>';

    this.MainTemplate = template1 + template2 + template3 + template4 + template5 + template6;

    return this.MainTemplate;

})

//ng-show="!havelike" ng-if="id.length==0"
//ng-show="havelike"   ng-if="id.length!=0"