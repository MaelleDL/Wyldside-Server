module.exports = (sequelize, DataTypes) => {
    const Forfait= sequelize.define('Forfait', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      duration: {
        type: DataTypes.STRING,
        allowNull: false,
        unique:{
          msg:'La durée existe déjà.'
        },
        validate:{
          notEmpty:{msg: 'La durée ne peut pas être vide'},
          notNull:{msg: 'La durée est une propriété requise.'}
        }
      }
    },
    {
        timestamps: false,
        createdAt: false,
        updatedAt: false
      } 
    );

    Forfait.associate=models=>{
      Forfait.belongsToMany(models.Course, {through:"Course_forfait", as:"Courses", foreignKey:"forfait_id"});
      Forfait.hasMany(models.Offer);
  }



    return Forfait;
  }