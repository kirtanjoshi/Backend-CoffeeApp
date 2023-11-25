const UserModel = require("../models/user.models")
const bcrypt = require ("bcrypt")

const createAccount = async (req, res)=>{
    try{
        const userData = req.body;
        const {email } = req.body;
        const existingUser = await UserModel.findOne({email: email});

        if(existingUser){
            return res.send("User already exists");
        }else{
            const newUser = new UserModel (userData);
            await newUser.save();
            res.json({ status: true, data: newUser, message:"Account Created Successfully"});
        }

    }catch(e){
        res.json({success :false , message : e})
    }
};

const logIn = async (req, res) =>{
    const {email, password} = req.body;
    const user = await UserModel.findOne({email: email});
    try{if(!user){
        return res.json({success :false , message :"User not found"});
    }
        const passwodMatched = bcrypt.compare(password , user.password)
    if(!passwodMatched){
        return res.json({success :false , message :"Password didn't macth"});
    }
    return res.json({success :true, data: user, message :"Login Successfully"});
}catch(e){
        return res.json({success:false , message : e});
    }
}


module.exports={
    createAccount,
    logIn
}