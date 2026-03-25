import express from 'express';
import { GetHome } from '../controllers/homeController.js';

const router = express.Router();

//ruta
router.get("/", GetHome);

export default router;