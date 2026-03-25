import { Sequelize } from "sequelize";
import path from "path";
import { projectRoot } from "./paths.js";
import dotenv from "dotenv";


dotenv.config();
const env = process.env.NODE_ENV || 'development';

let connection;

if (env === 'development') {
    connection = new Sequelize("sqlite:db.sqlite", {
        dialect: "sqlite",
        storage: path.join(projectRoot, "database", "pokemones.sqlite")
    });
    console.log("Conectando a la BD Dev");

} else if (env === 'qa') {
    connection = new Sequelize(
        process.env.QA_DB_NAME,
        process.env.QA_DB_USER,
        process.env.QA_DB_PASS,
        {
            host: process.env.QA_DB_HOST,
            dialect: process.env.QA_DB_DIALECT,
            port: 3306
        }
    );
    console.log("Conectando a la BD QA");
}

export default connection;