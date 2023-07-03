import { useState } from "react";

export const useProduct = ( value: number ) => {
    const [counter, setCounter] = useState(value);

    const increaseBy = (value: number) => {
        setCounter( prev => Math.max(prev + value, 0) );
    };

    return {
        counter,
        increaseBy
    };
};