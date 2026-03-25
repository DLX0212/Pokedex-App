import express from 'express';
import { GetPokemones, GetCreate, GetEdit, GetDelete, PostCreate, PostEdit, PostDelete } from '../controllers/pokemonesController.js';
const router = express.Router();


router.get("/", GetPokemones);
router.get("/crear", GetCreate);
router.post("/crear", PostCreate);
router.get("/editar/:id", GetEdit);
router.post("/editar/:id", PostEdit);
router.get("/delete/:id", GetDelete);
router.post("/delete/:id", PostDelete);

export default router;