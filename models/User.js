const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");
const crypto = require("crypto");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: [true, "Please enter a name"],
  },
  email: {
    type: String,
    trim: true,
    required: [true, "Please enter a email"],
    unique: true,
  },
  validated: {
    type: Boolean,
    default: false,
    select: false,
  },

  hashed_password: {
    type: String,
    required: true,
    select: false,
  },
  salt: { type: String, select: false },
  created: {
    type: Date,
    default: Date.now,
  },
  updated: Date,
});

// virtual fields
UserSchema.virtual("password")
  .set(function (password) {
    // create a temporary password variable
    this._password = password;
    // generate timeStamp
    this.salt = uuidv4();
    // encryptPassword()
    this.hashed_password = this.encryptPassword(password);
  })
  .get(function () {
    return this._password;
  });

// Methods
UserSchema.methods = {
  authenticate: function (plainText) {
    return this.encryptPassword(plainText) === this.hashed_password;
  },
  encryptPassword: function (password) {
    if (!password) return "";
    try {
      return crypto
        .createHmac("sha256", this.salt)
        .update(password)
        .digest("hex");
    } catch (err) {
      return "";
    }
  },
};

const User = mongoose.model("User", UserSchema);
module.exports = User;
