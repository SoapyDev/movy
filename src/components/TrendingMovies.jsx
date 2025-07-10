import React, {useEffect, useState} from 'react';
import {getTrendingMovies} from "../appwrite.js";

const TrendingMovies = () => {
    const [trendingMovies, setTrendingMovies] = useState([]);
    const loadTrendingMovies = async () => {
        try {
            const movies = await getTrendingMovies();
            setTrendingMovies(movies);

        }catch (error){
            console.error(error);
        }
    };

    useEffect(() => {
        loadTrendingMovies().then();
    }, []);
    return (
        <div>
            {trendingMovies.length > 0 && (
                <section className="trending">
                    <h2>Trending movies</h2>

                    <ul>

                        {trendingMovies.map((movie, index) => (
                            <li key={movie.$id}>
                                <p>{index + 1}</p>
                                <img src={movie.poster_url} alt={movie.title} />
                            </li>
                        ))}

                    </ul>
                </section>
            )}
        </div>
    );
};

export default TrendingMovies;
