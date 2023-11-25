const mongoose = require('mongoose');

const {Schema , model} = mongoose;

const orderItemSchema = new Schema({
    product : {type :Map, required: true},
    quantity :{type : Number , default: 1}
})

const orderSchema = new Schema({
    user : {type :Map, required: true},
    items: {type:[orderItemSchema] , default : []},
    status : {type:String, default:"Order Placed"},
    updatedOn :{type: Date},
    createdOn :{type: Date},


});
orderSchema.pre('save',function(next){
    this.updatedOn = new Date();
    this.createdOn = new Date();
    next();
});

orderSchema.pre(['update', 'findOneUpdate' , 'updateOne'],function(next){
    const update = this.getUpdate()
    delete update._id;


    this.updatedOn = new Date();
    next();
});


const OrderModel = model('Order', orderSchema )

module.exports = OrderModel;