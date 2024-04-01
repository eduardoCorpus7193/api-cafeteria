const db = require("../db.js")

//Queries for the menu
const menuItems = db.menuItems;
const keysArr = ["id", "name", "description", "price", "size", "categoryId", "created_at", "updated_at", "deleted_at"];
keysArr.sort();

// Validate that the employee exist to delete/edit/partial edit
const isTheSameArray = (currentValue) => currentValue === keysArr;
const validateItem = (item) => {
  if(!employee){
    return res.status(400).json({
      msg : "Bad request",
      status : 400,
      body : "Impossible to find the given data"
    });  
  }
}


const getItems = async (req, res) => {
    try {
        const items = await menuItems.findAll()
        res.json(items)
    } catch (error) {
        res.status(500).json({ message: error.message})
    }
}
const getItem = async (req, res) => {
    try{
      const id = req.params.id
      const getItem = await menuItems.findAll(
        {
        where:{
          id : id
        }
        })
        }  catch (error) {
            res.status(500).json({ message: error.message})
        }
    }
const createItem = async (req, res) => {
    try {
        const itemName = req.body.name
        const foundItem = await menuItems.findAll(
          {
            where: {
              name : itemName
            }
          });
    
          console.log(foundItem);
        if(foundItem.length) {
          res.status(400).json({
            msg : "Bad request",
            status : 400,
            body : "Item already exist"
          });
          return;
        }
        const item = await menuItems.create(req.body);
        return res.json(item);
    }
    catch (error) {
    res.status(500).json({ message: error.message})
    }
}
module.exports = {
    getItems,
    getItems
}

