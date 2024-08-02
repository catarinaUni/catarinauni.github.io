import React from 'react';
import styled from 'styled-components';

// Estilização para o container do carrossel
const CarouselContainer = styled.div`
  display: flex;
  overflow-x: auto;
  scrollbar-width: thin;
  scrollbar-color: #c0c0c0 transparent;
  padding-bottom: 10px;
  padding-left: 50px;
  

  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #c0c0c0;
    border-radius: 4px;
  }
`;

// Estilização para cada item do carrossel
const CarouselItem = styled.div`
  flex: 0 0 auto;
  width: 13%; // Ajuste para mostrar 6 itens por vez
  text-align: center;
  
  hyphens: auto;

`;


// Componente React genérico para carrossel
const Carousel = ({ items, renderItem }) => {
  return (
    <CarouselContainer>
      {items.map((item, index) => (
        <CarouselItem key={index}>
          {renderItem(item)}
        </CarouselItem>
      ))}
    </CarouselContainer>
  );
};

export default Carousel;
