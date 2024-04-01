module.exports = (sequelize, Sequelize) => {
    const MenuItem = sequelize.define(
        "menuItems",
      {
        id: {
          type: Sequelize.INTEGER.UNSIGNED,
          primaryKey: true,
          autoIncrement: true,
        },
        name: {
          type: Sequelize.VARCHAR(45),
          allowNull: true,
        },
        description: {
          type: Sequelize.VARCHAR(128),
          allowNull: true,
        },
        price: {
          type: Sequelize.INTEGER.UNSIGNED,
          allowNull: true,
        },
        size: {
          type: Sequelize.VARCHAR(45),
          allowNull: false,
        },
        categoryId: {
          type: Sequelize.INTEGER.UNSIGNED,
          allowNull: false,  
          unique: true,
          references: {
            model: 'category',
            kay: 'id'
          }
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
        tableName: "menuItems",
      }
    );

    return MenuItem;
  };
  