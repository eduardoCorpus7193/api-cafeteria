const db = require("../db.js");

const Inventory = db.employees;
const keysArr = ["itemId", "quantity", "unit", "expiryDate"];
keysArr.sort();

//INVENTARIO: CREAR NUEVO, MODIFICAR, ELIMINAR, LISTAR, FILTAR POR ID

// Crear nuevo
const gatInventoris = async (req, res) => {
    try {
        const inventorys = await Inventory.findAll();
        res.status(200).json({ status: 200, data: books });
    } catch (error) {
        res.status(500).json({ status: 500, message: error.message });
  }
};

const getEmployees = async (req, res) => {
    try {
      const employees = await Employee.findAll();
      res.json(employees);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };


  module.exports = {
    gatInventoris
  };