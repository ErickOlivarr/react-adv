import styles from '../styles/styles.module.css';
import noImage from '../assets/no-image.jpg';

import { ReactElement, createContext, useContext, useState } from 'react';
import { useProduct } from '../hooks/useProduct';


interface Props {
    product: Product;
    children?: ReactElement | ReactElement[]
};

interface Product {
    id: string;
    title: string;
    img?: string;
};

interface ProductContextProps {
    counter: number;
    increaseBy: (value: number) => void;
    product: Product;
};

const ProductContext = createContext({} as ProductContextProps);
const { Provider } = ProductContext;

export const ProductImage = ({ img = '' }) => {
    
    const { product } = useContext( ProductContext );
    let imgToShow: string;

    if(img) {
        imgToShow = img;
    } else if(product.img) {
        imgToShow = product.img;
    } else {
        imgToShow = noImage;
    }

    
    return (
        // <img className={ styles.productImg } src="./coffee-mug.png" alt="Product image" />
        // <img className={ styles.productImg } src={ noImage } alt="Product image" />
        <img className={ styles.productImg } src={ imgToShow } alt="Product image" />
    );
};

export const ProductTitle = ({ title }: { title?: string }) => {
    
    const { product } = useContext( ProductContext );
    
    return (
        <span className={ styles.productDescription }>{ title ? title : product.title }</span>
    );
};

/*interface ProductButtonsProps {
    counter: number;
    increaseBy: (value: number) => void
};*/

export const ProductButtons = (/*{ counter, increaseBy }: ProductButtonsProps*/) => {
    
    const { increaseBy, counter } = useContext( ProductContext );
    
    return (
        <div className={ styles.buttonsContainer }>
            <button 
                className={ styles.buttonMinus }
                onClick={ () => increaseBy( -1 ) }> - </button>
        
            <div className={ styles.countLabel }> { counter } </div>

            <button 
                className={ styles.buttonAdd }
                onClick={ () => increaseBy( 1 ) }> + </button>
        </div>
    );
};

const ProductCardHOC = ({ children, product }: Props) => {

    const { counter, increaseBy } = useProduct(0);

    return (
        <Provider value={{
            counter,
            increaseBy,
            product
        }}>
            <div className={ styles.productCard }>

                {/* <ProductImage img={ product.img } />

                <ProductTitle title={ product.title } />            

                <ProductButtons counter={ counter } increaseBy={ increaseBy } /> */}

                { children }
            </div>
        </Provider>
    );
};


export const ProductCard = Object.assign( ProductCardHOC, {
    Title: ProductTitle,
    Image: ProductImage,
    Buttons: ProductButtons
});

/*
let ok = {uwu: 'nombre'};
let ok2 = Object.assign(ok, {uwu2: 'nombre2'});
console.log(ok2); //{uwu: 'nombre', uwu2: 'nombre2'}
*/