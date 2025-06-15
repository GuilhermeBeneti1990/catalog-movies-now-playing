import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import './styles.css';

function Favorites() {

    const [movies, setMovies] = useState([]);

    useEffect(() => {
        const myList = localStorage.getItem("@primeflix");
        setMovies(JSON.parse(myList) || []);

    }, []);

    function remove(id) {
        let moviesFilter = movies.filter(movie => movie.id !== id);

        setMovies(moviesFilter);

        localStorage.setItem("@primeflix", JSON.stringify(moviesFilter));
        
        toast.success("Filme removido com sucesso da sua lista.");
    }

    return (
        <div className='favorites-list'>
            <h1>Favoritos</h1>

            {movies.length === 0 && <span>Não existe nenhum filme salvo!</span>}

            <ul>
                {movies.map(movie => {
                    return (
                        <li key={movie.id}>
                            <span>{movie.title}</span>
                            <div>
                                <Link to={`/movie/${movie.id}`}>Ver detalhes</Link>
                                <button onClick={() => remove(movie.id)}>Excluir</button>
                            </div>
                        </li>
                    )
                })}
            </ul>
        </div>
    )

};

export default Favorites;