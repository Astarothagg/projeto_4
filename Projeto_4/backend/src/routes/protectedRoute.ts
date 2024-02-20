// src/routes/protectedRoutes.ts
import express from 'express';
import { authenticateUser } from '../middlewares/authMiddleware';

const router = express.Router();

router.get('/protected-route', authenticateUser, (req, res) => {
  res.json({ message: 'Rota protegida. O usuário está autenticado.' });
});

export default router;
