import React from 'react';
import { ActivityIndicator, ImageBackground } from 'react-native';

import loadingImg from '../../assets/loading3.png';

import { Container, TextLoading } from './styles';
import { colors } from '../../themes';

const Loading: React.FC = () => (
  <>
    <ImageBackground source={loadingImg} style={{ flex: 1 }} />
    <Container>
      <TextLoading>Carregando </TextLoading>
      <ActivityIndicator
        color={colors.default.progressBar}
        size={50}
        testID={'activity-indicator'}
      />
    </Container>
  </>
);

export default Loading;
