const User = require("mongoose").model("User")

module.exports.addUser = function(Data) {
	let UserModel = new User(Data)

	return UserModel
		.save()
		.then(result => {
			return result
		}).catch(err => {
			console.log(err)
		})
}

module.exports.getUser = function(Username) {
	return new Promise((resolve, reject) => {
		User
			.findOne({ "user_name" : Username })
			.then(result => {
				resolve(result)
			}).catch(err => {
				reject(err)
			})
	})
}

module.exports.deleteUser = function(Username) {
	return User
		.findOneAndDelete({ "user_name" : Username })
		.then(result => {
			return result
		}).catch(err => {
			console.log(err)
		})
}