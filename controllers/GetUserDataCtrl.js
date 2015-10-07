var userSchema=require('../model/UserSchema.js');

module.exports=function(req,res){

	userSchema.findOne({_id:req.session.session_userid},function(err,data){

		res.send(data);

	})

}