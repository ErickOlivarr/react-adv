import { LazyPage1, LazyPage2, LazyPage3 } from "../01-lazyload/pages";

import { LazyExoticComponent, lazy } from 'react';
import { NoLazy } from "../01-lazyload/pages/NoLazy";

type JSXComponent = () => JSX.Element;

interface Route {
    to: string;
    path: string;
    //Component: () => JSX.Element;
    //Component: React.LazyExoticComponent<() => JSX.Element> | (() => JSX.Element);
    Component: LazyExoticComponent<JSXComponent> | JSXComponent;
    name: string;
};

/*
const Lazy1 = lazy(() => import('../01-lazyload/pages/LazyPage1'));
const Lazy2 = lazy(() => import('../01-lazyload/pages/LazyPage2'));
const Lazy3 = lazy(() => import('../01-lazyload/pages/LazyPage3'));

export const routes: Route[] = [
    {
        to: '/lazy1',
        path: 'lazy1',
        //Component: LazyPage1,
        Component: Lazy1,
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

const LazyLayout = lazy(() => import('../01-lazyload/layout/LazyLayout'));


export const routes: Route[] = [
    {
        to: '/lazyload/',
        path: '/lazyload/*',
        Component: LazyLayout,
        name: 'Lazy-1'
    },
    {
        to: '/no-lazy',
        path: '/no-lazy',
        Component: NoLazy,
        name: 'No Lazy'
    },
];