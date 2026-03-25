import express from 'express';
import {engine} from 'express-handlebars';
import path from 'path';
import sequelize from 'sequelize';
import { projectRoot } from './utils/paths.js';
import homeRoutes from './routes/home.js';
import pokemonesRoutes from './routes/pokemones.js';
import regionesRoutes from './routes/regiones.js';
import tiposRoutes from './routes/tipo.js';
import context from './context/AppContext.js'

const app = express();

//reder engine
app.engine('hbs', engine({
    layoutsDir: "views/layouts",
    defaultLayout: "main-layout",
    extname: "hbs"
}));
app.set('view engine', 'hbs');
app.set('views', 'views');


//root para boostrap
app.use(express.static(path.join(projectRoot, "public")));
app.use(express.urlencoded({ extended: true }));

//routes
app.use(homeRoutes);
app.use("/pokemones", pokemonesRoutes);
app.use("/regiones", regionesRoutes);
app.use("/tipos", tiposRoutes);

app.use((req, res, next) => {
res.status(404).render("404", {"page-title": "404 page" });
});

context.Sequelize.sync().then(()=> {
    app.listen(8080);
console.log("Se conecto la bd");
})
.catch((err) => {
console.error("dio error", err);
});