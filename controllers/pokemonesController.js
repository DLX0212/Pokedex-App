import context from '../context/AppContext.js'

export function GetPokemones(req, res, next){
    context.pokemonesModel.findAll({
        include: [
            { model: context.regionesModel, as: "region" },
            { model: context.tiposModel, as: "tipoPrimario" },
            { model: context.tiposModel, as: "tipoSecundario" }
        ]
    }).then((result) => {
        const pokemones = result.map((pokemon) => pokemon.toJSON());
        res.render("pokemones/list", {
            pokemonesList: pokemones,
            hasPokemones: pokemones.length > 0,
            "page-title": "Mantenimiento Pokemones",
            });

    }).catch((err) => {
        console.error("dio error buscando los pokemones", err);
    })
}

export function GetCreate(req, res, next){
    //buscar todas las regiones
    context.regionesModel.findAll().then((regionesResult) => {
        const regiones = regionesResult.map((result) => result.dataValues);

        // buscar todos los tipos
    context.tiposModel.findAll().then((tiposResult) => {
        const tipos = tiposResult.map((result) => result.dataValues);
        //renderizar la vista
            res.render("pokemones/form", {
                editMode: false,
                "page-title": "New Pokemon",
                regiones: regiones, 
                tipos: tipos  
            });

        }).catch((err) => {
            console.error("Error buscando tipos", err);
        });

    }).catch((err) => {
        console.error("Error buscando regiones", err);
    });
}

export function PostCreate(req, res, next){
    const name = req.body.nombre;
    const foto = req.body.foto;
    const region = req.body.regionId;
    const tipoPrimario = req.body.tipoPrimarioId;
    const tipoSecundario = req.body.tipoSecundarioId;

    context.pokemonesModel.create({
        name: name,
        foto: foto,
        regionId: region,             
        tipoPrimarioId: tipoPrimario, 
        tipoSecundarioId: tipoSecundario 
    }).then(() =>{
        res.redirect("/pokemones");
    }).catch((err) => {
        console.error("dio error creando", err);
        res.redirect("/pokemones"); 
    })
}

export function GetEdit(req, res, next) {
    const id = req.params.id;
    context.pokemonesModel.findOne({ where: { id: id } }).then((result) => {
        if (!result) {
            return res.redirect("/pokemones");
        }

        const pokemonData = result.dataValues;
        context.regionesModel.findAll().then((resultadoRegiones) => {
          const regiones = resultadoRegiones.map((regionDeLaBD) => {
        const regionLimpia = regionDeLaBD.dataValues;
        if (regionLimpia.id === pokemonData.regionId) {
            regionLimpia.selected = true;
        }
        return regionLimpia;
    });

            // tipos para los select
            context.tiposModel.findAll().then((tiposResult) => {
                const tipos = tiposResult.map((t) => {
                    const tip = t.dataValues;
                    if (tip.id === pokemonData.tipoPrimarioId) tip.selectedPrimario = true;
                    if (tip.id === pokemonData.tipoSecundarioId) tip.selectedSecundario = true;
                    return tip;
                });

                //Renderizamos
                res.render("pokemones/form", {
                    editMode: true,
                    pokemon: pokemonData,
                    regiones: regiones, 
                    tipos: tipos, 
                    "page-title": `Editar Pokemon ${pokemonData.name}`,
                });
            });
        });

    }).catch((err) => {
        console.error("dio error buscando para editar", err);
        res.redirect("/pokemones");
    });
}

export function PostEdit(req, res, next){
    const id = req.params.id;
    const name = req.body.nombre; 
    const foto = req.body.foto;
    const region = req.body.regionId;
    const tipoPrimario = req.body.tipoPrimarioId;
    const tipoSecundario = req.body.tipoSecundarioId;

    
    context.pokemonesModel.findOne({where: {id: id}}).then((result) => {
        if(!result){
           return res.redirect("/pokemones");
        }

        context.pokemonesModel.update({
            name: name,
            foto: foto,
            regionId: region,             
            tipoPrimarioId: tipoPrimario, 
            tipoSecundarioId: tipoSecundario 
        }, {where: {id: id}}).then(() => {
            return res.redirect("/pokemones");
        }).catch((err) => {
            console.error("dio error haciendo el update", err);
            res.redirect("/pokemones"); 
        });
    }).catch((err) => {
        console.error("dio error buscando para editar", err);
        res.redirect("/pokemones");
    })
}

export function GetDelete(req, res, next){
    const id = req.params.id;
    context.pokemonesModel.findOne({ where: { id: id } }).then((result) => {
        if (!result) {
            return res.redirect("/pokemones");
        }
        
        const pokemonData = result.dataValues;z
        res.render("pokemones/delete", {
            "page-title": "Confirmar Eliminación",
            pokemon: pokemonData
        });
    }).catch((err) => {
        console.error("dio error", err);
    })
}

export function PostDelete(req, res, next) {
    const id = req.params.id;

    context.pokemonesModel.destroy({ where: { id: id } }).then(() => {
        return res.redirect("/pokemones");
    }).catch((err) => {
        console.error("Error haciendo el delete", err);
    });
}