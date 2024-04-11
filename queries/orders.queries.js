const db = require("../db.js");

const Order = db.orders;
const keysArr = ["itemId", "quantity", "unit", "expiryDate"];
keysArr.sort();

// LISTAR, CREAR NUEVO, MODIFICAR, MODIFICAR PARCIALMENTE, ELIMINAR, FILTAR POR ID

// listar
const getOrders = async (req, res) => {
  try {
      const orders = await Order.findAll();
      res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
}
};

const getOrder = async (req, res) => {
  try {
    const ID = req.params.id
    const getOrder = await Order.findOne(
      {
        where: {
          id : ID
        }
      });
    return res.status(200).json({
      ok : true,
      status : 200,
      body : getOrder
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// Crear nuevo
const createOrder = async (req, res) => {
  try { 
    const Name = req.body.name;
    console.log(Name);
    const foundOrder = await Order.findAll(
      {
        where: {
          name : Name
        }
      });

      console.log(foundOrder);
    if(foundOrder.length) {
      res.status(400).json({
        msg : "Bad request",
        status : 400,
        body : "name already exist"
      });
      return;
    } 
    const order = await Order.create(req.body);
    return res.json(order);
    
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

//modificar
const editOrder = async (req, res) => {
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
    const updateOrder = await Order.update(
      req.body,
      {
        where: {
          id : id
        }
      });
    validateOrder(updateOrder);
    return res.status(200).json({
      ok : true,
      status : 200,
      body : updateOrder
    });
  }
  catch(error){
    return res.status(500).json({ message: error.message });
  }
};

// modificar parcialmente
const partialEditOrder = async (req, res) => {
  try {
    const id = req.params.id
    const updateOrder = await Order.update(
      req.body,
      {
        where: {
          id : id
        }
      });
    validateOrder(updateOrder);
    return res.status(200).json({
      ok : true,
      status : 200,
      body : updateOrder
    });
  }
  catch(error){
    return res.status(500).json({ message: error.message });
  }
};

//eliminar
const deleteOrder = async (req, res) => {
  try{
    const id = req.params.id
    const deleteOrder = await Order.destroy({
      where:{
        id : id
      }
    });
    validateOrder(deleteOrder);
    return res.status(200).json({
      ok : true,
      status : 200,
      body : deleteOrder
    });
  } catch (error){
    return res.status(500).json({ message: error.message });
  }
}

  module.exports = {
    getOrders,
    createOrder,
    editOrder,
    partialEditOrder,
    deleteOrder,
    getOrder
  };