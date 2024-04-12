const express = require("express"); //Importa los módulos necesarios para crear el servidor
const app = express();   //crear el servidor
const port = 3000;  //puerto
const swaggerUi = require("swagger-ui-express")
const swaggerJsdoc = require("swagger-jsdoc")
const path = require("path")

const { getEmployee, getEmployees, createEmployee, editEmployee, deleteEmployee, partialEditEmployee } = require("./queries/employees.queries.js");
const { getCategory, getCategories, createCategory, editCategory, deleteCategory, partialEditCategory } = require("./queries/categories.queries.js");
const { getMenuItem, getMenuItems, createMenuItem, editMenuItem, deleteMenuItem, partialEditMenuItem, getMenuItemCategory } = require("./queries/menuItems.queries.js");
const { getInventory, getInventories, createInventory, editInventory, partialEditInventory, deleteInventory } = require("./queries/inventories.queries.js");
const { partialEditOrderItem, getOrderItems, createOrderItem, editOrderItem, deleteOrderItem, getOrderItem } = require("./queries/orderItems.queries.js");
const { getFeedback, getFeedbacks, createFeedback, deleteFeedback } = require("./queries/feedbacks.queries.js");
const { getOrders, createOrder, editOrder, partialEditOrder, deleteOrder, getOrder } = require("./queries/orders.queries.js");

const bodyParser = require("body-parser");  //para analizar el cuerpo de las solicitudes HTTP entrantes
//const { Sequelize } = require('sequelize'); // Import the sequelize module
const swaggerSpec = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Cafeteria API",
      version: "1.0.0"
    },
    servers: [
      {
        url: "https://localhost:3000"
      }
    ]
  },
  apis: [`${path.join(__dirname, "./index.js")}`]
}

app.use(bodyParser.json()); //parsear el cuerpo de las solicitudes HTTP entrantes 

app.use("/cafe-doc", swaggerUi.serve, swaggerUi.setup(swaggerJsdoc(swaggerSpec)))

// Employees
/**
 * @swagger
 * components:
 *  schemas:
 *    Employee:
 *      type: object
 *      properties: 
 *        name:
 *          type: string
 *          description: The name of the employee
 *        RFC:
 *          type: string
 *          description: The RFC of the employee
 *        position:
 *          type: string
 *          description: The position of the employee
 *        phone:
 *          type: string
 *          description: The phone number of the employee
 *      required:
 *        -name
 *        -RFC
 *        -position
 *        -phone
 *      example:
 *        name: Eduardo Corpus
 *        RFC: COXE960809
 *        position: Admin
 *        phone: 4495820032
 */


/**
 * @swagger
 * /employee/{id}:
 *  get:
 *    summary: Returns an employee
 *    tags: [Employee]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: integer
 *        required: true
 *        description: The employee id
 *    responses:
 *      200:
 *        description: Employee found
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              $ref: '#/components/schemas/Employee'
 *      404:
 *        description: Employee not found
 */
app.get("/employee/:id", (req, res) => {
  getEmployee(req, res);
});

/**
 * @swagger
 * /employee:
 *  get:
 *    summary: Returns all the employees
 *    tags: [Employee]
 *    responses:
 *      200:
 *        description: All employees
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/Employee'
 */
app.get("/employee", (req, res) => {
  getEmployees(req, res);
});
/**
 * @swagger
 * /employee:
 *  post:
 *    summary: Creates a new employee
 *    tags: [Employee]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            $ref: '#/components/schemas/Employee'
 *    responses:
 *      200:
 *        description: New employee created
 */
app.post("/employee", (req, res) => {
  createEmployee(req, res);
});
  

/**
 * @swagger
 * /employee/{id}:
 *  put:
 *    summary: Deletes an employee
 *    tags: [Employee]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: integer
 *        required: true
 *        description: The employee id
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            $ref: '#/components/schemas/Employee'
 *    responses:
 *      200:
 *        description: Employee deleted
 *      404:
 *        description: Employee not found
 */
app.put("/employee/:id", (req, res) => {
  editEmployee(req, res)
});
  

/**
 * @swagger
 * /employee/{id}:
 *  delete:
 *    summary: Deletes an employee
 *    tags: [Employee]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: integer
 *        required: true
 *        description: The employee id
 *    responses:
 *      200:
 *        description: Employee deleted
 *      404:
 *        description: Employee not found
 */
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
  editCategory(req, res);
});
  
app.delete("/category/:id", (req, res) => {
  deleteCategory(req, res);
});
  
app.patch("/category/:id", (req, res) => {
  partialEditCategory(req, res);
});
    

// Menu Items
app.get("/menuItem/:id", (req, res) => {
  getMenuItem(req, res);
});
  
//filter by category
app.get("/getMenuItemCategory/:id", (req, res) => {
  getMenuItemCategory(req, res);
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
  deleteInventory(req, res)  
});
  
app.patch("/inventory/:id", (req, res) => {
  partialEditInventory(req, res)
});


// Order Items
app.get("/orderItem/:id", (req, res) => {
  getOrderItem(req, res);
});
  
app.get("/orderItems", (req, res) => {
  getOrderItems(req, res);
});

app.post("/orderItem", (req, res) => {
  createOrderItem(req, res);
});
  
app.put("/orderItem/:id", (req, res) => {
  editOrderItem(req, res)
});
  
app.delete("/orderItem/:id", (req, res) => {
  deleteOrderItem(req, res)
});
  
app.patch("/orderItem/:id", (req, res) => {
  partialEditOrderItem(req, res)
});


//Feedbacks
app.get("/feedback/:id", (req, res) => {
  getFeedback(req, res);
});
  
app.get("/feedbacks", (req, res) => {
  getFeedbacks(req, res);
});

app.post("/feedback", (req, res) => {
  createFeedback(req, res);
});
  
app.delete("/feedback/:id", (req, res) => {
  deleteFeedback(req, res)
});


// Order 
app.get("/order/:id", (req, res) => {
  getOrder(req, res);
});
  
app.get("/order", (req, res) => {
  getOrders(req, res);
});

app.post("/order", (req, res) => {
  createOrder(req, res);
});
  
app.put("/order/:id", (req, res) => {
  editOrder(req, res)
});
  
app.delete("/order/:id", (req, res) => {
  deleteOrder(req, res)
});
  
app.patch("/order/:id", (req, res) => {
  partialEditOrder(req, res)
});



app.listen(port, () => {
  console.log(` app running on port ${port}`);
});