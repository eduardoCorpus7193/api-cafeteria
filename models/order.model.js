module.exports = (sequelize, Sequelize) => {
    const Order = sequelize.define(
        "orders",
      {
        id: {
          type: Sequelize.INTEGER.UNSIGNED,
          primaryKey: true,
          autoIncrement: true,
        },
        totalAmount: {
          type: Sequelize.INTEGER.UNSIGNED,
          allowNull: true,
        },
        clientName: {
          type: Sequelize.STRING,
          allowNull: true,
        },
        orderStatus: {
          type: Sequelize.STRING,
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
        tableName: "orders",
      }
    );

    return Order;
  };
  