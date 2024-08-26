const mongoose = require('mongoose')
const { isEmail } = require('validator')
const bcrypt = require('bcryptjs')
const userData = mongoose.Schema({
    email: {
        type: String,
        required: false,
        unique: true,
        validate: [isEmail, "Please enter a valid email"]
    },
    password: {
        type: String,
        required: false,
        minlength: [5, 'minimum length is 5 characters']
    },
    username: {
        type: String,
        required: false
    }
})

userData.pre('save', async function (next) {
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
    next()

})

userData.statics.login = async function (email,password){
    
    const user = await this.findOne({email:email})
    if(user){
      const auth =await bcrypt.compare(password , user.password)
      if(auth) return user
      throw new Error('Incorrect Password')
      
    }else{
       throw new Error("Email is not registered , consider signing up");
       
    }
}

const userSchema = mongoose.model('userSchema', userData)
module.exports = userSchema