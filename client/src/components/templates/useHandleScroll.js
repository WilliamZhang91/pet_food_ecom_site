import { useState, useEffect, useRef } from "react";

export const useHandleScroll = () => {
    
    const [scrollPosition, setScrollPosition] = useState(0);
    const scrollRef = useRef(null);

    const handleScroll = () => {
        const position = window.pageYOffset;
        setScrollPosition(position);
        //console.log(position)
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return {
        handleScroll,
        scrollRef,
    }

};