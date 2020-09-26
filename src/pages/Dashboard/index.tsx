import React, {
  useCallback,
  useEffect,
  useRef,
  useState,
  useMemo,
} from 'react';
import {
  StatusBar,
  Text,
  View,
  FlatList,
  Image,
  Dimensions,
  Animated,
  TouchableOpacity,
  Platform,
  ActivityIndicator,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { RectButton } from 'react-native-gesture-handler';
import IMovie from '../../interfaces/IMovie';
import Loading from '../../components/Loading';
import MovieCard from '../../components/MovieCard';
import FilterCard from '../../components/FilterCard';

import api, { API_KEY, genres } from '../../services/api';
import { colors } from '../../themes';
import { ContainerFilter, TitleFilter } from './styles';

interface IMovieParamsProps {
  results: IMovie[];
}

// import Genres from './Genres';
// import Rating from './Rating';

const { width, height } = Dimensions.get('window');

const ITEM_SIZE = width * 0.75;

const Dashboard: React.FC = () => {
  const [movies, setMovies] = useState<IMovie[]>([] as IMovie[]);
  const scrollX = useRef(new Animated.Value(0)).current;
  const [filterGender, setFilterGender] = useState([] as number[]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const getMovie = async (): Promise<void> => {
      const response = await api.get<IMovieParamsProps>(
        `movie/upcoming?api_key=${API_KEY}&language=pt-BR&page=${page}`,
      );
      if (page === 1) {
        setMovies([
          {
            id: -1,
            title: 'empty_effect',
            vote_average: 0,
            vote_count: 0,
            release_date: new Date('2020-10-10'),
            backdrop_path: '',
            poster_path: '',
            genre_ids: [0],
          },
          ...response.data.results,
          {
            id: -2,
            title: 'empty_effect',
            vote_average: 0,
            vote_count: 0,
            release_date: new Date('2020-10-10'),
            backdrop_path: '',
            poster_path: '',
            genre_ids: [0],
          },
        ]);
      } else {
        setMovies(oldMovies => [
          ...oldMovies
            .filter(movie => movie.id !== -2)
            .concat(response.data.results, {
              id: -2,
              title: 'empty_effect',
              vote_average: 0,
              vote_count: 0,
              release_date: new Date('2020-10-10'),
              backdrop_path: '',
              poster_path: '',
              genre_ids: [0],
            }),
        ]);
      }
    };
    getMovie();
  }, [page]);

  const handleFilterGender = useCallback(
    (id: number) => {
      if (filterGender.length > 0 && !filterGender.includes(id)) {
        setFilterGender(oldFilter => [...oldFilter, id]);
      } else if (filterGender.length > 0) {
        setFilterGender(olderFilter => [
          ...olderFilter.filter(filter => filter !== id),
        ]);
      } else {
        setFilterGender([id]);
      }
    },
    [filterGender],
  );

  const animatedFlatList = useMemo(() => {
    return (
      <Animated.FlatList
        showsHorizontalScrollIndicator={false}
        data={movies.filter(movie =>
          filterGender.length > 0
            ? filterGender.every(gender => movie.genre_ids.includes(gender)) ||
              movie.genre_ids.includes(0)
            : movie,
        )}
        disableVirtualization={false}
        initialNumToRender={3}
        keyExtractor={(item, index) => index.toString()}
        horizontal
        bounces={false}
        decelerationRate={0.98}
        renderToHardwareTextureAndroid
        snapToInterval={ITEM_SIZE}
        snapToAlignment="start"
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          {
            useNativeDriver: false,
          },
        )}
        scrollEventThrottle={16}
        onEndReached={() => {
          const currentPage = page + 1;
          setPage(currentPage);
        }}
        onEndReachedThreshold={0.2}
        renderItem={({ item, index }) => (
          <MovieCard index={index} item={item} scrollX={scrollX} />
        )}
      />
    );
  }, [filterGender, movies, scrollX, page]);

  if (movies.length === 0) {
    return <Loading />;
  }

  return (
    <LinearGradient colors={colors.default.gradient} style={{ flex: 1 }}>
      <StatusBar backgroundColor={colors.default.primaryColor} />
      <ContainerFilter>
        <TitleFilter>Filtros</TitleFilter>
        <FlatList
          data={genres}
          showsHorizontalScrollIndicator={false}
          style={{ marginHorizontal: 20 }}
          horizontal
          keyExtractor={item => item.id.toString()}
          renderItem={({ item }) => (
            <FilterCard
              filterGender={filterGender}
              handleFilterGender={handleFilterGender}
              item={item}
            />
          )}
        />
      </ContainerFilter>
      {animatedFlatList}
    </LinearGradient>
  );
};

export default Dashboard;
