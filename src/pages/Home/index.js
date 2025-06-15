import { useState, useEffect } from "react";
import api from "../../services/api";
import { Link } from "react-router-dom";
import './styles.css';

export const API_KEY = "2b45ef7ead7afba8bbc84d8a3cf6969e";

function Home() {

    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);

    const posterBasePath = "https://image.tmdb.org/t/p/original/";

    useEffect(() => {
        async function loadMovies() {
            const response = await api.get("movie/now_playing", {
                params: {
                    api_key: API_KEY,
                    language: "pt-BR",
                    page: 1
                }
            });

            setMovies(response.data.results.slice(0, 10));
            setLoading(false);
        }

        loadMovies();
    }, []);

    if(loading) {
        return (
            <div className="loading">
                <h2>Carregando filmes...</h2>
            </div>
        )
    }

    return (
        <div className="container">
            <div className="list-movie">
                {movies.map((movie) => {
                    return (
                        <article key={movie.id}>
                            <strong>{movie.title}</strong>
                            <img src={`${posterBasePath}${movie.poster_path}`} alt={movie.title} />
                            <Link to={`/movie/${movie.id}`}>Detalhes do filme</Link>
                        </article>
                    )
                })}
            </div>
        </div>
    )
};

export default Home;