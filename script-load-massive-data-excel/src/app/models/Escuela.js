const { DataTypes } = require('sequelize');
const sequelize = require('@/config/database');

const Escuela = sequelize.define(
  'Escuela',
  {
    id_escuela: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    esc_sga_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    esc_nombre: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    esc_facultad: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true      
    },
    esc_estado: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    tableName: 'escuela',
    timestamps: false,
  }
);

module.exports = Escuela;
