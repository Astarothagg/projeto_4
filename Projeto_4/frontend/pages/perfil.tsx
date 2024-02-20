// pages/Perfil.tsx
import React, { useState } from 'react';
import styles from '../public/styles/Perfil.module.css'; // Importar o módulo de estilos

const Perfil: React.FC = () => {
  const [nome, setNome] = useState<string>('');
  const [cpf, setCpf] = useState<string>('');
  const [endereco, setEndereco] = useState<string>('');
  const [fotoPerfil, setFotoPerfil] = useState<string | null>(null);
  const [itensFavoritos, setItensFavoritos] = useState<string[]>([]);

  const handleFotoPerfilChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFotoPerfil(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAdicionarItemFavorito = () => {
    const novoItem = prompt('Digite o item favorito:');
    if (novoItem) {
      setItensFavoritos((prevItens) => [...prevItens, novoItem]);
    }
  };

  return (
    <div className={styles.perfilContainer}>
      <h1>Perfil do Usuário</h1>

      <label className={styles.fotoPerfilLabel}>
        <input type="file" accept="image/*" onChange={handleFotoPerfilChange} />
        {fotoPerfil && <img src={fotoPerfil} alt="Foto de Perfil" className={styles.fotoPerfil} />}
      </label>

      <div className={styles.inputContainer}>
        <label>
          Nome:
          <input type="text" value={nome} onChange={(e) => setNome(e.target.value)} />
        </label>
      </div>

      <div className={styles.inputContainer}>
        <label>
          CPF:
          <input type="text" value={cpf} onChange={(e) => setCpf(e.target.value)} />
        </label>
      </div>

      <div className={styles.inputContainer}>
        <label>
          Endereço:
          <input type="text" value={endereco} onChange={(e) => setEndereco(e.target.value)} />
        </label>
      </div>

      <div>
        <h2>Itens Favoritos:</h2>
        <ul>
          {itensFavoritos.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
        <button onClick={handleAdicionarItemFavorito}>Adicionar Item Favorito</button>
      </div>
    </div>
  );
};

export default Perfil;
