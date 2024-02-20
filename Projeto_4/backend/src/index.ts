// index.ts
import express from 'express';
import mongoose from 'mongoose';
import helmet from 'helmet';
import dotenv from 'dotenv';
import cors from 'cors';
import userRoutes from './routes/userRoutes';
import authRoutes from './routes/authRoutes';
import catalogoRoutes from './routes/catalogoRoutes';
import profileRoutes from './routes/profileRoutes'; // Importe as rotas do perfil
import { authenticateUser } from './middlewares/authMiddleware'; // Importe o middleware de autenticação

dotenv.config();

const app = express();

app.use(helmet());
app.use(express.json());

// Configurando o middleware cors
app.use(cors({
  origin: 'http://localhost:3001',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
  optionsSuccessStatus: 204,
}));

const mongoDBUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/rentalcar';
mongoose.connect(mongoDBUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
} as mongoose.ConnectOptions)
  .then(() => {
    console.log('Conexão com o MongoDB estabelecida com sucesso');
  })
  .catch((error) => {
    console.error('Erro ao conectar ao MongoDB:', error);
});

app.use('/users', userRoutes);
app.use('/auth', authRoutes);
app.use('/catalogo', catalogoRoutes);
app.use('/profile', authenticateUser, profileRoutes); // Adicione a rota privada do perfil com middleware de autenticação

const PORT = process.env.PORT || 3000;

const server = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

process.on('SIGINT', () => {
  console.log('Encerrando o servidor...');
  server.close(() => {
    console.log('Servidor encerrado com sucesso');
    process.exit(0);
  });
});
