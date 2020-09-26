import React from 'react';
import { ActivityIndicator } from 'react-native';
import { Container, TextLoading } from './styles';
import { colors } from '../../themes';

const Loading: React.FC = () => (
  <Container>
    <ActivityIndicator color={colors.default.primaryColor} size={80} />
    <TextLoading>Carregando...</TextLoading>
  </Container>
);

export default Loading;
