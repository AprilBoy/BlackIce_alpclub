import { Fragment, useEffect, useRef, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import './menu.scss';

export const Menu = () => {
    let [isClosed, setClosed] = useState(true);
    const ref: any = useRef();
    const location = useLocation();
    const navigate = useNavigate();
    const closeModal = () => ref.current.close();

    useEffect(() => {
        console.log(location);
        document.body.style.overflow = isClosed ? 'unset' : 'hidden';
    });

    return (
        <Fragment>
            {location.pathname !== '/' && (
                <h1>
                    <span onClick={() => navigate(-1)}>Назад</span>
                </h1>
            )}
            <Popup
                trigger={
                    <nav>
                        <span className='menu'>Меню</span>
                    </nav>
                }
                ref={ref}
                position='center center'
                onOpen={() => setClosed((isClosed = false))}
                onClose={() => setClosed((isClosed = true))}
                closeOnDocumentClick
                modal>
                <div className='inner'>
                    <h2>Меню</h2>
                    <ul className='links'>
                        <li onClick={closeModal}>
                            <Link to='/'>Домой</Link>
                        </li>
                        <li onClick={closeModal}>
                            <Link to='/about'>О клубе</Link>
                        </li>
                        <li onClick={closeModal}>
                            <Link to='/training'>Тренировки</Link>
                        </li>
                        <li onClick={closeModal}>
                            <Link to='/school'>Школа альпинизма</Link>
                        </li>
                    </ul>
                    <span
                        onClick={closeModal}
                        className='close'>
                        Закрыть
                    </span>
                </div>
            </Popup>
        </Fragment>
    );
};
