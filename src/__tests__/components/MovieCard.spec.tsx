import React from 'react';
import { Animated } from 'react-native';
import { fireEvent, render } from 'react-native-testing-library';
import { IMAGE_PATH } from '../../services/api';

import MovieCard from '../../components/MovieCard';

const mockedUseNavigationNavigate = jest.fn();

jest.mock('@react-navigation/native', () => {
  return {
    useNavigation: () => ({
      navigate: mockedUseNavigationNavigate,
    }),
  };
});

describe('MovieCard Component', () => {
  it('should be able to click on a movie card', () => {
    const { getByTestId } = render(
      <MovieCard
        item={{
          id: 1,
          title: 'The Avengers',
          vote_average: 10,
          vote_count: 10000,
          release_date: new Date('2012-04-27'),
          backdrop_path: '/imagem_backdrop.png',
          poster_path: '/imagem_poster.png',
          genre_ids: [1, 2, 3],
        }}
        index={1}
        scrollX={new Animated.Value(0)}
      />,
    );

    const button = getByTestId('button-movie-details');

    fireEvent.press(button);

    expect(mockedUseNavigationNavigate).toHaveBeenCalled();
  });

  it('should be able to render a empty movie card', () => {
    const { getByTestId } = render(
      <MovieCard
        item={{
          id: -1,
          title: 'empty_effect',
          vote_average: 0,
          vote_count: 0,
          release_date: new Date('2020-10-10'),
          backdrop_path: '',
          poster_path: '',
          genre_ids: [0],
        }}
        index={1}
        scrollX={new Animated.Value(0)}
      />,
    );

    const emptyContainer = getByTestId('movie-details-empty');

    expect(emptyContainer).toBeTruthy();
  });

  it('should be able to render a movie card without poster path', () => {
    const { getByTestId } = render(
      <MovieCard
        item={{
          id: 1,
          title: 'The Avengers',
          vote_average: 10,
          vote_count: 10000,
          release_date: new Date('2012-04-27'),
          backdrop_path: '/imagem_backdrop.png',
          poster_path: '',
          genre_ids: [1, 2, 3],
        }}
        index={1}
        scrollX={new Animated.Value(0)}
      />,
    );

    const image = getByTestId('card-image');
    expect(image.props.source).toEqual(
      expect.objectContaining({
        uri: `${IMAGE_PATH}/imagem_backdrop.png`,
      }),
    );
  });

  it('should be able to render a movie card without image', () => {
    const { getByTestId } = render(
      <MovieCard
        item={{
          id: 1,
          title: 'The Avengers',
          vote_average: 10,
          vote_count: 10000,
          release_date: new Date('2012-04-27'),
          backdrop_path: '',
          poster_path: '',
          genre_ids: [1, 2, 3],
        }}
        index={1}
        scrollX={new Animated.Value(0)}
      />,
    );

    const image = getByTestId('card-image');
    expect(image.props.source).toEqual(
      expect.objectContaining({
        testUri: '../../../src/assets/sem-foto-card.png',
      }),
    );
  });
});
