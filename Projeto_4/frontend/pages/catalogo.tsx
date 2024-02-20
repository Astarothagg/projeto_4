// pages/CatalogoPage.tsx

import React, { useEffect, useState } from 'react';
import DetalhesVeiculoModal from '../components/DetalhesVeiculoModal';
import Header from '../components/Header';
import { getCatalogoItems } from '../services/catalogoApi';

interface CatalogoItem {
  modelo: string;
  fabricante: string;
  ano: number;
  quantidadeEstoque: number;
  velocidadeMaxima: number;
  potencia: number;
  motor: string;
  valorDiaria: number;
  imagemUrl: string;
}

const CatalogoPage: React.FC = () => {
  const [catalogoItems, setCatalogoItems] = useState<CatalogoItem[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<CatalogoItem | null>(null);
  const [filteredItems, setFilteredItems] = useState<CatalogoItem[]>([]);
  const [filterMarca, setFilterMarca] = useState<string | null>(null);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Adicione o estado de autenticação

  useEffect(() => {
    const fetchData = async () => {
      try {
        const items = await getCatalogoItems();
        setCatalogoItems(items);
        setFilteredItems(items);
      } catch (error) {
        console.error('Error fetching catalogo items:', error);
      }
    };

    fetchData();
  }, []);

  const openModal = (item: CatalogoItem) => {
    setSelectedItem(item);
    setModalOpen(true);
  };

  const closeModal = () => {
    setSelectedItem(null);
    setModalOpen(false);
  };

  const handleFilter = () => {
    let filtered = catalogoItems;

    if (filterMarca) {
      filtered = filtered.filter((item) => item.fabricante === filterMarca);
    }

    setFilteredItems(filtered);
  };

  const handleSort = () => {
    const sortedItems = [...filteredItems];
    sortedItems.sort((a, b) => {
      if (sortOrder === 'asc') {
        return a.valorDiaria - b.valorDiaria;
      } else {
        return b.valorDiaria - a.valorDiaria;
      }
    });
    setFilteredItems(sortedItems);
  };

  const handleResetFilter = () => {
    setFilterMarca(null);
    setSortOrder('asc');
    setFilteredItems(catalogoItems);
  };

  return (
    <div style={{ position: 'relative', background: '#8A2BE2', padding: '20px', minHeight: '100vh' }}>
      {/* Componente Header com a propriedade isAuthenticated */}
      <Header isAuthenticated={isAuthenticated} />

      {/* Navbar */}
      <nav style={{
        display: 'flex',
        justifyContent: 'center',
        marginBottom: '20px',
        color: 'black',
        margin: '10px',
        background: '#800080',  // Cor de fundo alterada para a cor dos cards
        padding: '10px',  // Espaçamento interno
        borderRadius: '10px',  // Bordas arredondadas
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)'  // Sombra
      }}>
        <div style={{ marginRight: '20px' }}>
          <label htmlFor="marcaFilter" style={{ marginRight: '10px', fontSize: '16px', color: 'white' }}>Filtrar por Marca:</label>
          <select
            id="marcaFilter"
            value={filterMarca || ''}
            onChange={(e) => setFilterMarca(e.target.value || null)}
          >
            <option value="" style={{ color: 'black' }}>Todos</option>
            {Array.from(new Set(catalogoItems.map((car) => car.fabricante))).map((fabricante, index) => (
              <option key={index} value={fabricante} style={{ color: 'black' }}>
                {fabricante}
              </option>
            ))}
          </select>
        </div>
        <div style={{ fontSize: '16px' }}>
          <label htmlFor="sortOrder" style={{ marginRight: '10px', color: 'white' }}>Ordenar por Valor:</label>
          <select
            id="sortOrder"
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value as 'asc' | 'desc')}
          >
            <option value="asc" style={{ color: 'black' }}>Crescente</option>
            <option value="desc" style={{ color: 'black' }}>Decrescente</option>
          </select>
        </div>
        <button onClick={handleFilter} style={{ marginLeft: '10px', fontSize: '16px', borderRadius: '10px', background: 'darkgray', color: 'black' }}>Filtrar</button>
        <button onClick={handleSort} style={{ marginLeft: '10px', fontSize: '16px', borderRadius: '10px', background: 'darkgray', color: 'black' }}>Ordenar</button>
        <button onClick={handleResetFilter} style={{ marginLeft: '10px', fontSize: '16px', borderRadius: '10px', background: 'darkgray', color: 'black' }}>Limpar Filtros</button>
      </nav>

      {/* Lista de Veículos */}
      <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexWrap: 'wrap' }}>
        {filteredItems.map((item, index) => (
          <li
            key={index}
            style={{
              margin: '10px',
              textAlign: 'center',
              background: '#800080',
              borderRadius: '10px',
              boxShadow: '0 6px 12px rgba(0, 0, 0, 0.1)',
              transition: 'box-shadow 0.3s ease',
              cursor: 'pointer',
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.boxShadow = '0 12px 24px rgba(0, 0, 0, 0.2)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.boxShadow = '0 6px 12px rgba(0, 0, 0, 0.1)';
            }}
            onClick={() => openModal(item)}
          >
            <img
              src={item.imagemUrl}
              alt={item.modelo}
              style={{ width: '430px', height: '200px', objectFit: 'cover', borderRadius: '10px 10px 0 0' }}
            />
            <p style={{ fontWeight: 'bold', fontSize: '20px', marginTop: '8px', color: 'white' }}>{item.modelo}</p>
            <p style={{ fontSize: '16px', color: 'white' }}>Fabricante: {item.fabricante}</p>
            <p style={{ fontSize: '16px', color: 'white' }}>Valor Diária: R$ {item.valorDiaria.toFixed(2)}</p>
          </li>
        ))}
      </ul>

      {/* Modal */}
      {modalOpen && selectedItem && (
        <>
          <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background: 'rgba(0, 0, 0, 0.5)',
            zIndex: 1,
            backdropFilter: 'blur(5px)',
          }}></div>
          <DetalhesVeiculoModal
            selectedItem={selectedItem}
            onClose={closeModal}
          />
        </>
      )}
    </div>
  );
};

export default CatalogoPage;
