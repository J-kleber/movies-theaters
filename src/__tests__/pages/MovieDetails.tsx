import React from 'react';
import { fireEvent, render, waitFor } from 'react-native-testing-library';
import MockAdapter from 'axios-mock-adapter';

import MovieDetails from '../../pages/MovieDetails';

import api, { API_KEY, IMAGE_PATH } from '../../services/api';

const mockedUseNavigationGoBack = jest.fn();

jest.mock('@react-navigation/native', () => {
  return {
    useNavigation: () => ({
      goBack: mockedUseNavigationGoBack,
    }),
  };
});

const apiMock = new MockAdapter(api);

describe('MovieDetails Page', () => {
  it('should be able to get movie details', async () => {
    const { getByTestId } = render(
      <MovieDetails
        route={{
          params: {
            movie: {
              id: 1,
              title: 'The Avengers',
              vote_average: 10,
              vote_count: 10000,
              release_date: new Date('2012-05-20'),
              backdrop_path: '/imagem_backdrop.png',
              poster_path: '/imagem_poster.png',
              genre_ids: [1, 2, 3],
            },
          },
        }}
      />,
    );

    const apiResponse = {
      id: 1,
      title: 'The Avengers',
      vote_average: 10,
      vote_count: 10000,
      release_date: new Date('2012-05-20'),
      backdrop_path: '/imagem_backdrop.png',
      poster_path: '/imagem_poster.png',
      genre_ids: [1, 2, 3],
      genres: [{ name: 'action', id: 1 }],
      spoken_languages: [{ iso_639_1: 'en', name: 'English' }],
      overview: 'This is a description',
      runtime: 140,
    };

    apiMock
      .onGet(`movie/1?api_key=${API_KEY}&language=pt-BR`)
      .reply(200, apiResponse);

    const title = getByTestId('movie-title');

    await waitFor(() => {
      expect(title.props.children).toEqual('The Avengers');
    });
  });

  it('should be able to get movie details without poster path', async () => {
    const { getByTestId } = render(
      <MovieDetails
        route={{
          params: {
            movie: {
              id: 1,
              title: 'The Avengers',
              vote_average: 10,
              vote_count: 10000,
              release_date: new Date('2012-05-20'),
              backdrop_path: '/imagem_backdrop.png',
              poster_path: '',
              genre_ids: [1, 2, 3],
            },
          },
        }}
      />,
    );

    const apiResponse = {
      id: 1,
      title: 'The Avengers',
      vote_average: 10,
      vote_count: 10000,
      release_date: new Date('2012-05-20'),
      backdrop_path: '/imagem_backdrop.png',
      poster_path: '',
      genre_ids: [1, 2, 3],
      genres: [{ name: 'action', id: 1 }],
      spoken_languages: [{ iso_639_1: 'en', name: 'English' }],
      overview: 'This is a description',
      runtime: 140,
    };

    apiMock
      .onGet(`movie/1?api_key=${API_KEY}&language=pt-BR`)
      .reply(200, apiResponse);

    const image = getByTestId('movide-details-image');

    await waitFor(() => {
      expect(image.props.source).toEqual(
        expect.objectContaining({
          uri: `${IMAGE_PATH}/imagem_backdrop.png`,
        }),
      );
    });
  });

  it('should be able to get movie details without image', async () => {
    const { getByTestId } = render(
      <MovieDetails
        route={{
          params: {
            movie: {
              id: 1,
              title: 'The Avengers',
              vote_average: 10,
              vote_count: 10000,
              release_date: new Date('2012-05-20'),
              backdrop_path: '',
              poster_path: '',
              genre_ids: [1, 2, 3],
            },
          },
        }}
      />,
    );

    const apiResponse = {
      id: 1,
      title: 'The Avengers',
      vote_average: 10,
      vote_count: 10000,
      release_date: new Date('2012-05-20'),
      backdrop_path: '',
      poster_path: '',
      genre_ids: [1, 2, 3],
      genres: [{ name: 'action', id: 1 }],
      spoken_languages: [{ iso_639_1: 'en', name: 'English' }],
      overview: 'This is a description',
      runtime: 140,
    };

    apiMock
      .onGet(`movie/1?api_key=${API_KEY}&language=pt-BR`)
      .reply(200, apiResponse);

    const image = getByTestId('movide-details-image');

    await waitFor(() => {
      expect(image.props.source).toEqual(
        expect.objectContaining({
          testUri: '../../../src/assets/sem-foto.png',
        }),
      );
    });
  });

  it('should be able to get movie details without image', async () => {
    const { getByTestId } = render(
      <MovieDetails
        route={{
          params: {
            movie: {
              id: 1,
              title: 'The Avengers',
              vote_average: 10,
              vote_count: 10000,
              release_date: new Date('2012-05-20'),
              backdrop_path: '',
              poster_path: '',
              genre_ids: [1, 2, 3],
            },
          },
        }}
      />,
    );

    const apiResponse = {
      id: 1,
      title: 'The Avengers',
      vote_average: 10,
      vote_count: 10000,
      release_date: new Date('2012-05-20'),
      backdrop_path: '',
      poster_path: '',
      genre_ids: [1, 2, 3],
      genres: [{ name: 'action', id: 1 }],
      spoken_languages: [{ iso_639_1: 'en', name: 'English' }],
      overview: 'This is a description',
      runtime: 140,
    };

    apiMock
      .onGet(`movie/1?api_key=${API_KEY}&language=pt-BR`)
      .reply(200, apiResponse);

    const backButton = getByTestId('movie-details-back-button');

    fireEvent.press(backButton);

    await waitFor(() => {
      expect(mockedUseNavigationGoBack).toHaveBeenCalled();
    });
  });
});
