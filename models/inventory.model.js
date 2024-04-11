module.exports = (sequelize, Sequelize) => {
    const Inventory = sequelize.define(
        "inventory",
      {
        id: {
          type: Sequelize.INTEGER.UNSIGNED,
          primaryKey: true,
          autoIncrement: true,  
        },
        itemId: {
          type: Sequelize.INTEGER.UNSIGNED,
          allowNull: false,  
          unique: true,
          references: {
            model: 'menuItems',    //
            key: 'id'
          }
        },
        quantity: {
          type: Sequelize.INTEGER.UNSIGNED,
          allowNull: false,
        },
        unit: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        expiryDate: {
          type: Sequelize.DATE,
          allowNull: false,
        },
        created_at: {
          type: Sequelize.DATE,
          allowNull: false,
          defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        },
        updated_at: {
          type: Sequelize.DATE,
          allowNull: false,
          defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
          onUpdate: Sequelize.literal('CURRENT_TIMESTAMP'),
        },
        deleted_at: {
          type: Sequelize.DATE,
          allowNull: true,
          defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
          onUpdate: Sequelize.literal('CURRENT_TIMESTAMP'),
        }
      },
      {
        timestamps: false,    
        freezeTableName: true,
        tableName: "inventory",
      }
    );
    
    return Inventory;
  };
  