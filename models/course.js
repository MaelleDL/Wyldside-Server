module.exports = (sequelize, DataTypes) => {
    const Course=sequelize.define('Course', {
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
      description: {
        type: DataTypes.STRING,
        allowNull: false,
        validate:{
          notEmpty:{msg: 'Le nom ne peut pas être vide'},
          notNull:{msg: 'Le nom est une propriété requise.'}
        }
      },
      image_path: {
        type: DataTypes.STRING,
        allowNull: false,
        validate:{
          isUrl:{msg: `Utilisez uniquement une URL valide pour l'image`},
          notNull:{msg: `L'image est une propriété requise.`}
        }
      },
    },
    {
        timestamps: false,
        createdAt: false,
        updatedAt: false
      } 
    )

    Course.associate=models=>{
        Course.hasMany(models.Section);
        Course.belongsToMany(models.Forfait, {through:"Course_forfait", as:"Forfaits", foreignKey:"course_id"});
        Course.hasOne(models.Offer);
    }

    return Course;
  }