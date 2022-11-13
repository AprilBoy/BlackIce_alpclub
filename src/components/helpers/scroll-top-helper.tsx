import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export const ScrollTopHelper = (): null => {
    const { pathname } = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    return null;
};
