// src/routes/catalogoRoutes.ts
import express, { Request, Response } from 'express';
import catalogoVeiculos from '../models/luxuryCarsCatalog';

const router = express.Router();

// Rota para obter o catálogo de veículos
router.get('/catalogo-veiculos', (req: Request, res: Response) => {
  res.json(catalogoVeiculos);
});

export default router;
