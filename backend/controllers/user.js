const Usermodel = require("../models/usersSchema");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const register = (req, res) => {
  const { name, email, password, address, role } = req.body;
  const user = new Usermodel({
    name,
    email,
    password,
    address,
    role,
  });
  user
    .save()
    .then((result) => {
      res.status(201).json({
        success: true,
        message: `Account Created Successfully`,
        author: result,
      });
    })
    .catch((err) => {
      if (err.keyPattern) {
        return res.status(409).json({
          success: false,
          message: `The email already exists`,
        });
      }
      res.status(500).json({
        success: false,
        message: `Server Error`,
        err: err.message,
      });
    });
};

const login = (req,res) =>{
    const {email,password} = req.body
    Usermodel.findOne({email:email.toLowerCase()})
    .populate("role", "-_id -__v")
    .then( async(result)=>{
        console.log(result);
      
        if(!result){
            res.status(404).json('email not found')
        }else{
            
            const isCorrectPassword = await bcrypt.compare(password ,result.password)
            console.log(isCorrectPassword);
            if(!isCorrectPassword) {
                res.status(404).json("password not match")
            }else{
                const payload = {
                    id : result.id ,
                    permissions: result.role.permissions,
                    type : result.role.role
                }

                const options = {
                    expiresIn : "5h"
                }
                const userToken = jwt.sign(payload , process.env.SECRET , options)
                res.status(200).json ({
                    message : "welcome to our website",
                    token : userToken
                })
            }
        }
        
    })
    .catch((err)=>{
        res.json(err)
    })
}

module.exports = {
  register,
  login,
};
