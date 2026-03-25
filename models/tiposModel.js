import connection from "../utils/DbConnection.js";
import { DataTypes } from "sequelize";

const tipos = connection.define('tipos',{
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
    }, 
    {
    tableName: 'Tipos',
  },);

    export default tipos;