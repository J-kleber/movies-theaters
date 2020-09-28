import React from 'react';
import { ActivityIndicator, ImageBackground } from 'react-native';

import { Container, TextLoading } from './styles';
import { colors } from '../../themes';

const Loading: React.FC = () => (
  <>
    <Container>
      <ActivityIndicator
        color={colors.default.progressBar}
        size={80}
        testID={'activity-indicator'}
      />
      <TextLoading>Carregando </TextLoading>
    </Container>
  </>
);

export default Loading;
