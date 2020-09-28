import React, { useEffect, useState } from 'react';
import moment from 'moment';
import { useNavigation } from '@react-navigation/native';
import { RectButton } from 'react-native-gesture-handler';
import { ProgressCircle } from 'react-native-svg-charts';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { FlatList } from 'react-native';

import api, { API_KEY, IMAGE_PATH } from '../../services/api';

import { colors } from '../../themes';

import noImage from '../../assets/sem-foto.png';

import IGender from '../../interfaces/IGender';
import IMovie from '../../interfaces/IMovie';

import {
  Container,
  TopContent,
  Header,
  Image,
  BottomContent,
  ContainerTitle,
  Title,
  TagsContainer,
  TagItem,
  SubTitle,
  DescriptionContainer,
  Description,
  OtherInfosContainer,
  ContainerGraph,
  TextScore,
} from './styles';

interface IMovieDetailsProps {
  route: {
    params: {
      movie: IMovie;
    };
  };
}

interface ILanguages {
  iso_639_1: string;
  name: string;
}

interface IMovieDetails extends IMovie {
  genres: IGender[];
  spoken_languages: ILanguages[];
  overview: string;
  runtime: number;
}

const MovieDetails: React.FC<IMovieDetailsProps> = ({ route }) => {
  const { movie } = route.params;

  const [movieDetail, setMovieDetail] = useState<IMovieDetails>(
    {} as IMovieDetails,
  );

  const { goBack } = useNavigation();

  useEffect(() => {
    const getMovieDetail = async (): Promise<void> => {
      const response = await api.get<IMovieDetails>(
        `movie/${movie.id}?api_key=${API_KEY}&language=pt-BR`,
      );
      setMovieDetail({
        ...movie,
        genres: response.data.genres,
        spoken_languages: response.data.spoken_languages,
        overview: response.data.overview,
        runtime: response.data.runtime,
      });
    };
    getMovieDetail();
  }, [movie]);

  return (
    <>
      <Container>
        <TopContent>
          <Header>
            <RectButton
              onPress={() => goBack()}
              testID="movie-details-back-button"
            >
              <FontAwesome5
                name="long-arrow-alt-left"
                size={25}
                color={colors.default.arrowBack}
              />
            </RectButton>
          </Header>
          <Image
            source={
              !movie.poster_path && !movie.backdrop_path
                ? noImage
                : {
                    uri: movie.poster_path
                      ? IMAGE_PATH + movie.backdrop_path
                      : IMAGE_PATH + movie.poster_path,
                  }
            }
            resizeMode="cover"
            testID="movide-details-image"
          />
        </TopContent>
        <BottomContent colors={colors.default.gradient}>
          <ContainerTitle>
            <Title testID="movie-title">{movieDetail.title}</Title>
          </ContainerTitle>

          {!!movieDetail.genres && (
            <TagsContainer>
              <FlatList
                data={movieDetail.genres}
                keyExtractor={item => item.id.toString()}
                renderItem={({ item: gender }) => (
                  <TagItem>{gender.name}</TagItem>
                )}
                horizontal
              />
            </TagsContainer>
          )}
          {!!movieDetail.release_date && (
            <SubTitle>
              Lançamento:{' '}
              {moment(movieDetail.release_date).format('DD/MM/YYYY')}
            </SubTitle>
          )}

          {!!movieDetail.runtime && (
            <SubTitle>
              Duração:{' '}
              {`${moment()
                .hours(movieDetail.runtime / 60)
                .format('hh')}h ${moment()
                .minutes(movieDetail.runtime)
                .format('mm')}min`}
            </SubTitle>
          )}
          {!!movieDetail.overview && (
            <DescriptionContainer showsVerticalScrollIndicator={false}>
              <Description>{movieDetail.overview}</Description>
            </DescriptionContainer>
          )}
          <SubTitle>Idiomas</SubTitle>
          <OtherInfosContainer>
            {!!movieDetail.spoken_languages && (
              <TagsContainer>
                <FlatList
                  data={movieDetail.spoken_languages}
                  keyExtractor={item => item.iso_639_1}
                  renderItem={({ item: language }) => (
                    <TagItem>{language.iso_639_1.toUpperCase()}</TagItem>
                  )}
                  horizontal
                />
              </TagsContainer>
            )}
            {!!movieDetail.vote_average && (
              <ContainerGraph>
                <ProgressCircle
                  style={{ width: 200, height: 100 }}
                  progress={movieDetail.vote_average / 10}
                  progressColor={colors.default.progressBar}
                  backgroundColor={colors.default.backgroundProgressBar}
                  strokeWidth={6}
                  startAngle={-Math.PI * 1.5}
                />
                <TextScore>{movieDetail.vote_average}</TextScore>
              </ContainerGraph>
            )}
          </OtherInfosContainer>
        </BottomContent>
      </Container>
    </>
  );
};

export default MovieDetails;
