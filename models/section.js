module.exports = (sequelize, DataTypes) => {
    const Section= sequelize.define('Section', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique:{
          msg:'Le nom est déjà pris.'
        },
        validate:{
          notEmpty:{msg: 'Le nom ne peut pas être vide'},
          notNull:{msg: 'Le nom est une propriété requise.'}
        }
      },
      age_range: {
        type: DataTypes.STRING,
        allowNull: false,
        validate:{
          notEmpty:{msg: 'Le nom ne peut pas être vide'},
          notNull:{msg: 'Le nom est une propriété requise.'}
        }
      },
      competition_status: {
        type: DataTypes.STRING,
        allowNull: false,
        validate:{
            notEmpty:{msg: 'Le statut de competition ne peut pas être vide'},
            notNull:{msg: 'Le statut de competition est une propriété requise.'}
        }
      }
    },
    {
        timestamps: false,
        createdAt: false,
        updatedAt: false
      } 
    )

    Section.associate=models=>{
      Section.belongsTo(models.Course,
        {foreignKey:{
          allowNull:false
        }})
        Section.hasOne(models.Offer);
    }


    return Section;
  }