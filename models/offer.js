module.exports = (sequelize, DataTypes) => {
    const Offer=sequelize.define('Offer', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      price: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate:{
          notEmpty:{msg: 'Le prix ne peut pas être vide'},
          notNull:{msg: 'Le prix est une propriété requise.'}
        }
      }
    },
    {
        timestamps: false,
        createdAt: false,
        updatedAt: false
      } 
    )

    Offer.associate=models=>{
        Offer.belongsTo(models.Course);
        Offer.belongsTo(models.Section);
        Offer.belongsTo(models.Forfait);
        Offer.belongsToMany(models.Order, {through: "Offer_order", as: "Orders", foreignKey:"Offer_id"});
    }

    return Offer;
  }