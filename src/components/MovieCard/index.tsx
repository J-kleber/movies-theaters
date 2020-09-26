import React, { PureComponent, memo, useMemo } from 'react';

import { Animated, Dimensions, Text, View } from 'react-native';

import { ProgressCircle } from 'react-native-svg-charts';
import moment from 'moment';

import { colors } from '../../themes';
import IMovie from '../../interfaces/IMovie';
import { IMAGE_PATH } from '../../services/api';

import {
  Container,
  EmptyContainer,
  Image,
  MovieInfo,
  Title,
  ContainerItens,
  ContainerItensMiddle,
  ContainerGraph,
  TitleItem,
  TextItem,
  TextScore,
  styles,
} from './styles';

interface IMovieCardProps {
  index: number;
  item: IMovie;
  scrollX: Animated.Value;
}

const MovieCard = React.memo<IMovieCardProps>(({ index, item, scrollX }) => {
  const { width } = Dimensions.get('window');
  const ITEM_SIZE = width * 0.75;
  const EMPTY_ITEM_SIZE = (width - ITEM_SIZE) / 2;

  const inputRange = [
    (index - 2) * ITEM_SIZE,
    (index - 1) * ITEM_SIZE,
    index * ITEM_SIZE,
  ];

  const translateY = scrollX.interpolate({
    inputRange,
    outputRange: [125, 50, 125],
    extrapolate: 'clamp',
  });

  const animatedView = useMemo(() => {
    return (
      <Animated.View
        style={[
          styles.animatedCard,
          {
            transform: [{ translateY }],
          },
        ]}
      >
        <Image
          source={{ uri: IMAGE_PATH + item.poster_path }}
          resizeMode={'contain'}
        />
        <Title>{item.title}</Title>
        <MovieInfo>
          <ContainerItens>
            <TitleItem>{item.vote_count}</TitleItem>
            <TextItem>Qtd. Votos</TextItem>
          </ContainerItens>
          <ContainerItensMiddle>
            <ContainerGraph>
              <ProgressCircle
                style={{ width: 200, height: 68 }}
                progress={item.vote_average / 10}
                progressColor={colors.default.progressBar}
                backgroundColor={colors.default.backgroundProgressBar}
                strokeWidth={6}
                startAngle={-Math.PI * 1.5}
              />
              <TextScore>{item.vote_average}</TextScore>
            </ContainerGraph>
            <TextItem>Nota</TextItem>
          </ContainerItensMiddle>
          <ContainerItens>
            <TitleItem>
              {moment(item.release_date).format('DD/MM/YYYY')}
            </TitleItem>
            <TextItem>Lançamento</TextItem>
          </ContainerItens>
        </MovieInfo>
      </Animated.View>
    );
  }, [
    item.poster_path,
    item.release_date,
    item.title,
    item.vote_average,
    item.vote_count,
    translateY,
  ]);

  if (item.id < 0) {
    return <EmptyContainer />;
  }

  return <Container>{animatedView}</Container>;
});

export default MovieCard;
