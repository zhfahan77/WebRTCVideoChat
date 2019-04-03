const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
	user_name : {
		type : String,
		required : true,
		unique : true
	},
	status : {
		type : String
	}
})

mongoose.model('User', userSchema, 'user')