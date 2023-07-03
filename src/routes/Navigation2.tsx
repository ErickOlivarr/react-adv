//ver el archivo routes.ts, ahi se explica todo de esto

import {
  BrowserRouter,
  Route,
  Routes,
  Navigate,
  NavLink,
} from 'react-router-dom';

import { routes } from './routes';

import { Suspense } from 'react';
import { ShoppingPage } from '../02-components-patterns/pages/ShoppingPage';


const logo = '/vite.svg'; //esto hace referencia a la carpeta public en la raiz del proyecto

export const Navigation2 = () => {
  return (
      <BrowserRouter>
        <div className="main-layout">
          <nav>
              <img src={ logo } width={ 200 } alt="React Logo" />
            <ul>
              <li>
                <NavLink to="/" className={ ({ isActive }) => isActive ? 'nav-active' : '' }>Shopping</NavLink>
              </li>
            </ul>
          </nav>

          <Routes> 
            <Route path="/" element={ <ShoppingPage /> } />

            {/* <Route path="/*" element={ <Navigate to={ routes[0].to } replace /> } /> */}
          </Routes>

        </div>
      </BrowserRouter>
    
  );
}