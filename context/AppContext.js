import connection from "../utils/DbConnection.js";
import pokemonesModel from "../models/pokemonesModel.js";
import regionesModel from "../models/regionesModel.js";
import tiposModel from "../models/tiposModel.js";
import { Sequelize } from "sequelize";

//relacion con regiones
pokemonesModel.belongsTo(regionesModel, {foreignKey: "regionId", as: "region"});
regionesModel.hasMany(pokemonesModel, {foreignKey: "regionId"});

//relacion con tipos
pokemonesModel.belongsTo(tiposModel, {foreignKey: "tipoPrimarioId", as: "tipoPrimario"});
pokemonesModel.belongsTo(tiposModel, {foreignKey: "tipoSecundarioId", as: "tipoSecundario"});
tiposModel.hasMany(pokemonesModel, {foreignKey: "tipoPrimarioId"});
tiposModel.hasMany(pokemonesModel, {foreignKey: "tipoSecundarioId"});

export default {
    Sequelize: connection,
    pokemonesModel,
    regionesModel,
    tiposModel
};