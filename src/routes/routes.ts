import { LazyPage1, LazyPage2, LazyPage3 } from "../01-lazyload/pages";

import { LazyExoticComponent, lazy } from 'react';
import { NoLazy } from "../01-lazyload/pages/NoLazy";

type JSXComponent = () => JSX.Element; //si nos posicionamos sobre las importaciones de arriba de LazyPage1, LazyPage2 o LazyPage3 nos aparecerá que su tipo es () => JSX.Element , y esos son componentes, osea que el tipo de dato de los componentes es ese, y aqui se creó un tipo llamado JSXComponent que represente un tipo de dato de componente, osea que almacene la referencia de una funcion de componente

interface Route {
    to: string;
    path: string;
    //Component: () => JSX.Element; //asi el atributo Component debe tener como valor la referencia de una funcion de componente como se explicó arriba
    //Component: React.LazyExoticComponent<() => JSX.Element> | (() => JSX.Element); //asi el atributo de Component puede tener como valor la referencia de una funcion de componente o la constante que represente una referencia de un componente pero cargado de manera peresosa (lazyload) con la funcion de lazy que se ve abajo con las constantes Lazy1, Lazy2 y Lazy3, el tipo de dato para un componente cargado de manera peresosa con el lazy se supo al posicionarnos sobre esa funcion de lazy ya que asi se dice el tipo de dato, y vimos que ahi el tipo de dato es React.LazyExoticComponent<() => JSX.Element> , por eso aqui en esta linea se puso ese tipo de dato tambien
    Component: LazyExoticComponent<JSXComponent> | JSXComponent; //esto es lo mismo que la anterior linea pero usando el type llamado JSXComponent que definimos arriba y para el React.LazyExoticComponent visto en la anterior linea no se le puso el React aqui en esta linea porque mas arriba se importó del paquete de 'react' el LazyExoticComponent
    //el atributo anterior de Component se puso con la primera letra en mayuscula porque en el Navigation.tsx hacemos un map del array de objetos de abajo para renderizar los NavLinks o Links y los Routes de forma dinamica ahi y este atributo de Component lo podríamos usar para ponerle ahi el componente a cargar con las rutas del Navigation.tsx, y si hacemos desestructuracion dentro de ese map del array de objetos de abajo (el routes) entonces con esa desestructuracion quedaría una variable llamada Component porque asi se llama este atributo y entonces para poner el componente de esa ruta de forma dinamica pues se pondría <Component /> en el que Component ahi hace referencia a la funcion de componente que tenga como valor este atributo Component en los objetos del array de routes de abajo, poniendo ese componente ahi en el Navigation.tsx de forma dinamica, eso se puede hacer pero para eso la primera letra debe ir en mayuscula, ya que si pusieramos <component /> asi con la primera letra en minuscula daría error, por eso aqui este atributo se puso con la primera letra en mayuscula, aunque eso ni lo ocupamos porque en el Navigation.tsx dentro del map del array del rutes de abajo no se hizo desestructuracion, por eso para renderizar el componente de forma dinamica ahi se puso <route.Component /> , y asi no hay problema, pero el problema si Component se hubiera puesto con la primera letra en minuscula hubiera sido si hubieramos desestructurado ahi para ya no tener el route pues y solo haber puesto <Component /> , por eso mejor la primera letra en mayuscula en este atributo
    name: string;
};



