import logo from '../../assets/images/logo.png';
import Black_Ice from '../../assets/images/Black_Ice.svg';
import Trainings from '../../assets/images/Тренировки.jpeg';
import School from '../../assets/images/школа.jpeg';
import Travels from '../../assets/images/альпсборы.jpg';

import { Link } from 'react-router-dom';

export const HomePage = () => {
    return (
        <div id='page-wrapper'>
            <section id='banner'>
                <div className='inner'>
                    <picture>
                        <img
                            className='logo'
                            src={Black_Ice}
                            width='60%'
                            height='60%'
                            alt='Black_Ice'
                        />
                    </picture>
                    <h2>Клуб альпинистов и скалолазов</h2>
                    <p>люди, увлеченные горами</p>
                </div>
            </section>
            <section id='wrapper'>
                <section
                    id='one'
                    className='wrapper spotlight'>
                    <div className='inner'>
                        <Link
                            to='/about'
                            className='image image-none-border-radius'>
                            <img
                                src={logo}
                                width='100%'
                                height='100%'
                                alt=''
                            />
                        </Link>
                        <div className='content'>
                            <h2 className='major'>О клубе</h2>
                            <p>Наш клуб существует уже 10 лет. Мы постоянно растем и развиваемся</p>
                            <Link
                                to='/about'
                                className='special'>
                                Узнать больше
                            </Link>
                        </div>
                    </div>
                </section>
                <section
                    id='two'
                    className='wrapper alt spotlight style2'>
                    <div className='inner'>
                        <Link
                            to='/training'
                            className='image'>
                            <img
                                src={Trainings}
                                width='100%'
                                height='100%'
                                alt=''
                            />
                        </Link>
                        <div className='content'>
                            <h2 className='major'>Тренировки</h2>
                            <p>
                                Чтобы безопасно ходить в горы и получать удовольствие от процесса, нужно много
                                тренироваться
                            </p>
                            <Link
                                to='/training'
                                className='special'>
                                Тренироваться
                            </Link>
                        </div>
                    </div>
                    <div className='divider'></div>
                </section>

                <section
                    id='three'
                    className='wrapper  spotlight style3'>
                    <div className='inner'>
                        <Link
                            to='/school'
                            className='image'>
                            <img
                                src={School}
                                width='100%'
                                height='100%'
                                alt=''
                            />
                        </Link>
                        <div className='content'>
                            <h2 className='major'>Школа альпинизма</h2>
                            <p>
                                Знания и навыки очень важны для альпиниста. Мы поможем заложить основы безопасных
                                горовосхождений.
                            </p>
                            <Link
                                to='/school'
                                className='special'>
                                Учиться
                            </Link>
                        </div>
                    </div>
                    <div className='divider'></div>
                </section>

                <section
                    id='four'
                    className='wrapper alt spotlight'>
                    <div className='before'></div>
                    <div className='inner'>
                        <Link
                            to='/travels'
                            className='image'>
                            <img
                                src={Travels}
                                width='100%'
                                height='100%'
                                alt=''
                            />
                        </Link>
                        <div className='content'>
                            <h2 className='major'>Альпсборы</h2>
                            <p>Какой же альпинизм без восхождений? Поехали в горы с нами.</p>
                            <Link
                                to='/travels'
                                className='special'>
                                Поехать с нами
                            </Link>
                        </div>
                    </div>
                    <div className='after'></div>
                </section>
            </section>
        </div>
    );
};
