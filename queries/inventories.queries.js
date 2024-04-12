const db = require("../db.js");

const Inventory = db.inventories;
const keysArr = ["itemId", "quantity", "unit", "expiryDate"];
keysArr.sort();

// INVENTARIO: LISTAR, CREAR NUEVO, MODIFICAR, MODIFICAR PARCIALMENTE, ELIMINAR, FILTAR POR ID
// Validate that the inventory exist to delete/edit/partial edit
const isTheSameArray = (currentValue) => currentValue === keysArr;
const validateInventory = (inventory) => {
  if(!inventory){
    return res.status(400).json({
      msg : "Bad request",
      status : 400,
      body : "Impossible to find the given id"
    });  
  }
}
// listar
const getInventories = async (req, res) => {
  try {
      const inventories = await Inventory.findAll();
      res.json(inventories);
  } catch (error) {
    res.status(500).json({ message: error.message });
}
};

const getInventory = async (req, res) => {
  try {
    const ID = req.params.id
    const getInventory = await Inventory.findOne(
      {
        where: {
          id : ID
        }
      });
    return res.status(200).json({
      ok : true,
      status : 200,
      body : getInventory
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// Crear nuevo
const createInventory = async (req, res) => {
  try { 
    /*
    const itemID = req.body.itemId;
    console.log(itemID);
    const foundInventory = await Inventory.findAll(
      {
        where: {
          itemId : itemID
        }
      })
      console.log(foundInventory);
    if(foundInventory.length) {
      res.status(400).json({
        msg : "Bad request",
        status : 400,
        body : "name already exist"
      });
      return;
    }*/ 
    const inventory = await Inventory.create(req.body);
    return res.json(inventory);
    
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

//modificar
const editInventory = async (req, res) => {
  try {
    const keysReq = Object.keys(req.body);
    keysReq.sort();
    // if(!keysReq.every(isTheSameArray)){
    //     res.status(400).json({
    //       msg : "Bad request",
    //       status : 400,
    //       body : "Missing parameters"
    //     });
    //     return;
    //   }
    const id = req.params.id
    const updateInventory = await Inventory.update(
      req.body,
      {
        where: {
          id : id
        }
      });
    validateInventory(updateInventory);
    return res.status(200).json({
      ok : true,
      status : 200,
      body : updateInventory
    });
  }
  catch(error){
    return res.status(500).json({ message: error.message });
  }
};

// modificar parcialmente
const partialEditInventory = async (req, res) => {
  try {
    const id = req.params.id
    const updateInventory = await Inventory.update(
      req.body,
      {
        where: {
          id : id
        }
      });
    validateInventory(updateInventory);
    return res.status(200).json({
      ok : true,
      status : 200,
      body : updateInventory
    });
  }
  catch(error){
    return res.status(500).json({ message: error.message });
  }
};

//eliminar
const deleteInventory = async (req, res) => {
  try{
    const id = req.params.id
    const deleteInventory = await Inventory.destroy({
      where:{
        id : id
      }
    });
    validateInventory(deleteInventory);
    return res.status(200).json({
      ok : true,
      status : 200,
      body : deleteInventory
    });
  } catch (error){
    return res.status(500).json({ message: error.message });
  }
}

  module.exports = {
    getInventories,
    createInventory,
    editInventory,
    partialEditInventory,
    deleteInventory,
    getInventory
  };