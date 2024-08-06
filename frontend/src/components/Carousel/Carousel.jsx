import React from 'react';
import styled from 'styled-components';


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

const CarouselItem = styled.div`
  flex: 0 0 auto;
  width: 13%; 
  text-align: center;
  
  hyphens: auto;

`;


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
