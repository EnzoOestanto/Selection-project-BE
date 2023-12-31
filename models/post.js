'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      post.belongsTo(models.user,{
        foreignKey: 'user_id'
      })
      post.hasMany(models.like,{
        foreignKey: 'post_id'
      })
    }
  }
  post.init({
    user_id: DataTypes.INTEGER,
    image: DataTypes.STRING,
    text: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'post',
  });
  return post;
};