// userModel.ts
import mongoose, { Document, Schema } from 'mongoose';

// Definindo a interface para o documento do usuário
export interface UserDocument extends Document {
  nickname: string;
  senha: string;
  confirmacaoSenha?: string;
  email: string;
  cep?: string;
}

// Definindo o esquema do usuário
const userSchema = new Schema<UserDocument>({
  nickname: {
    type: String,
    required: [true, 'O campo "nickname" é obrigatório.'],
    unique: true,
  },
  senha: {
    type: String,
    required: [true, 'O campo "senha" é obrigatório.'],
  },
  confirmacaoSenha: {
    type: String,
    validate: {
      validator: function(this: UserDocument) {
        // A validação só é aplicada se confirmacaoSenha existir
        return !this.confirmacaoSenha || this.senha === this.confirmacaoSenha;
      },
      message: 'As senhas não coincidem.',
    },
  },
  email: {
    type: String,
    required: [true, 'O campo "email" é obrigatório.'],
    unique: true,
  },
  cep: String, // Agora o campo cep é opcional
});

// Pré-validação para comparar senha e confirmação de senha
userSchema.pre('validate', function (next) {
  // A validação só é aplicada se confirmacaoSenha existir
  if (this.confirmacaoSenha && this.isModified('senha') && this.senha !== this.confirmacaoSenha) {
    this.invalidate('confirmacaoSenha', 'As senhas não coincidem.');
  }
  next();
});

// Criando o modelo de usuário
const UserModel = mongoose.model<UserDocument>('User', userSchema);

export default UserModel;
