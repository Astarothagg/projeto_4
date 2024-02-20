// pages/index.tsx
import React from 'react';
import CatalogoPage from './catalogo';

const HomePage: React.FC = () => {
  return (
    <div>
      {/* Remova a parte abaixo do Head, pois o estilo global será incluído no _document.js */}
      {/* <Head>
        <link rel="stylesheet" href="/styles/global.css" />
      </Head> */}
      
      {/* Adicione mais conteúdo conforme necessário */}
      <CatalogoPage />
    </div>
  );
};

export default HomePage;
