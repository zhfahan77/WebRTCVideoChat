const mongoose = require('mongoose')
User = mongoose.model('User')

module.exports.registerUser = function(Data) {
    return new Promise((resolve, reject) => {
        if(!Data.username || !Data.password || !Data.confirmPassword) {
            return reject({ "message": "No data given", "statusCode" : 404 })
        }

        if(Data.password !== Data.confirmPassword) {
            return reject({ "message": "Passwords dont match", "statusCode" : 422 })
        }

        let UserModel = new User(Data)
        UserModel.setPassword(Data.password)
        UserModel.save()
            .then(result => {
                resolve({ "message": "Registration successful, Please Login", "statusCode" : 201 })
            }).catch(err => {
                if(err.code === 11000) {
                    return reject({ "message": "User already exists", "statusCode" : 422 })
                }
                reject(err)
            })

    })
}

module.exports.loginUser = function(Data) {
    return new Promise((resolve, reject) => {

        if(!Data.username || !Data.password) {
            return reject({ "message": "No data given", "statusCode" : 404 })
        }

        User
            .findOne({ username: Data.username })
            .then(result => {
                console.log(result)
                if(!result) {
                    return reject({ "message": "No User found", "statusCode" : 404 })
                }

                if(!result.validPassword(Data.password)) {
                    return reject({ "message": "Password is wrong", "statusCode" : 422 })
                }

                resolve({ "token": result.generateJwt(), "statusCode" : 200 , "success" : true })
            })
            .catch(err => {
                console.log(err)
            })
    })
}