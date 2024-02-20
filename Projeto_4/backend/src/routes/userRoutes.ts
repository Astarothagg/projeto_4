// userRoutes.ts
import express from 'express';
import userController from '../controllers/userController';

const router = express.Router();

// Rota para o cadastro de usuários
router.post('/register', userController.cadastrarUsuario);

export default router;
