const db = require("../db.js")

//Queries for the menu
const OrderItem = db.orderItems;
const keysArr = ["orderId", "itemId", "quantity", "subtotal"];
keysArr.sort();

// INVENTARIO: LISTAR, CREAR NUEVO, MODIFICAR, MODIFICAR PARCIALMENTE, ELIMINAR, FILTAR POR ID

// Validate that the menu item exist to delete/edit/partial edit
const isTheSameArray = (currentValue) => currentValue === keysArr;
const validateMenuItem = (menuItem) => {
  if(!menuItem){
    return res.status(400).json({
      msg : "Bad request",
      status : 400,
      body : "Impossible to find the given id"
    });  
  }
}

const getMenuItem = async (req, res) => {
  try {
    const ID = req.params.id
    const getMenuItem = await MenuItem.findOne(
      {
        where: {
          id : ID
        }
      });
    return res.status(200).json({
      ok : true,
      status : 200,
      body : getMenuItem
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getMenuItems = async (req, res) => {
  try {
    const menuItems = await MenuItem.findAll();
    res.json(menuItems);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createMenuItem = async (req, res) => {
  try {
    const Name = req.body.name;
    console.log(Name);
    const foundMenuItem = await MenuItem.findAll(
      {
        where: {
          name : Name
        }
      });

      console.log(foundMenuItem);
    if(foundMenuItem.length) {
      res.status(400).json({
        msg : "Bad request",
        status : 400,
        body : "Menu item already exist"
      });
      return;
    }
    const menuItem = await MenuItem.create(req.body);
    return res.json(menuItem);
    
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// --- Edit ---
const editMenuItem = async (req, res) => {
  try {
    const keysReq = Object.keys(req.body);
    keysReq.sort();
    if(!keysReq.every(isTheSameArray)){
        res.status(400).json({
          msg : "Bad request",
          status : 400,
          body : "Missing parameters"
        });
        return;
      }
    const id = req.params.id
    const updateMenuItem = await MenuItem.update(
      req.body,
      {
        where: {
          id : id
        }
      });
    validateBook(updateMenuItem);
    return res.status(200).json({
      ok : true,
      status : 200,
      body : updateMenuItem
    });
  }
  catch(error){
    return res.status(500).json({ message: error.message });
  }
}
// -- delete -- 
const deleteMenuItem = async (req, res) => {
  try{
    const id = req.params.id
    const deleteMenuItem = await MenuItem.destroy({
      where:{
        id : id
      }
    });
    validateMenuItem(deleteMenuItem);
    return res.status(200).json({
      ok : true,
      status : 200,
      body : deleteMenuItem
    });
  } catch (error){
    return res.status(500).json({ message: error.message });
  }
}

const partialEditMenuItem = async (req, res) => {
  try {
    const id = req.params.id
    const updateMenuItem = await MenuItem.update(
      req.body,
      {
        where: {
          id : id
        }
      });
    validateBook(MenuItemBook);
    return res.status(200).json({
      ok : true,
      status : 200,
      body : updateMenuItem
    });
  }
  catch(error){
    return res.status(500).json({ message: error.message });
  }
}

module.exports = {
  partialEditMenuItem,
  getMenuItems,
  createMenuItem,
  editMenuItem,
  deleteMenuItem,
  getMenuItem
};