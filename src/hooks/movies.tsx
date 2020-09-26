import React, { createContext, useState, useContext, useEffect } from 'react';
import IMovie from '../interfaces/IMovie';
import api, { API_KEY } from '../services/api';

interface IMovieContextProps {
  page: number;
  loading: boolean;
  movies: IMovie[];
  setPage: React.Dispatch<React.SetStateAction<number>>;
  setMovies: React.Dispatch<React.SetStateAction<IMovie[]>>;
}

const MovieContext = createContext<IMovieContextProps>(
  {} as IMovieContextProps,
);

interface IMovieParamsProps {
  results: IMovie[];
}

export const MovieProvider: React.FC = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [movies, setMovies] = useState<IMovie[]>([] as IMovie[]);
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
        setLoading(false);
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
    console.log(page);
    getMovie();
  }, [page]);

  return (
    <MovieContext.Provider
      value={{ page, movies, loading, setPage, setMovies }}
    >
      {children}
    </MovieContext.Provider>
  );
};

export function useMovie(): IMovieContextProps {
  const context = useContext(MovieContext);

  if (!context) {
    throw new Error('useMovie must be used within a MovieProvider');
  }
  return context;
}
