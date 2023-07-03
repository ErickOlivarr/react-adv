import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'

//en el archivo Navigation.tsx, routes.ts y lo que está en la carpeta 01-lazyload se ve lo que es la carga peresosa (lazyload) en react

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
