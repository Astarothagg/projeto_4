// components/Cadastro.tsx
import React, { useState } from 'react';
import Modal from './Modal';
import ModalLogin from './Login';
import { useRouter } from 'next/router';
import styles from '../public/styles/Cadastro.module.css';

interface CadastroProps {
  isOpen: boolean;
  onClose: () => void;
}

const Cadastro: React.FC<CadastroProps> = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmacaoSenha, setConfirmacaoSenha] = useState('');
  const [nickname, setNickname] = useState('');
  const [cep, setCep] = useState('');
  const [cadastroSucesso, setCadastroSucesso] = useState(false);
  const [camposPendentes, setCamposPendentes] = useState<string[]>([]);
  const [abrirModalLogin, setAbrirModalLogin] = useState(false);
  const router = useRouter();

  const handleCadastro = async () => {
    const camposNaoPreenchidos: string[] = [];

    if (!email.trim()) {
      camposNaoPreenchidos.push('email');
    }
    if (!senha.trim()) {
      camposNaoPreenchidos.push('senha');
    }
    if (!confirmacaoSenha.trim()) {
      camposNaoPreenchidos.push('confirmacaoSenha');
    }
    if (!nickname.trim()) {
      camposNaoPreenchidos.push('nickname');
    }
    if (!cep.trim()) {
      camposNaoPreenchidos.push('cep');
    }

    setCamposPendentes(camposNaoPreenchidos);

    if (camposNaoPreenchidos.length > 0) {
      return;
    }

    try {
      const response = await fetch('http://localhost:3000/users/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, senha, confirmacaoSenha, nickname, cep }),
      });

      if (response.ok) {
        setCadastroSucesso(true);

        setTimeout(() => {
          setAbrirModalLogin(true);
        }, 1000);
      } else {
        const errorData = await response.json();
        console.error(`Erro no cadastro (status ${response.status}):`, errorData.error);
      }
    } catch (error) {
      console.error('Erro no cadastro:', error);
    }
  };

  const isCampoPendente = (campo: string) => camposPendentes.includes(campo);

  return (
    <>
      <Modal isOpen={isOpen} onClose={() => { onClose(); setCamposPendentes([]); }}>
        <div className={styles.modalContent}>
          <h3>Cadastro</h3>
          {cadastroSucesso ? (
            <p>Cadastro realizado com sucesso! Redirecionando para o login...</p>
          ) : (
            <form>
              <div className={styles.formGroup}>
                <input
                  type="text"
                  value={nickname}
                  onChange={(e) => setNickname(e.target.value)}
                  placeholder="Digite seu nickname"
                  className={isCampoPendente('nickname') ? styles.inputError : ''}
                />
              </div>

              <div className={styles.formGroup}>
                <input
                  type="password"
                  value={senha}
                  onChange={(e) => setSenha(e.target.value)}
                  placeholder="Digite sua senha"
                  className={isCampoPendente('senha') ? styles.inputError : ''}
                />
              </div>

              <div className={styles.formGroup}>
                <input
                  type="password"
                  value={confirmacaoSenha}
                  onChange={(e) => setConfirmacaoSenha(e.target.value)}
                  placeholder="Confirme sua senha"
                  className={isCampoPendente('confirmacaoSenha') ? styles.inputError : ''}
                />
              </div>

              <div className={styles.formGroup}>
                <input
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Digite seu email"
                  className={isCampoPendente('email') ? styles.inputError : ''}
                />
              </div>

              <div className={styles.formGroup}>
                <input
                  type="text"
                  value={cep}
                  onChange={(e) => setCep(e.target.value)}
                  placeholder="Digite seu CEP"
                  className={isCampoPendente('cep') ? styles.inputError : ''}
                />
              </div>

              <div>
                <button type="button" onClick={handleCadastro}>Cadastrar</button>
              </div>
            </form>
          )}
        </div>
      </Modal>

      {abrirModalLogin && (
        <ModalLogin
          isOpen={true}
          onClose={() => {
            setAbrirModalLogin(false);
            setCadastroSucesso(false);
            onClose();
            router.push('/login');
          }}
        />
      )}
    </>
  );
};

export default Cadastro;
