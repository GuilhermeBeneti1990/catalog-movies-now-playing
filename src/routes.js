import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Home from './pages/Home';
import Movie from './pages/Movie';
import Header from './components/Header';
import Favorites from './pages/Favorites';
import Error from './pages/Error';

function RoutesApp() {
    return (
        <BrowserRouter>
            <Header />
            <Routes>
                <Route path='/' element={ <Home /> } />
                <Route path='/movie/:id' element={ <Movie /> } />
                <Route path='/favorites' element={ <Favorites /> } />

                <Route path="*" element={ <Error /> } />
            </Routes>
        </BrowserRouter>
    )
};

export default RoutesApp;