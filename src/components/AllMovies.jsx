import React from 'react';
import Spinner from "./Spinner.jsx";
import MovieCard from "./MovieCard.jsx";

const AllMovies = ({isLoading, errorMessage, movies}) => {
    return (
        <section className="all-movies">
            <h2 className="mt-[40px]">All Movies</h2>

            {isLoading ? (
                <Spinner />
            ): errorMessage ? (
                <p className="text-red-500">{errorMessage}</p>
            ) : (
                <ul>
                    {movies.map((movie) => (
                        <MovieCard key={movie.id} movie={movie} />
                    ))}
                </ul>
            )}

        </section>
    );
};

export default AllMovies;
