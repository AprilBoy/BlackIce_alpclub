import { Fragment, useEffect, useState } from 'react';
import './scroll-top.scss';

export const ScrollToTop = () => {
    const [isVisible, setIsVisible] = useState(false);
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };

    useEffect(() => {
        const toggleVisibility = () => {
            if (window.pageYOffset > 500) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        window.addEventListener('scroll', toggleVisibility);

        return () => window.removeEventListener('scroll', toggleVisibility);
    }, []);
    return (
        <Fragment>
            {isVisible && (
                <div className='scroll-to-top'>
                    <span
                        className='fa fa-angle-up'
                        onClick={scrollToTop}></span>
                </div>
            )}
        </Fragment>
    );
};
