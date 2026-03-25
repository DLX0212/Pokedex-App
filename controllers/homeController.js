import context from '../context/AppContext.js';
import { Op } from 'sequelize';

export function GetHome(req, res, next) {
    // filtro de txt
    const searchName = req.query.name || '';
    const filterRegion = req.query.regionId || '';
    const filterTipo = req.query.tipoId || '';
    const pokemonWhere = {};

    if (searchName) {
        // coincidencia de texto
        pokemonWhere.name = { [Op.like]: `%${searchName}%` };
    }

    if (filterRegion) {
        pokemonWhere.regionId = filterRegion;
    }

    if (filterTipo) {
        pokemonWhere[Op.or] = [
            { tipoPrimarioId: filterTipo },
            { tipoSecundarioId: filterTipo }
        ];
    }

    // pokemones por filtro
    context.pokemonesModel.findAll({
        where: pokemonWhere,
        include: [
            { model: context.regionesModel, as: "region" },
            { model: context.tiposModel, as: "tipoPrimario" },
            { model: context.tiposModel, as: "tipoSecundario" }
        ]
    }).then((result) => {
        const pokemones = result.map((pokemon) => pokemon.toJSON());

        // filtro regiones
        context.regionesModel.findAll().then((regionesResult) => {
            
            const regionesConFiltro = regionesResult.map((regionBD) => {
                const regionLimpia = regionBD.toJSON(); 
                
                // coincidencia con lo filtrado
                if (regionLimpia.id == filterRegion) {
                    regionLimpia.selected = true;
                }
                return regionLimpia;
            });

            // filtro tipos
            context.tiposModel.findAll().then((tiposResult) => {
                
                const tiposConFiltro = tiposResult.map((tipoBD) => {
                    const tipoLimpio = tipoBD.toJSON();
                    
                    // coincidencia con el filtro 
                    if (tipoLimpio.id == filterTipo) {
                        tipoLimpio.selected = true;
                    }
                    return tipoLimpio;
                });
                res.render("home/home", {
                    pokemones: pokemones,
                    hasPokemones: pokemones.length > 0,
                    regiones: regionesConFiltro,
                    tipos: tiposConFiltro,
                    searchName: searchName,
                    "page-title": "Pokedex - Home"
                });

            }).catch((err) => {
                console.error("Error buscando tipos", err);
            });
        }).catch((err) => {
            console.error("Error buscando regiones", err);
        });

    }).catch((err) => {
        console.error("Error cargando el home", err);
    });
}
