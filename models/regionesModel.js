import connection from "../utils/DbConnection.js";
import { DataTypes } from "sequelize";

const regiones = connection.define('regiones',{
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    }
    }, {
    tableName: 'Regiones',
  },);

    export default regiones;