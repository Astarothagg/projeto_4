// userController.ts
import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import UserModel, { UserDocument } from '../models/user';

class UserController {
  async cadastrarUsuario(req: Request, res: Response) {
    try {
      const { nickname, senha, email, cep } = req.body;

      // Validando o nickname
      if (!/^[a-zA-Z][a-zA-Z0-9]{4,13}$/.test(nickname)) {
        return res.status(400).json({
          error: 'Nickname inválido. Deve começar com uma letra, seguido por letras ou números (5-14 caracteres).'
        });
      }

      // Validando a senha
      if (!/^.{6,14}$/.test(senha)) {
        return res.status(400).json({ error: 'A senha deve ter entre 6 e 14 caracteres.' });
      }

      // Restrições adicionais para a senha (opcional, ajuste conforme necessário)
      const hasUpperCase = /[A-Z]/.test(senha);
      const hasLowerCase = /[a-z]/.test(senha);
      const hasNumber = /\d/.test(senha);
      const hasSpecialChar = /[@$!%*?&]/.test(senha);

      if (!(hasUpperCase && hasLowerCase && hasNumber && hasSpecialChar)) {
        return res.status(400).json({
          error: 'A senha deve incluir pelo menos 1 letra maiúscula, 1 letra minúscula, 1 número e 1 caractere especial.'
        });
      }

      // Validando o email
      if (!/\S+@\S+\.\S+/.test(email)) {
        return res.status(400).json({ error: 'Email inválido.' });
      }

      // Validando o CEP
      if (!/^\d{5}-\d{3}$/.test(cep)) {
        return res.status(400).json({ error: 'CEP inválido. Use o formato 12345-678.' });
      }

      // Verificando se o e-mail já está cadastrado
      const existingUser = await UserModel.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ error: 'E-mail já cadastrado.' });
      }

      // Hash da senha antes de salvar no banco de dados
      const hashedPassword = await bcrypt.hash(senha, 10);

      // Criando um novo usuário com a senha hasheada
      const user: UserDocument = new UserModel({ nickname, senha: hashedPassword, email, cep });
      await user.save();

      // Gerar token JWT
      const token = jwt.sign({ userId: user._id }, 'seuSegredoDoJWT', { expiresIn: '1d' });

      return res.status(201).json({ message: 'Usuário cadastrado com sucesso.', token });
    } catch (error) {
      console.error('Erro ao cadastrar o usuário:', error);
      return res.status(500).json({ error: 'Erro interno do servidor.' });
    }
  }
}

export default new UserController();
