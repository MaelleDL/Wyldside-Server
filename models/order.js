module.exports = (sequelize, DataTypes) => {
    const Order=sequelize.define('Order', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      }
    },
    {
        timestamps: true,
        createdAt: true,
        updatedAt: false
      } 
    )

    Order.associate=models=>{
        Order.belongsToMany(models.Offer, {through: "Offer_order", as: "Offers", foreignKey:"order_id"});
        Order.belongsTo(models.User);
    }

    return Order;
  }