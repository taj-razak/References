var mongoose=require('mongoose');
module.exports=mongoose.model('users',{
		
		FirstName:{
				  type:String,
				  required:true
			  },
		LastName:{
				type:String,
				require:true
			},
		Email:{
				  type:String,
				  required:true,
				  unique:true
			},
		Password:{
				type:String,
				required:true
			},
		DateOfBirth:{
				type:String,
				required:true
			}
		


})

