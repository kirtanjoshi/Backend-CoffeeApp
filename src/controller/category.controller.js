const CategoryModel = require('../models/catergory.model')



const createCategory = async (req, res) => {
    try {
        const categoryData = req.body;
        const newCategory = CategoryModel(categoryData);
        await newCategory.save();
        res.json({status: true , data : newCategory , message: "Category Created"});
    } catch (error) {
        return res.json({status : false , message : error});
    }
}

const fetchAllCategory = async (req, res) => {
    try {

        const categories = await CategoryModel.find();
        res.json({status: true , data : categories});
    } catch (error) {
        return res.json({status : false , message : error});
    }
}

const fetchCategoryById = async (req, res) => {
    try {
        const id = req.params.id;
        const foundcategories = await CategoryModel.findById(id);
        if(!foundcategories){
            return res.json({status : false , message : "Category Not Found"});
        }
       return res.json({status: true , data : foundcategories});
    } 
    catch (error) {
        return res.json({status : false , message : error});
    }
}


module.exports ={
    createCategory,
    fetchAllCategory ,
    fetchCategoryById
}