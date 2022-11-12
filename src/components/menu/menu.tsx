import { Fragment } from 'react';
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import './menu.scss';

export const Menu = () => {
    const [open, setOpen] = useState(false);
    const closeModal = () => setOpen(false);
    const location = useLocation();
    return (
        <Fragment>
            {location.pathname !== '/' && (
                <h1>
                    <Link to="/">На главную</Link>
                </h1>
            )}
            <nav onClick={() => setOpen((o) => !o)}>
                <span className="menu">Меню</span>
            </nav>
            <Popup open={open} onClose={closeModal} position="center center" modal>
                <div className="inner">
                    <h2>Меню</h2>
                    <ul className="links">
                        <li onClick={closeModal}>
                            <Link to="/">Домой</Link>
                        </li>
                        <li onClick={closeModal}>
                            <Link to="/about">О клубе</Link>
                        </li>
                        <li onClick={closeModal}>
                            <Link to="/training">Тренировки</Link>
                        </li>
                        <li onClick={closeModal}>
                            <Link to="/school">Школа альпинизма</Link>
                        </li>
                    </ul>
                    <span onClick={() => closeModal()} className="close">
                        Закрыть
                    </span>
                </div>
            </Popup>
        </Fragment>
    );
};
