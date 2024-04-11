const { Sequelize } = require('sequelize');

const sequelize = new Sequelize("cafeteria", "root", "", {   //CONECCION A LA BASE DE DATOS
    host: "localhost", //
    dialect: "mariadb" //
});

(async () => {
    try {
      await sequelize.authenticate();
      console.log("Connection has been established successfully.");
    } catch (error) {
      console.error("Unable to connect to the database:", error);
    }
  })();

const db = {};

db.sequelize = sequelize;  //acceso a la libreria
db.sequelize = Sequelize;  //acceso a la instancia

db.categories = require('./models/category.model.js')(sequelize, Sequelize);  //modelo de category
db.employees = require('./models/employee.model.js')(sequelize, Sequelize);  //modelo de employee
db.feedback = require('./models/feedback.model.js')(sequelize, Sequelize);  //modelo de feedback
db.inventories = require('./models/inventory.model.js')(sequelize, Sequelize);  //modelo de inventory
db.menuItems = require('./models/menuItem.model.js')(sequelize, Sequelize);  //modelo de menuItem
db.orderItems = require('./models/orderItem.model.js')(sequelize, Sequelize);  //modelo de orderItem
db.order = require('./models/order.model.js')(sequelize, Sequelize);  //modelo de order

module.exports = db;