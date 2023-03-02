const mongoose=require('mongoose')

const UserSchema=({
name:String,
difficulty:String,
score:Number,
})

const UserModel=mongoose.model("Users",UserSchema)

module.exports={UserModel}