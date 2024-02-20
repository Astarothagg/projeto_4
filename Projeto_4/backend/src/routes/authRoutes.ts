// authRoutes.ts
import express from 'express';
import AuthController from '../controllers/authController';
import { handleAuthentication } from '../middlewares/authMiddleware';

const router = express.Router();

router.post('/login', AuthController.loginUser);

// Exemplo de rota protegida
router.get('/profile', handleAuthentication, (req, res) => {
  // Rota protegida - apenas usuários autenticados têm acesso
  res.json({ message: 'Acesso permitido à rota de perfil', user: req.user });
});

export default router;
