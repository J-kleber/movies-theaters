import React, { useMemo } from 'react';

import { Animated, Dimensions } from 'react-native';

import { ProgressCircle } from 'react-native-svg-charts';
import moment from 'moment';
import { useNavigation } from '@react-navigation/native';
import noImage from '../../assets/sem-foto-card.png';
import { colors } from '../../themes';
import IMovie from '../../interfaces/IMovie';
import { IMAGE_PATH } from '../../services/api';

import {
  Container,
  EmptyContainer,
  ClickableContainer,
  Image,
  MovieInfo,
  Title,
  ContainerTitle,
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
  const { navigate } = useNavigation();

  const { width } = Dimensions.get('window');
  const ITEM_SIZE = width * 0.75;

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
        <ClickableContainer
          underlayColor={'trasparent'}
          rippleColor={'transparent'}
          onPress={() => navigate('MovieDetails', { movie: item })}
          testID="button-movie-details"
        >
          <Image
            testID={'card-image'}
            source={
              !item.poster_path && !item.backdrop_path
                ? noImage
                : {
                    uri: item.poster_path
                      ? IMAGE_PATH + item.poster_path
                      : IMAGE_PATH + item.backdrop_path,
                  }
            }
            resizeMode={'contain'}
          />
        </ClickableContainer>
        <ContainerTitle showsVerticalScrollIndicator={false}>
          <Title>{item.title}</Title>
        </ContainerTitle>

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
              {moment(item.release_date).format('DD/MM/YY')}
            </TitleItem>
            <TextItem>Lançamento</TextItem>
          </ContainerItens>
        </MovieInfo>
      </Animated.View>
    );
  }, [translateY, item, navigate]);

  if (item.id < 0) {
    return <EmptyContainer testID="movie-details-empty" />;
  }

  return <Container>{animatedView}</Container>;
});

export default MovieCard;
