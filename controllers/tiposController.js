import context from '../context/AppContext.js'

export function GetTipos(req, res, next){
    context.tiposModel.findAll().then((result) => {
        const tipos = result.map((result) => result.dataValues);
            res.render("tipos/list",{
                tiposList: tipos,
                hasTipos: tipos.length > 0,
                "page-title": "Mantenimiento tipos",
            });

    }).catch((err) => {
        console.error("dio error", err);
    })
}

export function GetCreate(req, res, next){
res.render("tipos/form", {
    editMode: false,
    "page-title" : "New Tipos"
})
}

export function PostCreate(req, res, next){
    const name = req.body.nombre;

    context.tiposModel.create({
        name: name,
    }).then(() =>{
        res.redirect("/tipos")
    }).catch((err) => {
        console.error("dio error", err);
    })
}

export function GetEdit(req, res, next){
    const id = req.params.id;

    context.tiposModel.findOne({where: {id: id}}).then((result) => {
        if(!result){
            return res.redirect("/tipos");
        }

        const tiposData = result.dataValues;
        res.render("tipos/form", {
            editMode: true,
            tipos: tiposData,
            "page-title" : `Edit Tipos ${tiposData.name}`,
        })
    }).catch((err) => {
        console.error("dio error", err);
    })
}

export function PostEdit(req, res, next){
    const id = req.params.id;
    const name = req.body.nombre;

    context.tiposModel.findOne({where: {id: id}}).then((result) => {
        if(!result){
           return res.redirect("/tipos");
        }

        context.tiposModel.update(
        {name: name}, {where: {id: id}}).then(() => {
            return res.redirect("/tipos");
        }).catch((err) => {
        console.error("dio error haciendo el update", err);
    });
    }).catch((err) => {
        console.error("dio error", err);
    })
}

export function GetDelete(req, res, next){
const id = req.params.id;
    context.tiposModel.findOne({ where: { id: id } }).then((result) => {
        if (!result) {
            return res.redirect("/tipos");
        }
        const tiposData = result.dataValues;
        res.render("tipos/delete", {
            "page-title": "Confirmar Eliminación",
            tipos: tiposData
        });
    }).catch((err) => {
        console.error("dio error", err);
    })
}

export function PostDelete(req, res, next) {
    const id = req.params.id;

    context.tiposModel.destroy({ where: { id: id } }).then(() => {
        return res.redirect("/tipos");
    }).catch((err) => {
        console.error("Error haciendo el delete", err);
    });
}