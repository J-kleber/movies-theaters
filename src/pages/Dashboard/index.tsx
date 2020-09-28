import React, { useCallback, useRef, useState, useMemo } from 'react';
import { FlatList, Dimensions, Animated } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

import MovieCard from '../../components/MovieCard';
import FilterCard from '../../components/FilterCard';

import { genres } from '../../services/api';
import { colors } from '../../themes';
import { useMovie } from '../../hooks/movies';

import { ContainerFilter, Title, TitleFilter } from './styles';

const { width } = Dimensions.get('window');

const ITEM_SIZE = width * 0.75;

const Dashboard: React.FC = () => {
  const { page, setPage, movies } = useMovie();

  const scrollX = useRef(new Animated.Value(0)).current;

  const [filterGender, setFilterGender] = useState([] as number[]);

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
        onEndReachedThreshold={0.9}
        renderItem={({ item, index }) => (
          <MovieCard index={index} item={item} scrollX={scrollX} />
        )}
        testID="list-movies"
      />
    );
  }, [filterGender, movies, scrollX, page, setPage]);

  return (
    <LinearGradient colors={colors.default.gradient} style={{ flex: 1 }}>
      <Title>
        <FontAwesome5
          name="ticket-alt"
          size={30}
          color={colors.default.filmIcon}
        />{' '}
        Filmes
      </Title>
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
          testID="list-genres"
        />
      </ContainerFilter>
      {animatedFlatList}
    </LinearGradient>
  );
};

export default Dashboard;
