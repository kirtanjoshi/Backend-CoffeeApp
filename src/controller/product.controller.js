const ProductModel =require('../models/products.model')

const CreateProduct = async (req ,res) => {
    try {
        const productData = req.body;
        const newProduct = new ProductModel(productData);
        await newProduct.save();
        return res.json({status :true , data : newProduct , message : "Product created successfully"});
    } catch (error) {
        return res.json({status :false , message : error.message});
    }
    
}

const fetchProduct = async (req ,res) => {
    try {
        const products =  await ProductModel.find();
        return res.json({status :true , data : products , message : "Product fetched successfully"});
    } catch (error) {
        return res.json({status :false , message : error.message});
    }
    
}
const fetchProductByCategory = async (req ,res) => {
    try {
        const Categoryid = req.params.id;
        const products =  await ProductModel.find({category : Categoryid});
        return res.json({status :true , data : products , message : "Product fetched successfully"});
    } catch (error) {
        return res.json({status :false , message : error.message});
    }
    
}

module.exports ={
    CreateProduct,
    fetchProduct ,
    fetchProductByCategory
}