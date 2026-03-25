import express from 'express';
import { GetRegiones, GetCreate, GetEdit, GetDelete, PostCreate, PostEdit, PostDelete } from '../controllers/regionesController.js';

const router = express.Router();

router.get("/", GetRegiones);
router.get("/crear", GetCreate);
router.post("/crear", PostCreate);
router.get("/editar/:id", GetEdit);
router.post("/editar/:id", PostEdit);
router.get("/delete/:id", GetDelete);
router.post("/delete/:id", PostDelete);

export default router;