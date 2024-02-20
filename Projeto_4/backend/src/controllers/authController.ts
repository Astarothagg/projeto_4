// authController.ts
import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import UserModel from '../models/user';

class AuthController {
  async loginUser(req: Request, res: Response) {
    try {
      const { email, senha } = req.body;

      // Verificar se o email e a senha foram fornecidos
      if (!email || !senha) {
        return res.status(400).json({ error: 'Email e senha são obrigatórios.' });
      }

      // Procurar o usuário pelo email
      const user = await UserModel.findOne({ email });

      // Verificar se o usuário existe
      if (!user) {
        return res.status(401).json({ error: 'Email incorreto.' });
      }

      // Verificar a senha
      const isPasswordValid = await bcrypt.compare(senha, user.senha);

      if (!isPasswordValid) {
        return res.status(401).json({ error: 'Senha incorreta.' });
      }

      // Gerar token JWT
      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET || 'fallback-segredo', { expiresIn: '1d' });

      return res.status(200).json({ message: 'Login bem-sucedido.', token });
    } catch (error) {
      console.error('Erro no login:', error);
      return res.status(500).json({ error: 'Erro interno do servidor.' });
    }
  }
}

export default new AuthController();
