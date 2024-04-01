const express = require("express"); //Importa los módulos necesarios para crear el servidor
const app = express();   //crear el servidor
const port = 3000;  //puerto
const { getEmployees, createEmployee, editEmployee, deleteEmployee, partialEditEmployee } = require("./queries/employees.queries.js");
const { getCategories, createCategory, editCategory, deleteCategory, partialEditCategory } = require("./queries/categories.queries.js")
const bodyParser = require("body-parser");  //para analizar el cuerpo de las solicitudes HTTP entrantes
//const { Sequelize } = require('sequelize'); // Import the sequelize module

app.use(bodyParser.json()); //parsear el cuerpo de las solicitudes HTTP entrantes 

// Employees
app.get("/employee", (req, res) => {
    getEmployees(req, res);
  });
  
  app.post("/employee", (req, res) => {
    createEmployee(req, res);
  });
  
  app.put("/employee/:id", (req, res) => {
    editEmployee(req, res)
  })
  
  app.delete("/employee/:id", (req, res) => {
    deleteEmployee(req, res)
  })
  
  app.patch("/employee/:id", (req, res) => {
    partialEditEmployee(req, res)
  })
  
    // Categories 
  app.get("/category", (req, res) => {
    getCategories(req, res);
  });
  
  app.post("/category", (req, res) => {
    createCategory(req, res);
  });
  
  app.put("/category/:id", (req, res) => {
    editCategory(req, res)
  })
  
  app.delete("/category/:id", (req, res) => {
    deleteCategory(req, res)
  })
  
  app.patch("/category/:id", (req, res) => {
    partialEditCategory(req, res)
  })
  




  app.listen(port, () => {
    console.log(` app running on port ${port}`);
  }); 