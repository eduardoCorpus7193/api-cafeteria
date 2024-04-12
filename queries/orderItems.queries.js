const db = require("../db.js")

//Queries 
const OrderItem = db.orderItems;
const Inventory = db.inventories;
const keysArr = ["orderId", "itemId", "quantity", "subtotal"];
keysArr.sort();

// INVENTARIO: LISTAR, CREAR NUEVO, MODIFICAR, MODIFICAR PARCIALMENTE, ELIMINAR, FILTAR POR ID

const isTheSameArray = (currentValue) => currentValue === keysArr;
const validateOrderItem = (orderItem) => {
  if(!orderItem){
    return res.status(400).json({
      msg : "Bad request",
      status : 400,
      body : "Impossible to find the given id"
    });  
  }
}

const getOrderItem = async (req, res) => {
  try {
    const ID = req.params.id
    const getOrderItem = await OrderItem.findOne(
      {
        where: {
          id : ID
        }
      });
    return res.status(200).json({
      ok : true,
      status : 200,
      body : getOrderItem
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getOrderItems = async (req, res) => {
  try {
    const orderItems = await OrderItem.findAll();
    res.json(orderItems);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/*
{
    "orderId": "1",
    "itemId": "5",
    "quantity": "2",
    "subtotal": "40"
}
*/

const createOrderItem = async (req, res) => {
  try {
    const ID = req.body.itemId;
    console.log(ID);
    const foundInventory = await Inventory.findOne(
      {
        where: {
          itemId : ID
        }
      });
      console.log(foundInventory);
      const Quantity = req.body.quantity;
      console.log(Quantity);
      await foundInventory.decrement(['quantity'], { by: Quantity });
    const orderItem = await OrderItem.create(req.body);
    return res.json(orderItem);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// --- Edit ---
const editOrderItem = async (req, res) => {
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
    const updateOrderItem = await OrderItem.update(
      req.body,
      {
        where: {
          id : id
        }
      });
    validateOrderItem(updateOrderItem);
    return res.status(200).json({
      ok : true,
      status : 200,
      body : updateOrderItem
    });
  }
  catch(error){
    return res.status(500).json({ message: error.message });
  }
}
// -- delete -- 
const deleteOrderItem = async (req, res) => {
  try{
    const id = req.params.id
    const deleteOrderItem = await OrderItem.destroy({
      where:{
        id : id
      }
    });
    validateOrderItem(deleteOrderItem);
    return res.status(200).json({
      ok : true,
      status : 200,
      body : deleteOrderItem
    });
  } catch (error){
    return res.status(500).json({ message: error.message });
  }
}

const partialEditOrderItem = async (req, res) => {
  try {
    const id = req.params.id
    const updateOrderItem = await OrderItem.update(
      req.body,
      {
        where: {
          id : id
        }
      });
    validateOrderItem(OrderItem);
    return res.status(200).json({
      ok : true,
      status : 200,
      body : updateOrderItem
    });
  }
  catch(error){
    return res.status(500).json({ message: error.message });
  }
}

module.exports = {
  partialEditOrderItem,
  getOrderItems,
  createOrderItem,
  editOrderItem,
  deleteOrderItem,
  getOrderItem
};