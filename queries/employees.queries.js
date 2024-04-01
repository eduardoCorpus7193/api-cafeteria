const db = require("../db.js");

const Employee = db.employees;
const keysArr = ["name", "RFC", "position", "phone"];
keysArr.sort();

// Validate that the employee exist to delete/edit/partial edit
const isTheSameArray = (currentValue) => currentValue === keysArr;
const validateEmployee = (employee) => {
  if(!employee){
    return res.status(400).json({
      msg : "Bad request",
      status : 400,
      body : "Impossible to find the given data"
    });  
  }
}


const getEmployees = async (req, res) => {
  try {
    const employees = await Employee.findAll();
    res.json(employees);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getEmployee = async (req, res) => {
  try {
    const ID = req.params.id
    const getEmployee = await Employee.findOne(
      {
        where: {
          id : ID
        }
      });
    return res.status(200).json({
      ok : true,
      status : 200,
      body : getEmployee
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

/* 
{
    "name": "Jhon Doe",
    "RFC": "JDCO000809",
    "position": "Seller",
    "phone": "4491234578"
}
*/


const createEmployee = async (req, res) => {
  try { 
    const rfc = req.body.RFC;
    console.log(rfc);
    const foundEmployee = await Employee.findAll(
      {
        where: {
          RFC : rfc
        }
      });

      console.log(foundEmployee);
    if(foundEmployee.length) {
      res.status(400).json({
        msg : "Bad request",
        status : 400,
        body : "RFC already exist"
      });
      return;
    } 
    const employee = await Employee.create(req.body);
    return res.json(employee);
    
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// --- Edit ---
const editEmployee = async (req, res) => {
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
    const updateEmployee = await Employee.update(
      req.body,
      {
        where: {
          id : id
        }
      });
    validateEmployee(updateEmployee);
    return res.status(200).json({
      ok : true,
      status : 200,
      body : updateEmployee
    });
  }
  catch(error){
    return res.status(500).json({ message: error.message });
  }
}
// -- delete -- 
const deleteEmployee = async (req, res) => {
  try{
    const id = req.params.id
    const deleteEmployee = await Employee.destroy({
      where:{
        id : id
      }
    });
    validateEmployee(deleteEmployee);
    return res.status(200).json({
      ok : true,
      status : 200,
      body : deleteEmployee
    });
  } catch (error){
    return res.status(500).json({ message: error.message });
  }
}

const partialEditEmployee = async (req, res) => {
  try {
    const id = req.params.id
    const updateEmployee = await Employee.update(
      req.body,
      {
        where: {
          id : id
        }
      });
    validateEmployee(updateEmployee);
    return res.status(200).json({
      ok : true,
      status : 200,
      body : updateEmployee
    });
  }
  catch(error){
    return res.status(500).json({ message: error.message });
  }
}

  module.exports = {
    partialEditEmployee,
    getEmployees,
    createEmployee,
    editEmployee,
    deleteEmployee,
    getEmployee
  };