import {
  BrowserRouter,
  Route,
  Routes,
  Navigate,
  NavLink,
} from 'react-router-dom';

const logo = '/vite.svg'; //esto hace referencia a la carpeta public en la raiz del proyecto

export const Navigation = () => {
  return (
    <BrowserRouter>
      <div className="main-layout">
        <nav>
            <img src={ logo } width={ 200 } alt="React Logo" />
          <ul>
            <li>
              <NavLink to="/" className={ ({ isActive }) => isActive ? 'nav-active' : '' }>Home</NavLink>
            </li>
            <li>
              <NavLink to="/about" className={ ({ isActive }) => isActive ? 'nav-active' : '' }>About</NavLink>
            </li>
            <li>
              <NavLink to="/users" className={ ({ isActive }) => isActive ? 'nav-active' : '' }>Users</NavLink>
            </li>
          </ul>
        </nav>

        <Routes>  {/* este elemento de Routes se toma en cuenta para el display:flex que tiene la clase main-layout definida en el index.css y que se le puso al div de arriba el cual contiene como elementos hijos el nav de arriba y este elemento Routes */}
          <Route path="/about" element={ <h1>About page</h1> } />
          <Route path="/users" element={ <h1>Users page</h1> } />
          <Route path="/home" element={ <h1>Home page</h1> } />
          <Route path="/*" element={ <Navigate to="/home" replace /> } />
        </Routes>

      </div>
    </BrowserRouter>
  );
}