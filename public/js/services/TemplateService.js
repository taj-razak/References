app.service('templateService', function () {


    var template1 = '<li class="media media-replied" ng-repeat="userdata in showUserData">',
        template2 = '<div class="media-body"><div class="well well-lg"><h4><img class="media-object img-circle" src="profile.png" alt="profile"><span>{{userdata.userProfileName}}</span></h4><ul class="media-date text-uppercase reviews list-inline"><li class="dd">{{userdata.post_time|date:"MM/dd/yyyy @ h:mma"}}</li></ul>',
        template3 = '<p style="font-weight:bold;">{{userdata.post_content}}</p><span class="input-group"><input  type="text" class="form-control"/><sapn class="input-group-btn"><button class="btn btn-warning">Add Comment</button></span></span><br/>',
        template4 = '<a href="" data-toggle="tooltip" title="likes!"><span class="fa fa-thumbs-o-up fa-lg"></span></a> ({{userdata.likes.length}}) &nbsp;&nbsp;<a href="" data-toggle="tooltip" title="comments!"><span class="fa fa-comments-o fa-lg"></span></a> ({{userdata.comments.length}})</div></div></li>';

    this.MainTemplate = template1 + template2 + template3 + template4;

    return this.MainTemplate;

})