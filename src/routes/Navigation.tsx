import {
  BrowserRouter,
  Route,
  Routes,
  Navigate,
  NavLink,
} from 'react-router-dom';
import { LazyPage1, LazyPage2, LazyPage3 } from '../01-lazyload/pages';


const logo = '/vite.svg'; //esto hace referencia a la carpeta public en la raiz del proyecto

export const Navigation = () => {
  return (
    <BrowserRouter>
      <div className="main-layout">
        <nav>
            <img src={ logo } width={ 200 } alt="React Logo" />
          <ul>
            <li>
              <NavLink to="/lazy1" className={ ({ isActive }) => isActive ? 'nav-active' : '' }>Lazy 1</NavLink>
            </li>
            <li>
              <NavLink to="/lazy2" className={ ({ isActive }) => isActive ? 'nav-active' : '' }>Lazy 2</NavLink>
            </li>
            <li>
              <NavLink to="/lazy3" className={ ({ isActive }) => isActive ? 'nav-active' : '' }>Lazy 3</NavLink>
            </li>
          </ul>
        </nav>

        <Routes>  {/* este elemento de Routes se toma en cuenta para el display:flex que tiene la clase main-layout definida en el index.css y que se le puso al div de arriba el cual contiene como elementos hijos el nav de arriba y este elemento Routes */}
          <Route path="/lazy1" element={ <LazyPage1 /> } />
          <Route path="/lazy2" element={ <LazyPage2 /> } />
          <Route path="/lazy3" element={ <LazyPage3 /> } />
          <Route path="/*" element={ <Navigate to="/lazy1" replace /> } />
        </Routes>

      </div>
    </BrowserRouter>
  );
}