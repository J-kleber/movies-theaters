import React from 'react';
import IGender from '../../interfaces/IGender';

import { Container, Title } from './styles';

interface IFilterCardProps {
  item: IGender;
  filterGender: number[];
  handleFilterGender: (id: number) => void;
}

const FilterCard = React.memo<IFilterCardProps>(
  ({ item, filterGender, handleFilterGender }) => {
    return (
      <Container
        active={filterGender.includes(item.id)}
        onPress={() => {
          handleFilterGender(item.id);
        }}
      >
        <Title>{item.name}</Title>
      </Container>
    );
  },
);

export default FilterCard;
