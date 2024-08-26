const userSchema = require('../Models/userSchema')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

const maxAge = 60*60;
const createToken = (id) =>{
 return jwt.sign({id} , "secret-key" , {
    expiresIn:maxAge
  })
}

const handleErrors = (err) => {
    const errors = { email: "", password: "" };

    if (err.message.includes("Incorrect Password")) {
        errors.password = "Incorrect Password"
    }
    if (err.message.includes("Email is not registered , consider signing up")) {
        errors.email = "Email is not registered , consider signing up"
    }
    if (err.message.includes("userSchema validation failed")) {

        Object.values(err.errors).forEach(err => {
            errors[err.properties.path] = err.properties.message
        })
    }
    return errors;
}


const addUser = async (req, res) => {
    try {
        const existingUser = await userSchema.findOne({ email: req.body.email })
        if (existingUser) return res.status(400).send({ email: "Email is already registered , consider logging in" })
        const data = new userSchema(req.body)
        await data.save()
        const token = createToken(data._id)
        console.log(token)
        res.cookie("jwt" , token, {maxAge:maxAge*1000, httpOnly:true})
        res.status(200).send(data)
    } catch (error) {
        const errors = handleErrors(error)
        res.status(400).send(errors)
    }
}

const login = async (req,res)=>{
  try {
    const {email , password} = req.body;
  const data =   await userSchema.login(email , password)
  const token = createToken(data._id)
  res.cookie("jwt" , token , {maxAge:maxAge , httpOnly:true})
  res.status(200).send(data)
  } catch (error) {
    const errors = handleErrors(error)
    res.status(400).send(errors)
  }
}

const showUser = async (req,res) => {
  try {
    let data = await userSchema.find({})
    res.send(data)
  } catch (error) {
    res.send(error.message)
    console.log(error)
  }
}

const findUser = async (req,res) =>{
try {
  let data = await userSchema.findOne({email:req.params.email})
  res.send(data)
  console.log(data)
} catch (error) {
  res.send("error")
  console.log(error)
}
}

exports.findUser = findUser
exports.showUser = showUser
exports.addUser = addUser
exports.login = login