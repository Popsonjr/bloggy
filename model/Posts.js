const postsCollection = require('../db').db().collection('posts')
const mongodb = require('mongodb')
const sanitizeHTML = require('sanitize-html')


exports.postRender = function () {
    return new Promise (async(resolve, reject) => {
        postsCollection.find().toArray((err, posts) => {
            resolve(posts)
            reject(err)
        })  
    })
}

// exports.delete = function (postId) { 
    
//     return new Promise( async(resolve, reject) => {
//         if (postId != "") {
//             await postsCollection.deleteOne({_id: new mongodb.ObjectId(postId)}, () => {
//             resolve()
//         })
//         } else {
//              reject("not done")
//         }
//     })
    
// }

let Post = function (postData) {
    this.post = postData
    this.errors = []
    // console.log(this.post);
}

Post.prototype.cleanUp = function() {
    if (typeof(this.post.title) != "string" ) {
        this.post.title = ""
    }
    if (typeof(this.post.category) != "string" ) {
        this.post.category = ""
    }
    if (typeof(this.post.description) != "string" ) {
        this.post.description = ""
    }
    if (typeof(this.post.date) != "string" ) {
        this.post.date = ""
    }
    
    // getting rid of any bogus properties
    this.post = {
        title: this.post.title.trim(),
        description: this.post.description.trim(),
        category: this.post.category.trim(),
        date: this.post.date.trim()
    }
}

Post.prototype.sanitize = function() {
    let sanitizedTitle = sanitizeHTML(this.post.title, {allowedTags: [], allowedAttributes: {}})
    let sanitizedDescription = sanitizeHTML(this.post.description, {allowedTags: [], allowedAttributes: {}})
    let sanitizedCategory = sanitizeHTML(this.post.category, {allowedTags: [], allowedAttributes: {}})
    let sanitizedDate = sanitizeHTML(this.post.date, {allowedTags: [], allowedAttributes: {}})

    this.post = {
        title: sanitizedTitle,
        description: sanitizedDescription,
        category: sanitizedCategory,
        date: sanitizedDate
    }
}

Post.prototype.create = function () {
   return new Promise ( async (resolve, reject) => {
    // sanitize the post data before inserting 
       this.cleanUp()
       await this.sanitize()
       if (!this.errors.length) {
            await postsCollection.insertOne(this.post)
            // await console.log("dvdv");
            resolve()
       } else {
           reject(errors)
       } 
    }
   )
}

Post.prototype.delete = function (postId) {
    return new Promise( async(resolve, reject) => {
        if (postId != "") {
            await postsCollection.deleteOne({_id: new mongodb.ObjectId(postId)}, () => {
            resolve()
        })
        } else {
             reject("not done")
        }
    })
}

Post.prototype.edit = function (post) {
    return new Promise(async(resolve, reject) => {
        await postsCollection.findOneAndUpdate({_id: new mongodb.ObjectId(post.editId)}, {$set: post}, () => {
            resolve()
        })
    })
}

exports.postFunc = Post