/*
//NOTA: Las siguientes 3 constantes son para tener la referencia de las funciones de componente del archivo LazyPage1.tsx, LazyPage2.tsx y LazyPage3.tsx pero para cargarse de manera peresosa (lazyload), de modo que esos componentes solo se carguen cuando se requieran, osea cuando vayamos a la ruta que le corresponde a ese componente solo ahí se cargará ese componente en nuestro proyecto y solo se cargará esa primera vez que entremos a la ruta de ese componente, ya que por default la carga de los componentes en las rutas como las rutas que se vieron en el curso 1 de react no se cargan dd forma peresosa, sino que desde el principio que entremos a nuestro proyecto y aunque no estemos aun en las demas rutas se carga desde el principio todos los componentes del proyecto, y react es muy rapido pero ya para proyectos muy grandes sería conveniente hacer la carga peresosa para mejorar la velocidad de nuestro proyecto, y tambien como cuando tenemos un modulo de login y los modulos cuando ya hemos iniciado sesion tambien ahí sería conveniente hacer la carga peresosa porque no tendría sentido tener ya todos los modulos y sus componentes cargados en nuestro proyecto si aun no se ha iniciado sesion (teniendo el modulo del login sin carga peresosa pero los modulos donde ya hemos iniciado sesion con carga peresosa), eso sería una utilidad de la carga peresosa si nuestro proyecto es muy grande especialmente, y con las siguientes constantes cargamos componentes individuales sin ser modulos o cosas asi de forma peresosa, mas abajo se ve la carga peresosa de lo que sería un modulo, osea un componente que tenga mas componentes con sus propias rutas, no solo un componente individual sin mas rutas hijas ahi pues, mas abajo se ve con el modulo y por eso lo siguiente se comentó y se puso lo que está mas abajo
//OJO que para poder importar un componente de manera peresosa con el lazy como se ve en las 3 constantes de abajo, esa funcion de componente se debe exportar por default, por eso en los componentes de LazyPage1, LazyPage2 y LazyPage3 se hizo una exportacion por default ademas de exportar la funcion en sí como se hacía en el curso 1 de react, y tambien para cuando usemos la carga peresosa en el componente donde pongamos el NavLink o Link y los Routes debemos poner en su html como elemento padre de todo ahi el <Suspense></Suspense> de react, eso es un higher order component, por eso vemos que en el Navigation.tsx pusimos el Suspense ahí, esto porque tenemos componentes que se cargarán de forma peresosa, y no necesariamente deben ser puros componentes con carga peresosa, puede ser que algunas rutas ahi tengan componentes con carga normal y otros con carga peresosa los que vayan dentro del Supense, y tambien en ese Suspense, que es un higher order componente, se le debe poner la propiedad de fallback, esto para que antes que se carguen los componentes con carga peresosa, y solo los que tiene carga peresosa, que se ejecute algun componente o html que le pongamos ahi en esa propiedad de fallback, si no queremos que se muestre nada o ejecute nada en lo que carga el componente con carga peresosa entonces al fallback le pondríamos el valor de null, osea fallback={null} , pero vemos que en el Navigation.tsx le pusimos fallback={ <span>Loading...</span> } , lo cual significa que en la parte donde se ve ese componente en el navegador se mostrará el texto de Loading... antes que termine de cargar el componente con la carga peresosa, ya que para que cargue se lleva un tiempo, react con vite es muy rapido pero aun asi lleva una cierta cantidad de milisegundos depende de lo grande que sea ese componente con carga peresosa, y pues en lo que carga se mostrará el html o componente que se le ponga al fallback, mostrando en este caso el texto Loading... en la parte del navegador donde aparece ese componente con carga peresosa antes que termine de cargar ese componente

const Lazy1 = lazy(() => import('../01-lazyload/pages/LazyPage1'));
const Lazy2 = lazy(() => import('../01-lazyload/pages/LazyPage2'));
const Lazy3 = lazy(() => import('../01-lazyload/pages/LazyPage3'));

export const routes: Route[] = [ //NOTA: Este array de objetos lo usamos en el archivo Navigation.tsx, de modo que ahi se declaran los NavLinks y los Routes para tener las rutas principales, pero en el curso 1 de react se vio eso de las rutas declaradas en ese mismo archivo donde se pon+ian los Routes y NavLinks o Links de modo que las rutas estaban hardcodeadas ahi, pero en este caso ahi las rutas se toman a partir de este array de objetos, de modo que tengamos este archivo como nuestras rutas y ya asi en el archivo Navigation.tsx solo ponemos el map de este array para que ahi se tenga igual los NavLinks o Links y los Routes pero de forma dinamica, funcionará igual pero asi tenemos como mas orden
    {
        to: '/lazy1',
        path: 'lazy1',
        //Component: LazyPage1, //asi sería para cargar el componente del archivo LazyPage1.tsx de forma tradicional que no sea peresosa
        Component: Lazy1, //asi sería para cargar el componente del archivo LazyPage1.tsx de manera peresosa, osea que se cargue en nuestro proyecto solo cuando nos vamos a la ruta de ese componente y solo esa primera vez se cargará, no se cargará asi desde el principio que entremos a nuestro proyecto, solo bajo demanda, asi funciona la carga peresosa (lazyload) y es util para cuando tenemos un proyecto muy grande
        name: 'Lazy-1'
    },
    {
        to: '/lazy2',
        path: 'lazy2',
        //Component: LazyPage2,
        Component: Lazy2,
        name: 'Lazy-2'
    },
    {
        to: '/lazy3',
        path: 'lazy3',
        //Component: LazyPage3,
        Component: Lazy3,
        name: 'Lazy-3'
    },
];
*/

