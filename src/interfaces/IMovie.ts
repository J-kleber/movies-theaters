export default interface IMovie {
  id: number;
  title: string;
  vote_average: number;
  vote_count: number;
  release_date: Date;
  backdrop_path: string;
  poster_path: string;
  genre_ids: number[];
}
