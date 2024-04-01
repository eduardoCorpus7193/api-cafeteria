const express = require("express"); //Importa los módulos necesarios para crear el servidor
const app = express();   //crear el servidor
const port = 3000;  //puerto

const { getEmployee, getEmployees, createEmployee, editEmployee, deleteEmployee, partialEditEmployee } = require("./queries/employees.queries.js");
const { getCategory, getCategories, createCategory, editCategory, deleteCategory, partialEditCategory } = require("./queries/categories.queries.js");
const { getMenuItem, getMenuItems, createMenuItem, editMenuItem, deleteMenuItem, partialEditMenuItem } = require("./queries/menuItems.queries.js");
const { getInventory, getInventories, createInventory, editInventory, partialEditInventory, deleteInventory } = require("./queries/inventories.queries.js");

const bodyParser = require("body-parser");  //para analizar el cuerpo de las solicitudes HTTP entrantes
//const { Sequelize } = require('sequelize'); // Import the sequelize module

app.use(bodyParser.json()); //parsear el cuerpo de las solicitudes HTTP entrantes 

// Employees
app.get("/employee/:id", (req, res) => {
  getEmployee(req, res);
});

app.get("/employee", (req, res) => {
  getEmployees(req, res);
});
  
app.post("/employee", (req, res) => {
  createEmployee(req, res);
});
  
app.put("/employee/:id", (req, res) => {
  editEmployee(req, res)
});
  
app.delete("/employee/:id", (req, res) => {
  deleteEmployee(req, res)
});
  
app.patch("/employee/:id", (req, res) => {
  partialEditEmployee(req, res)
});
  
  // Categories 
app.get("/category/:id", (req, res) => {
  getCategory(req, res);
});

app.get("/categories", (req, res) => {
  getCategories(req, res);
});
  
app.post("/category", (req, res) => {
  createCategory(req, res);
});
  
app.put("/category/:id", (req, res) => {
  editCategory(req, res)
});
  
app.delete("/category/:id", (req, res) => {
  deleteCategory(req, res)
});
  
app.patch("/category/:id", (req, res) => {
  partialEditCategory(req, res)
});
    
// Menu Items
app.get("/menuItem/:id", (req, res) => {
  getMenuItem(req, res);
});
  
app.get("/menuItems", (req, res) => {
  getMenuItems(req, res);
});

app.post("/menuItem", (req, res) => {
  createMenuItem(req, res);
});
  
app.put("/menuItem/:id", (req, res) => {
  editMenuItem(req, res)
});
  
app.delete("/menuItem/:id", (req, res) => {
  deleteMenuItem(req, res)
});
  
app.patch("/menuItem/:id", (req, res) => {
  partialEditMenuItem(req, res)
});

//Inventories
app.get("/inventory/:id", (req, res) => {
  getInventory(req, res);
});

app.get("/inventories", (req, res) => {
  getInventories(req, res);
});
  
app.post("/inventory", (req, res) => {
  createInventory(req, res);
});
  
app.put("/inventory/:id", (req, res) => {
  editInventory(req, res)
});
  
app.delete("/inventory/:id", (req, res) => {
  partialEditInventory(req, res)
});
  
app.patch("/inventory/:id", (req, res) => {
  deleteInventory(req, res)
});




app.listen(port, () => {
  console.log(` app running on port ${port}`);
}); 