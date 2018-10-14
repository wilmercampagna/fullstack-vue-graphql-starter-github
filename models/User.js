const mongoose = require("mongoose")
const md5 = require("md5")
const bcrypt = require("bcrypt")

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    require: true,
    unique: true,
    trim: true
  },
  email: {
    type: String,
    require: true,
    unique: true,
    trim: true
  },
  password: {
    type: String,
    require: true,
    trim: true
  },
  avatar: {
    type: String
  },
  joinDate: {
    type: Date,
    default: Date.now
  },
  favorites: {
    type: [mongoose.Schema.Types.ObjectId],
    required: true,
    ref: "Post"
  }
})

UserSchema.pre("save", function (next) {
  this.avatar = `http://gravatar.com/avatar/${md5(this.username)}?d=identicon`
  next()
})

// Has password so it cant ve seen accae to database

UserSchema.pre("save", function (next) {
  if (!this.isModified("password")) {
    return next()
  }
  bcrypt.genSalt(10, (err, salt) => {
    if (err) return next(err)

    bcrypt.hash(this.password, salt, (err, hash) => {
      if (err) return next(err)

      this.password = hash
      next()
    })
  })
})

module.exports = mongoose.model("User", UserSchema)
