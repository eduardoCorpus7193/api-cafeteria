module.exports = (sequelize, Sequelize) => {  
    const OrderItem = sequelize.define(
        "orderItems",
      {
        id: {
          type: Sequelize.INTEGER.UNSIGNED,
          primaryKey: true,
          autoIncrement: true,
        },
        orderId : {
          type: Sequelize.INTEGER.UNSIGNED,
          allowNull: false, 
          unique: true,
          references: {
            model: 'orders',
            kay: 'id'
          }
        },
        itemId: {
          type: Sequelize.INTEGER.UNSIGNED,
          allowNull: false,  
          unique: true,
          references: {
            model: 'menuItems',
            kay: 'id'
          }
        },
        quantity: {
          type: Sequelize.INTEGER.UNSIGNED,
          allowNull: false,
        },
        subtotal: {
          type: Sequelize.INTEGER.UNSIGNED,
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
        tableName: "orderItems",
      }
    );

    return OrderItem;
  };
  