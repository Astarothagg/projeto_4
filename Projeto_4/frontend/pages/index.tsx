// pages/index.tsx
import React, { useEffect } from 'react';
import CatalogoPage from './catalogo';
import { useAuth } from '../components/Header'; // Ajuste o caminho conforme necessário

const HomePage: React.FC = () => {
  const { isAuthenticated, userProfileImage } = useAuth();

  useEffect(() => {
    // Lógica a ser executada quando o estado de autenticação mudar
    if (isAuthenticated) {
      console.log('Usuário autenticado!');
      console.log('Imagem do perfil:', userProfileImage);
      // Coloque aqui qualquer lógica adicional que deseja executar após a autenticação
    } else {
      console.log('Usuário não autenticado!');
      // Coloque aqui qualquer lógica adicional que deseja executar quando o usuário não estiver autenticado
    }
  }, [isAuthenticated]);

  return (
    <div>
      <CatalogoPage />
    </div>
  );
};

export default HomePage;
