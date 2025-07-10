import React, {useEffect, useState} from 'react';
import Search from "./components/Search.jsx";
import {useDebounce} from "react-use";
import {updateSearchCount} from "./appwrite.js";
import TrendingMovies from "./components/TrendingMovies.jsx";
import AllMovies from "./components/AllMovies.jsx";

const API_BASE_URL = 'https://api.themoviedb.org/3'
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const API_OPTIONS = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: `Bearer ${API_KEY}`
    }
}

const App = () => {

    const [searchTerm, setSearchTerm] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [movies, setMovies] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');

    useDebounce(() => setDebouncedSearchTerm(searchTerm), 500, [searchTerm]);

    const fetchMovies = async (query = '') => {
        setIsLoading(true);
        setErrorMessage('');

        try{
            const endpoint = query
                ? `${API_BASE_URL}/search/movie?query=${encodeURIComponent(query)}`
                : `${API_BASE_URL}/discover/movie?sort_by=popularity.desc`;
            const response =  await fetch(endpoint, API_OPTIONS);

            if (!response.ok){
                throw new Error(`Error fetching movies : ${response.statusText}`);
            }

            const data = await response.json();

            if (data.Response === 'False'){
                setErrorMessage(data.Error || 'Failed to fetch movies');
                setMovies([]);
                return;
            }

            setMovies(data.results || []);

            if (query && data.results.length > 0) {
                await updateSearchCount(query, data.results[0]);
            }

        }catch(error) {
            console.error(`Error fetching movies : ${error}`);
            setErrorMessage(`Error fetching movies. Please try again later`)
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
         fetchMovies(debouncedSearchTerm).then();

    }, [debouncedSearchTerm]);

    return (
        <main>
            <div className={"pattern"}>

                <div className={"wrapper"}>
                    <header>
                        <img src={"./hero.png"}  alt={""}/>
                        <h1>Find <span className={"text-gradient"}>Movies</span> You'll Enjoy Without the Hassle</h1>
                        <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
                    </header>

                    <TrendingMovies />
                    <AllMovies isLoading={isLoading} errorMessage={errorMessage} movies={movies} />

                </div>

            </div>
        </main>
    );
};

export default App;