import { useState, useEffect, useRef } from 'react';

function useAutoWidth() {
    const inputRef = useRef<HTMLInputElement>(null);
    const spanRef = useRef<HTMLSpanElement>(null);
    const [inputWidth, setInputWidth] = useState('auto');

    useEffect(() => {
        const spanWidth = spanRef.current!.offsetWidth; // add non-null assertion operator
        setInputWidth(`${spanWidth + 10}px`); // +10px for a bit of padding
    }, [spanRef.current && spanRef.current.offsetWidth]);

    return { inputRef, spanRef, inputWidth };
}

export default useAutoWidth;
