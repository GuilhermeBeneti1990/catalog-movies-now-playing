import { Link } from 'react-router-dom';
import './styles.css';

function Header() {
    return (
        <header>
            <Link className='logo' to="/">PrimeFlix</Link>
            <Link className='favorites' to="/favorites">Favoritos</Link>
        </header>
    )
};

export default Header;