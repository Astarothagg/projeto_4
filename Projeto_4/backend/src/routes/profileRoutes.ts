// profileRoutes.ts
import express from 'express';
import UserModel, { UserDocument } from '../models/user';
import { authenticateUser } from '../middlewares/authMiddleware';

const router = express.Router();

router.get('', authenticateUser, async (req, res) => {
  try {
    // Certifique-se de que req.user não é undefined
    if (!req.user) {
      return res.status(401).json({ error: 'Usuário não autenticado.' });
    }

    // O middleware de autenticação adiciona o usuário decodificado ao objeto de solicitação (req.user)
    const user = req.user as UserDocument;

    // Use o e-mail para buscar as informações do usuário no banco de dados
    const { email } = user;
    const userFromDB = await UserModel.findOne({ email }, { senha: 0 }); // Excluindo a senha

    if (!userFromDB) {
      return res.status(404).json({ error: 'Usuário não encontrado.' });
    }

    res.json({ user: userFromDB, message: 'Acesso ao perfil autorizado.' });
  } catch (error) {
    console.error('Erro ao buscar informações do perfil:', error);
    res.status(500).json({ error: 'Erro interno do servidor.' });
  }
});

export default router;
