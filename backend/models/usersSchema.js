const { default: mongoose } = require("mongoose");
const mpngoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password:{type:String,required:true},
  address:{type:String,required:true},
  role:{ type: mongoose.Schema.Types.ObjectId, ref: "Role"}
});
userSchema.pre('save' ,async function(){
  this.email = this.email.toLowerCase()
  this.password = await bcrypt.hash(this.password , 10)
})


module.exports = mongoose.model("User", userSchema);