//lo de arriba se comentó y lo de abajo se dejó porque lo de arriba se puso para cargar de manera peresosa componentes individuales como se ve en el componente de los archivos LazyPage1.tsx, LazyPage2.tsx y LazyPage3.tsx, pero lo de abajo es para cargar de manera peresosa lo que sería un modulo, osea no solo un componente, sino un componente que tenga sus propias rutas como rutas hijas, osea que tenga otros componentes ahi divididos por rutas, asi sería un modulo porque parte de una ruta y tiene sus propias rutas hijas como se ve en el componente LazyLayout.tsx, y de hecho hacer la carga peresosa por modulos que por componentes individuales es mas util, asi que por eso se comentó lo de arriba y se dejó lo de abajo 
const LazyLayout = lazy(() => import('../01-lazyload/layout/LazyLayout'));


export const routes: Route[] = [
    {
        to: '/lazyload/',
        path: '/lazyload/*', //NOTA: Esta sería la ruta principal del modulo que está en el archivo LazyLayout.tsx, ya que vemos que en ese archivo tenemos las rutas de 'lazy1', 'lazy2' y 'lazy3', siendo esas rutas las rutas hijas de esta ruta de aqui, por eso cuando tengamos una ruta padre debemos ponerle el asterisco (*) al final como se ve aqui para darle paso a las rutas hijas, de modo que si en el LazyLayout.tsx se ejecuta la ruta de 'lazy1' entonces se tendría la ruta de /lazyload/lazy1 , asi es como funcionan las rutas padre e hijas en react, y en este caso el componente del LazyLayout.tsx se está cargando de manera peresosa como se ve arriba, osea que ese componente y tambien los componentes de las rutas hijas que hay ahí solo se cargarán hasta que se vaya a la ruta de '/lazyload/' , y asi como tenemos las cosas en el Navigation.tsx si estamos en la ruta raiz, osea si estamos en el localhost:5173 se irá a la ruta /* , la cual manda a esta ruta de /lazyload/ por el Navigate que hay ahí, y entonces se ejecutará el componente LazyLayout, el cual tambien tiene sus rutas y vemos ahi que está el comodín de la ruta de '*' para que se vaya ahí en cualquier ruta que no coincida con las rutas hijas de ahi, osea cualquier ruta que no coincida con '/lazyload/lazy1' o '/lazyload/lazy2' y '/lazyload/lazy3' , y eso incluye a la ruta de '/lazyload/' , asi que ahi en ese componente se ejecutaría la ruta comodín de '*' , la cual con el Navigate redirige a la ruta hija de 'lazy1', osea que si ponemos la ruta raiz de localhost:5173 se mandaría automaticamente a la ruta localhost:5173/lazyload/lazy1 , asi que asi desde el principio se cargaría por lazyload el componente de LazyLayout y todos los componentes de sus rutas hijas, pero si hacemos refresh en el navegador cuando estamos en la ruta de /no-lazy que vemos abajo entonces al principio no se cargaría ni el componente de LazyLayout ni todos los componentes de sus rutas hijas que tenga, y se cargarán en el proyecto hasta que se vaya a la ruta raiz localhost:5173 o a la ruta de /lazyload
        Component: LazyLayout,
        name: 'Lazy-1'
    },
    {
        to: '/no-lazy',
        path: '/no-lazy',
        Component: NoLazy, //este componente se cargaría con la ruta localhost:5173/no-lazy de manera tradicional, no de manera peresosa ya que este componente no se puso con el lazy arriba
        name: 'No Lazy'
    },
];