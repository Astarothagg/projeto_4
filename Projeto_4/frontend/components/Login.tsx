// components/Login.tsx
import React, { useState } from 'react';
import Modal from './Modal';
import { useRouter } from 'next/router';

interface LoginProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (profileImage: string) => void;
}

const Login: React.FC<LoginProps> = ({ isOpen, onClose, onLoginSuccess }) => {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [loginErro, setLoginErro] = useState('');
  const [loginSucesso, setLoginSucesso] = useState(false);
  const router = useRouter();

  const handleLogin = async () => {
    try {
      const response = await fetch('http://localhost:3000/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, senha }),
      });

      if (response.ok) {
        const userData = await response.json();
        const { profileImage } = userData;
        setLoginSucesso(true);

        // Mensagem de sucesso e redirecionar para /profile após 2 segundos
        setTimeout(() => {
          setLoginSucesso(false);
          onLoginSuccess(profileImage);
          onClose();
          router.push('/profile');
        }, 2000);
      } else {
        const errorData = await response.json();
        setLoginErro(`Erro no login: ${errorData.error}`);
      }
    } catch (error) {
      console.error('Erro no login:', error);
      setLoginErro('Erro no login. Por favor, tente novamente.');
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={() => { onClose(); setLoginErro(''); setLoginSucesso(false); }}>
      <div>
        <h3>Login</h3>
        <form>
          <div>
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Digite seu email"
            />
          </div>
          <div>
            <input
              type="password"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              placeholder="Digite sua senha"
            />
          </div>
          {loginErro && <p style={{ color: 'red' }}>{loginErro}</p>}
          {loginSucesso && <p style={{ color: 'green' }}>Login bem-sucedido! Redirecionando...</p>}
          <div>
            <button type="button" onClick={handleLogin}>Entrar</button>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default Login;
