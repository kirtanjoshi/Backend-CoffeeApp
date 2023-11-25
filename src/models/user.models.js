const  mongoose = require('mongoose');  
const db = require('../db/conn');
const uuid = require('uuid');
const bcrypt = require('bcrypt');

const{Schema} = mongoose;

const userSchema = new Schema({
    id :{type: String, unique: true},
    fullName :{type: String, default:""},
    phoneNumber :{type: String, default:""},
    address :{type: String, default:""},
    email :{type:String , required:true, unique:true},
    password :{type: String, required: true, unique:true},
    profileProgress:{type:Number , default:0},
    updatedOn:{type: Date},
    createdOn:{type: Date},

});

userSchema.pre('save',function(next){
    this.id = uuid.v1();
    this.updatedOn = new Date();
    this.createdOn = new Date();



      //Hashed Password
      const salt = bcrypt.genSaltSync(10); 
      const hash = bcrypt.hashSync(this.password, salt);
      this.password = hash;
    next();
});

userSchema.pre(['update', 'findOneUpdate' , 'updateOne'],function(next){
    const update = this.getUpdate()
    delete update.id;
    delete update._id;


  

    this.updatedOn = new Date();
    next();
});


const UserModel = mongoose.model('User', userSchema);

module.exports = UserModel;