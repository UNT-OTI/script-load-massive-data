const { DataTypes } = require('sequelize');
const sequelize = require('@/config/database');

const Estudiante = sequelize.define('estudiante', {
    id_estudiante: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    est_codigo: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    est_nombres: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    est_apellidos: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    est_escuela: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    est_sexo: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    est_domicilio: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    est_sede: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    est_estado: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    creation_date: {
        type: DataTypes.DATE,
        allowNull:false,
        defaultValue: DataTypes.NOW,
    },
}, {
    tableName: 'estudiante',
    timestamps: false,
    freezeTableName: true,
});

module.exports = Estudiante;
