// components/DetalhesVeiculoModal.tsx

import React from 'react';

interface DetalhesVeiculoModalProps {
  selectedItem: {
    modelo: string;
    imagemUrl: string;
    fabricante: string;
    ano: number;
    quantidadeEstoque: number;
    velocidadeMaxima: number;
    potencia: number;
    motor: string;
    valorDiaria: number;
  };
  onClose: () => void;
}

const DetalhesVeiculoModal: React.FC<DetalhesVeiculoModalProps> = ({ selectedItem, onClose }) => {
  return (
    <div
      style={{
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '800px',
        height: '400px',
        background: '#800080', // Alterado para a mesma cor do card
        borderRadius: '10px',
        boxShadow: '0 6px 12px rgba(0, 0, 0, 0.2)',
        backdropFilter: 'blur(10px)',
        zIndex: 999,
        color: 'white', // Cor do texto
      }}
    >
      <button
        style={{
          position: 'absolute',
          top: '10px',
          right: '10px',
          background: 'none',
          border: 'none',
          fontSize: '20px',
          cursor: 'pointer',
          color: 'white', // Cor do ícone "X"
        }}
        onClick={onClose}
      >
        X
      </button>
      <div style={{ display: 'flex', padding: '20px' }}>
        <img
          src={selectedItem.imagemUrl}
          alt={selectedItem.modelo}
          style={{
            width: '300px',
            height: 'auto',
            borderRadius: '10px 10px 0 0',
          }}
        />
        <div style={{ marginLeft: '20px', flexGrow: 1 }}>
          <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>{selectedItem.modelo}</h2>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            <li>Fabricante: {selectedItem.fabricante}</li>
            <li>Ano: {selectedItem.ano}</li>
            <li>Quantidade em Estoque: {selectedItem.quantidadeEstoque}</li>
            <li>Velocidade Máxima: {selectedItem.velocidadeMaxima} km/h</li>
            <li>Potência: {selectedItem.potencia} HP</li>
            <li>Motor: {selectedItem.motor}</li>
            <li>Valor Diária: R$ {selectedItem.valorDiaria.toFixed(2)}</li>
          </ul>
          <div style={{ textAlign: 'center', marginTop: '20px' }}>
            <button
              style={{
                background: 'white',
                color: '#800080',
                padding: '10px 20px',
                fontSize: '16px',
                borderRadius: '5px',
                margin: '0 10px',
                cursor: 'pointer',
              }}
              onClick={() => {
                // Lógica para adicionar ao carrinho
                console.log(`Adicionado ao Carrinho: ${selectedItem.modelo}`);
              }}
            >
              Adicionar ao Carrinho
            </button>
            <button
              style={{
                background: 'white',
                color: '#800080',
                padding: '10px 20px',
                fontSize: '16px',
                borderRadius: '5px',
                margin: '0 10px',
                cursor: 'pointer',
              }}
              onClick={() => {
                // Lógica para favoritar
                console.log(`Favoritado: ${selectedItem.modelo}`);
              }}
            >
              Favoritar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetalhesVeiculoModal;
