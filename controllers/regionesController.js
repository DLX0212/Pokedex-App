import context from '../context/AppContext.js'

export function GetRegiones(req, res, next){
    context.regionesModel.findAll().then((result) => {
        const regiones = result.map((result) => result.dataValues);
            res.render("regiones/list",{
                regionesList: regiones,
                hasRegiones: regiones.length > 0,
                "page-title": "Mantenimiento Regiones",
            });

    }).catch((err) => {
        console.error("dio error", err);
    })
}

export function GetCreate(req, res, next){
res.render("regiones/form", {
    editMode: false,
    "page-title" : "New Regiones"
})
}

export function PostCreate(req, res, next){
    const name = req.body.nombre;

    context.regionesModel.create({
        name: name,
    }).then(() =>{
        res.redirect("/regiones/list")
    }).catch((err) => {
        console.error("dio error", err);
    })
}

export function GetEdit(req, res, next){
    const id = req.params.id;

    context.regionesModel.findOne({where: {id: id}}).then((result) => {
        if(!result){
            return res.redirect("/regiones/list");
        }

        const regionData = result.dataValues;
        res.render("regiones/form", {
            editMode: true,
            region: regionData,
            "page-title" : `Edit regiones ${regionData.name}`,
        })
    }).catch((err) => {
        console.error("dio error", err);
    })
}

export function PostEdit(req, res, next){
    const id = req.params.id;
    const name = req.body.nombre;

    context.regionesModel.findOne({where: {id: id}}).then((result) => {
        if(!result){
           return res.redirect("/regiones/list");
        }

        context.regionesModel.update(
        {name: name}, {where: {id: id}}).then(() => {
            return res.redirect("/regiones");
        }).catch((err) => {
        console.error("dio error haciendo el update", err);
    });
    }).catch((err) => {
        console.error("dio error", err);
    })
}

export function GetDelete(req, res, next){
const id = req.params.id;
    context.regionesModel.findOne({ where: { id: id } }).then((result) => {
        if (!result) {
            return res.redirect("/regiones");
        }
        const regionData = result.dataValues;
        res.render("regiones/delete", {
            "page-title": "Confirmar Eliminación",
            region: regionData
        });
    }).catch((err) => {
        console.error("dio error", err);
    })
}

export function PostDelete(req, res, next) {
    const id = req.params.id;

    context.regionesModel.destroy({ where: { id: id } }).then(() => {
        return res.redirect("/regiones");
    }).catch((err) => {
        console.error("Error haciendo el delete", err);
    });
}