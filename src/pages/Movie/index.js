import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../services/api";
import { API_KEY } from "../Home";
import { toast } from 'react-toastify';
import "./styles.css";

const YOUTUBE_BASE_SEARCH = "https://youtube.com/results?search_query=";

function Movie() {

    const { id } = useParams();
    const [movie, setMovie] = useState({});
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const posterBasePath = "https://image.tmdb.org/t/p/original/";

    useEffect(() => {
        async function loadMovie() {
            await api.get(`/movie/${id}`, {
                params: {
                    api_key: API_KEY,
                    language: "pt-BR",
                }
            })
            .then((response)  =>  {
                setMovie(response.data);
                setLoading(false);
            })
            .catch(() => {
                console.log("Não existe esse filme no nosso catálogo!")
                navigate("/", { replace: true });
                return;
            })
        }

        loadMovie();

        return () => {}
    }, [navigate, id]);

    function save() {
        const movieList = localStorage.getItem("@primeflix");

        let savedMovies = JSON.parse(movieList) || [];

        const hasMovie = savedMovies.some(savedMovie => savedMovie.id === movie.id);

        if(hasMovie) {
            toast.warn("Esse filme já está na lista!");
            return;
        }

        savedMovies.push(movie);

        localStorage.setItem("@primeflix", JSON.stringify(savedMovies));
        toast.success("Filme salvo com sucesso na sua lista.");
    }

    if(loading) {
        return (
            <div className="loading">
                <h2>Carregando detalhes do filme...</h2>
            </div>
        )
    }

    return (
        <div className="movie-info">
            <h1>{movie.title}</h1>
            <img src={`${posterBasePath}${movie.backdrop_path}`} alt={movie.title}/>

            <h3>Sinopse:</h3>
            <span>{movie.overview}</span>

            <strong>Avaliação: {movie.vote_average.toFixed(1)}/10</strong>

            <div className="button-area">
                <button onClick={save}>Salvar</button>
                <button>
                    <a target="blank" rel="external noreferrer" href={`${YOUTUBE_BASE_SEARCH}${movie.title}`}>
                        Trailers e Reviews
                    </a>
                </button>
            </div>
        </div>
    )
};

export default Movie;