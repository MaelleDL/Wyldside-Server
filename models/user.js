module.exports = (sequelize, DataTypes) => {
    return sequelize.define('User', {
      id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      surname:{
        type: DataTypes.STRING,
        allowNull: false,
      },
      name:{
        type: DataTypes.STRING,
        allowNull: false,
      },
      mail:{
        type: DataTypes.STRING,
        allowNull: false,
        unique:{
          msg:'Cette adresse mail est déjà liée à un compte.'
        },
      },
      phone:{
        type: DataTypes.STRING,
        allowNull: false,
      },
      password:{
        type: DataTypes.STRING,
        allowNull: false,
      },
      role:{
        type: DataTypes.STRING,
        defaultValue: "VISITOR",
      }
    },
    {
        timestamps: false,
        createdAt: false,
        updatedAt: false
      } 
    )
  }