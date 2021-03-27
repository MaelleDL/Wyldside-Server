module.exports = (sequelize, DataTypes) => {
    const Offer_order=sequelize.define('Offer_order', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      quantity:{
        type: DataTypes.INTEGER,
        allowNull: true,
      }
    },
    {
        timestamps: false,
        createdAt: false,
        updatedAt: false
      } 
    )

    return Offer_order;
  }