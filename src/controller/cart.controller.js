const CartModel = require('../models/cart.model')


const getCartFormUser= async function(req, res) {
    try {
        const user = req.params.user;
        const foundCart = await CartModel.findOne({ user: user });

        if(!foundCart) {
            return res.json({ success: true, data: [] });
        }

        return res.json({ success: true, data: foundCart.items });
    }
    catch(ex) {
        return res.json({ success: false, message: ex });
    }
}



const addToCart =async (req, res)=>{
    try {
        const {product, user , quantity } = req.body;
        const foundCart = await CartModel.findOne({user: user});

        //If cart already exists
        if(!foundCart) {
            const newCart  = new CartModel({
                user: user,
            });
            newCart.items.push({
                product: product,
                quantity: quantity
            });
            await newCart.save();
           return res.json({success:true , data : newCart, message: 'Cart added successfully'});
        }

        //If cart already exists
       const updatedCart =  await CartModel.findOneAndUpdate(
            {user: user},
            {$push : {items :{product: product, quantity: quantity}}},
            {new : true}
        
        );
        res.json({success:true , data : updatedCart, message: 'Cart added successfully'});

    } catch (error) {
        return res.json({status: false, message: error})
    }
}
    
const removeFromCart = async (req, res) => {
    try {
        const {user, product} = req.body;
        const updatedCart = await CartModel.findOneAndUpdate(
            { user: user },
                { $pull: { items: { product: product } } },
                { new: true }
        )
        return res.json({ success: true, data: updatedCart.items, message: "Product removed from cart" });
    } catch (error) {
        return res.json({status: false, message: error})
    }
}


module.exports={
    addToCart,
    removeFromCart,
    getCartFormUser
}