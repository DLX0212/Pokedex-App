import connection from "../utils/DbConnection.js";
import { DataTypes } from "sequelize";

const pokemones = connection.define('pokemones',{
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    foto: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    regionId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: "regiones",
            key: "id",
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
    },
    tipoPrimarioId: {
        type: DataTypes.INTEGER,
        allowNull: false,
                references: {
            model: "tipos",
            key: "id",
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
    },
    tipoSecundarioId: {
        type: DataTypes.INTEGER,
        allowNull: false,
                references: {
            model: "tipos",
            key: "id",
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
    }

},
{
    tableName: 'Pokemones',
  },)

export default pokemones;