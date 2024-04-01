module.exports = (sequelize, Sequelize) => {
    const Employee = sequelize.define(
            "employees",
            {
            id: {
                type: Sequelize.INTEGER.UNSIGNED,
                primaryKey: true,
                autoIncrement: true,
            },
            name: {
                type: Sequelize.STRING,
            },
            RFC: {
                type: Sequelize.STRING,
            }, 
            position: {
                type: Sequelize.STRING,
            },
            phone: {
                type: Sequelize.STRING,
            },
            created_at: {
                type: Sequelize.DATE,
                defaultValue: Sequelize.NOW,
            },
            updated_at: {
                type: Sequelize.DATE,
                defaultValue: Sequelize.NOW,
                onUpdate: Sequelize.NOW,
            },
            deleted_at: {
                type: Sequelize.DATE
            }
        },      
        {
        timestamps: false,    
        freezeTableName: true,
        tableName: "employees",
        }
    );

  return Employee;
  };
