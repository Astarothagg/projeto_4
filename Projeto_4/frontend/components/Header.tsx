// components/Header.tsx
import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import logoImage from '../images/LOGO.jpg';
import Login from './Login';
import Cadastro from './Cadastro';

interface HeaderProps {
  onLogout: () => void;
}

const Header: React.FC<HeaderProps> = ({ onLogout }) => {
  const router = useRouter();
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isCadastroModalOpen, setIsCadastroModalOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userProfileImage, setUserProfileImage] = useState<string | null>(null);

  const handleSignInUpClick = () => {
    setIsLoginModalOpen(true);
  };

  const handleCadastroClick = () => {
    setIsCadastroModalOpen(true);
  };

  const handleLoginSuccess = (profileImage: string) => {
    setIsAuthenticated(true);
    setUserProfileImage(profileImage);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUserProfileImage(null);
    onLogout();
    router.push('/'); // Redirecionar para a página inicial após o logout
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
                <a style={{
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
                </a>
              </Link>
            ) : (
              <Link href="/profile" passHref>
                <a style={{
                  marginRight: '10px',
                  display: 'inline-block',
                  width: '60px',
                  height: '60px',
                  borderRadius: '50%',
                  backgroundColor: '#808080',
                  cursor: 'pointer',
                }}></a>
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

      <div style={{ margin: '20px', borderRadius: '10px', overflow: 'hidden' }}>
        <Image src={logoImage} alt="Logo da Sua Loja" width={600} height={400} style={{ borderRadius: '10px' }} priority />
      </div>

      {isLoginModalOpen && <Login isOpen={isLoginModalOpen} onClose={() => setIsLoginModalOpen(false)} onLoginSuccess={handleLoginSuccess} />}
      {isCadastroModalOpen && <Cadastro isOpen={isCadastroModalOpen} onClose={() => setIsCadastroModalOpen(false)} />}
    </div>
  );
};

export default Header;
