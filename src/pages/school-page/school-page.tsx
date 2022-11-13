import { Link } from 'react-router-dom';

export const SchoolPage = () => {
    return (
        <section id='wrapper'>
            <header>
                <div className='inner'>
                    <h2>Школа Альпинизма</h2>
                </div>
            </header>
            <div className='wrapper'>
                <div className='inner'>
                    <p>
                        Приглашаем на обучение всех, кто мечтает ходить в горы, но не знает с чего начать. Мы
                        подготовили практический курс, состоящий из пяти частей, пройдя которые вы сможете ходить в горы
                        как настоящие профессиональные альпинисты.
                    </p>
                    <p>
                        Под руководством основателя альпклуба Василия Гордеева вы получите все необходимые знания и
                        умения для безопасного восхождения в горах.
                    </p>

                    <p>
                        <a href='https://clc.am/3-6KHw'>
                            <strong>Регистрация на курс</strong>
                        </a>
                    </p>

                    <br />
                    <h3 className='major'>Ближайшие даты:</h3>
                    <div className='row'>
                        <div className='col-12'>
                            <ul>
                                <li>20 ноября 2022</li>
                                <li>4 декабря 2022</li>
                                <li>18 декабря 2022</li>
                            </ul>
                        </div>
                    </div>
                    <br />
                    <h3 className='major'>учебные блоки</h3>

                    <div className='table-wrapper'>
                        <table>
                            <thead>
                                <tr>
                                    <th>Блок</th>
                                    <th className='mobile-hidden'>Описание</th>
                                    <th>Цена</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>
                                        <Link to='newbie'>Начальный</Link>
                                    </td>
                                    <td className='mobile-hidden'>Вводный курс альпинизма</td>
                                    <td>7000</td>
                                </tr>
                                <tr>
                                    <td>
                                        <Link to='basement'>Базовый</Link>
                                    </td>
                                    <td className='mobile-hidden'>Работа в группе</td>
                                    <td>7000</td>
                                </tr>
                                <tr>
                                    <td>
                                        <Link to='advanced'>Продвинутый</Link>
                                    </td>
                                    <td className='mobile-hidden'>Более сложные технические приемы</td>
                                    <td>7000</td>
                                </tr>
                                <tr>
                                    <td>
                                        <Link to='snow_and_ice'>Снег и лед</Link>
                                    </td>
                                    <td className='mobile-hidden'>Техника передвижения по снегу и льду</td>
                                    <td>7000</td>
                                </tr>
                                <tr>
                                    <td>
                                        <Link to='rescue'>Спасработы</Link>
                                    </td>
                                    <td className='mobile-hidden'>Элементы спасательных работ в малой группе</td>
                                    <td>7000</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <br />
                    <h3 className='major'>Занятия проходят на скалодроме 'арена'</h3>
                    <div className='table-wrapper'>
                        <table className='alt'>
                            <tbody>
                                <tr>
                                    <td>Понеделнк</td>
                                    <td>Вторник</td>
                                    <td>Среда</td>
                                    <td>Четверг</td>
                                    <td>Пятница</td>
                                    <td>Суббота</td>
                                    <td>Воскресенье</td>
                                </tr>
                                <tr>
                                    <td></td>
                                    <td>
                                        Альпинизм
                                        <br />
                                        19:00
                                    </td>
                                    <td>
                                        Альпинизм
                                        <br />
                                        19:00
                                    </td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td>
                                        Альпинизм
                                        <br />
                                        (1-й поток)
                                        <br />
                                        13:00
                                        <br />
                                        <br />
                                        Альпинизм
                                        <br />
                                        (2-й поток)
                                        <br />
                                        15:30
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <br />

                    <h3 className='major'>Адрес скалодрома</h3>
                    <div className='row'>
                        <div className='col-12'>
                            <ul>
                                <li>Москва, Смирновская улица, 25 с. 1</li>
                                <li>
                                    <a
                                        rel='noreferrer'
                                        target='_blank'
                                        href='https://arenaclimb.ru/'>
                                        https://arenaclimb.ru/
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};
