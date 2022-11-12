import { useEffect, useRef } from 'react';
import { Menu } from '../menu/menu';
import './header.scss';

export const Header = () => {
    const ref = useRef(null);
    useEffect(() => {
        const element: HTMLElement = ref.current!;
        if (element) {
            const handleClick = (event: Event) => {
                if (window.scrollY > 50) {
                    element.classList.remove('alt');
                } else {
                    element.classList.add('alt');
                }
            };
            document.addEventListener('scroll', handleClick);

            return () => {
                document.removeEventListener('scroll', handleClick);
            };
        }
    }, []);
    return (
        <header ref={ref} id="header" className="alt">
            <Menu />
        </header>
    );
};
