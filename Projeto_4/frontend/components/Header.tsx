// components/Header.tsx
import React, { useState, useEffect, createContext, useContext } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Login from './Login';
import Cadastro from './Cadastro';

interface AuthContextProps {
  isAuthenticated: boolean;
  userProfileImage: string | null;
  login: (profileImage: string, authToken: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

const AuthProvider: React.FC = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userProfileImage, setUserProfileImage] = useState<string | null>(null);

  const login = (profileImage: string, authToken: string) => {
    setIsAuthenticated(true);
    setUserProfileImage(profileImage);
    sessionStorage.setItem('authToken', authToken);
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUserProfileImage(null);
    sessionStorage.removeItem('authToken');
  };

  useEffect(() => {
    const storedToken = sessionStorage.getItem('authToken');
    if (storedToken) {
      // Simulando uma chamada à API para obter as informações do usuário
      // Substitua este trecho com a lógica real para obter os dados do usuário
      const mockFetchUserProfile = async () => {
        try {
          // Você deve chamar sua API aqui para obter as informações do usuário
          // const response = await fetch('sua API para obter informações do usuário');
          // const userData = await response.json();
          const userData = { image: 'url-da-imagem-do-perfil' }; // Simulação de dados do usuário
          setUserProfileImage(userData.image);
        } catch (error) {
          console.error('Erro ao obter informações do usuário:', error);
        }
      };

      mockFetchUserProfile();
    }
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, userProfileImage, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth deve ser usado dentro de AuthProvider');
  }
  return context;
};

const Header: React.FC = () => {
  const { isAuthenticated, userProfileImage, login, logout } = useAuth();
  const router = useRouter();
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isCadastroModalOpen, setIsCadastroModalOpen] = useState(false);

  const handleSignInUpClick = () => {
    setIsLoginModalOpen(true);
  };

  const handleCadastroClick = () => {
    setIsCadastroModalOpen(true);
  };

  const handleLoginSuccess = (profileImage: string, authToken: string) => {
    login(profileImage, authToken);
    setIsLoginModalOpen(false);
  };

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  return (
    <div
      style={{
        position: 'relative',
        textAlign: 'center',
        padding: '20px',
        background: '#8A2BE2',
        color: 'white',
        width: '100%',
        boxSizing: 'border-box',
      }}
    >
      <div style={{ position: 'absolute', top: '10px', right: '20px' }}>
        {isAuthenticated ? (
          <>
            {userProfileImage ? (
              <Link href="/profile" passHref>
                <div style={{
                  marginRight: '10px',
                  display: 'inline-block',
                  width: '30px',
                  height: '30px',
                  borderRadius: '50%',
                  cursor: 'pointer',
                }}>
                  <Image
                    src={userProfileImage}
                    alt="User Profile"
                    layout="fill"
                    objectFit="cover"
                    objectPosition="center"
                    style={{ borderRadius: '50%' }}
                  />
                </div>
              </Link>
            ) : (
              <Link href="/profile" passHref>
                <div style={{
                  marginRight: '10px',
                  display: 'inline-block',
                  width: '60px',
                  height: '60px',
                  borderRadius: '50%',
                  backgroundColor: '#808080',
                  cursor: 'pointer',
                  backgroundImage: 'url(seu-url-imagem-generico)', // Substitua com sua imagem genérica
                  backgroundSize: 'cover',
                }}></div>
              </Link>
            )}
            <button
              style={{
                padding: '8px 15px',
                fontSize: '16px',
                cursor: 'pointer',
                borderRadius: '5px',
                border: 'none',
                background: '#808080',
                color: 'white',
              }}
              onClick={handleLogout}
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <button
              style={{
                marginRight: '10px',
                padding: '8px 15px',
                fontSize: '16px',
                cursor: 'pointer',
                borderRadius: '5px',
                border: 'none',
                background: '#808080',
                color: 'white',
              }}
              onClick={handleSignInUpClick}
            >
              Login
            </button>
            <button
              style={{
                padding: '8px 15px',
                fontSize: '16px',
                cursor: 'pointer',
                borderRadius: '5px',
                border: 'none',
                background: '#808080',
                color: 'white',
              }}
              onClick={handleCadastroClick}
            >
              Cadastro
            </button>
          </>
        )}
      </div>

      {/* O restante do seu código permanece o mesmo */}
      {isLoginModalOpen && <Login isOpen={isLoginModalOpen} onClose={() => setIsLoginModalOpen(false)} onLoginSuccess={handleLoginSuccess} />}
      {isCadastroModalOpen && <Cadastro isOpen={isCadastroModalOpen} onClose={() => setIsCadastroModalOpen(false)} />}
    </div>
  );
};

export default Header;
