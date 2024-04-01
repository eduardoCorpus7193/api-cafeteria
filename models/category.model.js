module.exports = (sequelize, Sequelize) => {
    const Category = sequelize.define(
      "category", 
      {
        id: {
          type: Sequelize.INTEGER.UNSIGNED,
          primaryKey: true,
          autoIncrement: true,
        },
        name: {
          type: Sequelize.STRING,
        },
        description: {
          type: Sequelize.STRING,
        },
        created_at: {
          type: Sequelize.DATE,
          defaultValue: Sequelize.NOW,
        },
        updated_at: {
          type: Sequelize.DATE,
          defaultValue: Sequelize.NOW,
        },
        deleted_at: {
          type: Sequelize.DATE,
        }
      },
      {
        timestamps: false,    
        freezeTableName: true,
        tableName: "category",
      }
    );

    return Category;
  };
  