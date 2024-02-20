// components/Modal.tsx
import React from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        background: 'rgba(0, 0, 0, 0.5)',
        zIndex: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <div
        style={{
          background: '#8A2BE2',
          color: 'white',
          padding: '20px',
          borderRadius: '10px',
          width: '400px', // Defina a largura do modal
          minHeight: '300px', // Defina a altura mínima do modal
          boxSizing: 'border-box',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center', // Centraliza os itens horizontalmente
          justifyContent: 'center', // Centraliza os itens verticalmente
        }}
      >
        {children}
        <button
          style={{
            marginTop: '20px',
            padding: '10px 20px', // Tamanho do botão
            fontSize: '16px',
            cursor: 'pointer',
            borderRadius: '5px',
            border: 'none',
            background: '#808080',
            color: 'white',
          }}
          onClick={onClose}
        >
          Fechar
        </button>
      </div>
    </div>
  );
};

export default Modal;
