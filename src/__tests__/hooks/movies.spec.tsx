import { renderHook, act } from '@testing-library/react-hooks';
import MockAdapter from 'axios-mock-adapter';
import { fireEvent } from 'react-native-testing-library';
import { useMovie, MovieProvider } from '../../hooks/movies';
import api, { API_KEY } from '../../services/api';

const apiMock = new MockAdapter(api);

describe('Auth hook', () => {
  beforeEach(() => {
    apiMock.reset();
  });

  it('should be able to get movie list', async () => {
    const apiResponse = {
      results: [
        {
          id: 1,
          title: 'The Avengers',
          vote_average: 10,
          vote_count: 10000,
          release_date: new Date('2012-05-20'),
          backdrop_path: '/imagem_backdrop.png',
          poster_path: '/imagem_poster.png',
          genre_ids: [1, 2, 3],
        },
      ],
    };
    apiMock
      .onGet(`movie/upcoming?api_key=${API_KEY}&language=pt-BR&page=1`)
      .reply(200, apiResponse);

    const { result, waitForNextUpdate } = renderHook(() => useMovie(), {
      wrapper: MovieProvider,
    });

    // (selector: () => any, options?: WaitOptions | undefined)
    // await waitForValueToChange(() => ({
    //   interval: 1000,
    //   timeout: 5000,
    //   suppressErrors: false,
    // }));
    await waitForNextUpdate();

    expect(result.current.movies[0].id).toEqual(-1);
    expect(result.current.movies[1].title).toEqual('The Avengers');
    expect(result.current.movies[2].id).toEqual(-2);
  });

  it('should be able to get movie list from page 2 or higher', async () => {
    const apiResponsePageOne = {
      results: [
        {
          id: 1,
          title: 'The Avengers',
          vote_average: 10,
          vote_count: 10000,
          release_date: new Date('2012-04-27'),
          backdrop_path: '/imagem_backdrop.png',
          poster_path: '/imagem_poster.png',
          genre_ids: [1, 2, 3],
        },
      ],
    };

    const apiResponsePageTwo = {
      results: [
        {
          id: 2,
          title: 'Avengers: Age of Ultron',
          vote_average: 8,
          vote_count: 5000,
          release_date: new Date('2015-04-23'),
          backdrop_path: '/imagem_backdrop.png',
          poster_path: '/imagem_poster.png',
          genre_ids: [1, 2, 3],
        },
      ],
    };

    apiMock
      .onGet(`movie/upcoming?api_key=${API_KEY}&language=pt-BR&page=1`)
      .reply(200, apiResponsePageOne);

    apiMock
      .onGet(`movie/upcoming?api_key=${API_KEY}&language=pt-BR&page=2`)
      .reply(200, apiResponsePageTwo);

    const { result, waitForNextUpdate } = renderHook(() => useMovie(), {
      wrapper: MovieProvider,
    });

    act(() => {
      result.current.setPage(2);
    });

    await waitForNextUpdate();

    expect(result.current.movies[0].id).toEqual(-1);
    expect(result.current.movies[1].id).toEqual(1);
    expect(result.current.movies[2].id).toEqual(2);
    expect(result.current.movies[3].id).toEqual(-2);
  });
});
