const usersCollection = require('../db').db().collection('users')
const bcrypt = require('bcryptjs')
const validator = require('validator')

let User = function (data) {
    this.data = data
    this.errors = []
}

User.prototype.cleanUp = function () {
    if (typeof(this.data.username != "string")) {
        this.username = ''
    }
    if (typeof(this.data.firstName != "string")) {
        this.firstName = ''
    }
    if (typeof(this.data.lastName != "string")) {
        this.lastName = ''
    }
    if (typeof(this.data.password != "string")) {
        this.password = ''
    }

    this.data = {
        firstName: this.data.firstName.trim(),
        lastName: this.data.lastName.trim(),
        username: this.data.username.trim(),
        email: this.data.email.toLowerCase().trim(),
        password: this.data.password
    }
}
User.prototype.loginCleanUp = function () {
    if (typeof(this.data.username != "string")) {
        this.username = ''
    }
    if (typeof(this.data.password != "string")) {
        this.password = ''
    }

    this.data = {
        username: this.data.username.trim(),
        password: this.data.password
    }
}

User.prototype.validate = function () {
    return new Promise( async(resolve, reject) => {
        if (this.data.firstName == "" || this.data.lastName == "") {
            this.errors.push("First name or Last name cannot be empty!")
        }
        if (this.data.firstName != "" && this.data.lastName != "" && !validator.isAlphanumeric(this.data.firstName) && !validator.isAlphanumeric(this.data.lastName)) {
            this.errors.push("First name and Last name can only contain numbers and letters")
        }
        if (this.data.username == "") {
            this.errors.push("Username cannot be empty!")
        }
        if (this.data.username != "" && !validator.isAlphanumeric(this.data.username)) {
            this.errors.push("Username can only contain numbers and letters")
        }
        if (this.data.username.length > 0 && this.data.username.length < 3) {
            this.errors.push("Username cannot be less than 3 characters")
        }
        if (this.data.password.username > 20) {
            this.erros.push("Username cannot be more than 20 characters")
        }
        if (!validator.isEmail(this.data.email)) {
            this.errors.push("This is not a valid email")
        }
        if (this.data.password == "") {
            this.errors.push("Password cannot be empty!")
        }
        if (this.data.password.length > 0 && this.data.password.length < 3) {
            this.errors.push("Password cannot be less than 3 characters")
        }
        if (this.data.password.length > 30) {
            this.erros.push("Password cannot be more than 30 characters")
        }
        resolve()
    })
    
}

User.prototype.login = function () {
    return new Promise(async(resolve, reject)=> {
        this.loginCleanUp()
        usersCollection.findOne({username: this.data.username}).then((userLogin) => {
            if (userLogin && bcrypt.compareSync(this.data.password, userLogin.password)) {
                resolve()
            } else {
                reject('Incorrect Username or Password')
            }
        }).catch(() => {
            reject("Try again later")
        })
    } )
}

User.prototype.register = function () {
    return new Promise(async(resolve, reject) => {
        this.cleanUp()
        await this.validate()
        if (!this.errors.length) {
            let salt = bcrypt.genSaltSync(10)
            this.data.password = bcrypt.hashSync(this.data.password, salt)
            await usersCollection.insertOne(this.data)
            resolve()
        } 
        else {
            console.log(this.data);
            reject(this.errors)
        }
    })
}

module.exports = User