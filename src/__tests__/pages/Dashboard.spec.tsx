import React from 'react';
import { fireEvent, render } from 'react-native-testing-library';
import Dashboard from '../../pages/Dashboard';

const mockedHandleSetPage = jest.fn();
const mockedUseNavigationNavigate = jest.fn();
const mockedMovies = [
  {
    id: 1,
    title: 'The Avengers',
    vote_average: 10,
    vote_count: 10000,
    release_date: new Date('2012-05-20'),
    backdrop_path: '/imagem_backdrop.png',
    poster_path: '/imagem_poster.png',
    genre_ids: [28, 16, 12],
  },
  {
    id: 2,
    title: 'Avengers: Age of Ultron',
    vote_average: 10,
    vote_count: 10000,
    release_date: new Date('2012-05-20'),
    backdrop_path: '/imagem_backdrop.png',
    poster_path: '/imagem_poster.png',
    genre_ids: [28],
  },
  {
    id: 3,
    title: 'Avengers: Infinity War',
    vote_average: 10,
    vote_count: 10000,
    release_date: new Date('2012-05-20'),
    backdrop_path: '/imagem_backdrop.png',
    poster_path: '/imagem_poster.png',
    genre_ids: [12],
  },
];

jest.mock('../../services/api', () => {
  return {
    genres: [
      {
        id: 28,
        name: 'Ação',
      },
      {
        id: 12,
        name: 'Aventura',
      },
      {
        id: 16,
        name: 'Animação',
      },
    ],
  };
});

jest.mock('../../hooks/movies', () => {
  return {
    useMovie: () => ({
      page: 1,
      setPage: mockedHandleSetPage,
      movies: mockedMovies,
    }),
  };
});

jest.mock('@react-navigation/native', () => {
  return {
    useNavigation: () => ({
      navigate: mockedUseNavigationNavigate,
    }),
  };
});

describe('Dashboard Component', () => {
  it('should be able to list movies', async () => {
    const { getByTestId } = render(<Dashboard />);

    const listMovies = getByTestId('list-movies');

    expect(listMovies.props.data).toEqual(expect.arrayContaining(mockedMovies));
  });

  it('should be able to list movies with pagination', async () => {
    const { getByTestId } = render(<Dashboard />);

    const listMovies = getByTestId('list-movies');

    const eventData = {
      nativeEvent: {
        contentOffset: {
          x: 500,
          y: 0,
        },
        contentSize: {
          // Dimensions of the scrollable content
          height: 500,
          width: 100,
        },
        layoutMeasurement: {
          // Dimensions of the device
          height: 100,
          width: 100,
        },
      },
    };

    fireEvent.scroll(listMovies, eventData);

    expect(mockedHandleSetPage).toHaveBeenCalled();
  });

  it('should be able to list genres', async () => {
    const { getByTestId } = render(<Dashboard />);

    const listMovies = getByTestId('list-genres');

    expect(listMovies.props.data).toEqual(
      expect.arrayContaining([
        { id: 28, name: 'Ação' },
        { id: 12, name: 'Aventura' },
        { id: 16, name: 'Animação' },
      ]),
    );
  });

  it('should be able to list with a gender filter', async () => {
    const { getByTestId, findAllByTestId } = render(<Dashboard />);

    const listMovies = getByTestId('list-movies');
    const card = await findAllByTestId('filter-card-item');

    fireEvent.press(card[0]);

    expect(listMovies.props.data).toEqual([mockedMovies[0], mockedMovies[1]]);
  });

  it('should be able to list with more than one gender filter', async () => {
    const { getByTestId, findAllByTestId } = render(<Dashboard />);

    const listMovies = getByTestId('list-movies');
    const card = await findAllByTestId('filter-card-item');

    fireEvent.press(card[0]);
    fireEvent.press(card[1]);

    expect(listMovies.props.data).toEqual([mockedMovies[0]]);
  });

  it('should be able to list when deselecting a filter', async () => {
    const { getByTestId, findAllByTestId } = render(<Dashboard />);

    const listMovies = getByTestId('list-movies');
    const card = await findAllByTestId('filter-card-item');

    fireEvent.press(card[0]);
    fireEvent.press(card[1]);
    fireEvent.press(card[0]);

    expect(listMovies.props.data).toEqual([mockedMovies[0], mockedMovies[2]]);
  });
});
