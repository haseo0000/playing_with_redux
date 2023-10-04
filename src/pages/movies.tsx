import { useEffect } from "react";
// import { useGetAllMoviesQuery } from "../redux/services/movies";
import { RootState, useAppDispatch } from "../redux/store";
import { fetchMoviesList } from "../redux/moviesSlice";
import { useSelector } from "react-redux";

import { Image } from "antd";

const Movies = () => {
  const dispatch = useAppDispatch();
  // const { data, error, isFetching } = useGetAllMoviesQuery(null);

  const { loading, movies } = useSelector((state: RootState) => state.movies);

  // useEffect(() => {
  //   if (isFetching) return;

  //   dispatch(getAllMovies(data));
  // }, [data, isFetching, dispatch]);

  useEffect(() => {
    const promise = dispatch(fetchMoviesList());
    return () => {
      promise.abort();
    };
  }, [dispatch]);

  return (
    <>
      {loading ? (
        <h1>Loading Moviess..... :D</h1>
      ) : (
        <>
          {movies.map((item) => (
            <div className="movie_card" key={item.id}>
              <Image width={200} height={200} src={item.primaryImage.url} />
              <div>
                <div className="movie_detail">
                  <h3>Movie : </h3>
                  <span>{item.titleText}</span>
                </div>
                <div className="movie_detail">
                  <h3>Caption : </h3> <span>{item.primaryImage.caption}</span>
                </div>
                <div className="movie_detail">
                  <h3>Year : </h3>
                  <span>{item.releaseYear}</span>
                </div>
              </div>
            </div>
          ))}
        </>
      )}
    </>
  );
};

export default Movies;
