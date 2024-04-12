const db = require("../db.js");

const Category = db.categories;
const keysArr = ["name", "description"];
keysArr.sort();

const isTheSameArray = (currentValue) => currentValue === keysArr;
const validateCategory = (category) => {
  if(!category){
    return res.status(400).json({
      msg : "Bad request",
      status : 400,
      body : "Impossible to find the given id"
    });  
  }
}

const getCategories = async (req, res) => {
  try {
    const categories = await Category.findAll();
    res.json(categories);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getCategory = async (req, res) => {
  try {
    const ID = req.params.id
    const getCategory = await Category.findOne(
      {
        where: {
          id : ID
        }
      });
    return res.status(200).json({
      ok : true,
      status : 200,
      body : getCategory
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const createCategory = async (req, res) => {
  try {
    const Name = req.body.name;
    console.log(Name);
    const foundCategory = await Category.findAll(
      {
        where: {
          name : Name
        }
      });
      console.log(foundCategory);
    if(foundCategory.length) {
      res.status(400).json({
        msg : "Bad request",
        status : 400,
        body : "Category already exist"
      });
      return;
    }
    const category = await Category.create(req.body);
    return res.json(category);
    
  } catch (error) {
    return res.status(500).json({ 
      msg: "Internal server error",
      message: error.message 
    });
  }
};

// --- Edit ---
const editCategory = async (req, res) => {
  try {
    const keysReq = Object.keys(req.body);
    keysReq.sort();
    //if(!keysReq.every(isTheSameArray)){
      //  res.status(400).json({
       //   msg : "Bad request",
        //  status : 400,
        //  body : "Missing parameters category"
        //});
       // return;
      //}
    const id = req.params.id
    const updateCategory = await Category.update(
      req.body,
      {
        where: {
          id : id
        }
      });
    validateCategory(updateCategory);
    return res.status(200).json({
      ok : true,
      status : 200,
      body : updateCategory
    });
  }
  catch(error){
    return res.status(500).json({ message: error.message });
  }
}
// -- delete -- 
const deleteCategory = async (req, res) => {
  try{
    const id = req.params.id
    const deleteCategory = await Category.destroy({
      where:{
        id : id
      }
    });
    validateCategory(deleteCategory);
    return res.status(200).json({
      ok : true,
      status : 200,
      body : deleteCategory
    });
  } catch (error){
    return res.status(500).json({ message: error.message });
  }
}

const partialEditCategory = async (req, res) => {
  try {
    const id = req.params.id
    const updateCategory = await Category.update(
      req.body,
      {
        where: {
          id : id
        }
      });
    validateCategory(updateCategory);
    return res.status(200).json({
      ok : true,
      status : 200,
      body : updateCategory
    });
  }
  catch(error){
    return res.status(500).json({ message: error.message });
  }
}

module.exports = {
  partialEditCategory,
  getCategories,
  createCategory,
  editCategory,
  deleteCategory,
  getCategory
}