import { useState, useEffect } from 'react';

const MOBILE_BREAKPOINT = 767;

export const useMobile = () => {
    const [mobile, setMobile] = useState(window.innerWidth <= MOBILE_BREAKPOINT);

    useEffect(() => {
        const handleResize = () => {
            setMobile(window.innerWidth <= MOBILE_BREAKPOINT);
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return mobile;
};
