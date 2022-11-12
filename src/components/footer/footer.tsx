import './footer.scss';
import Walrus from '../../assets/images/walrus_icon.svg';

export const Footer = () => {
    return (
        <footer id='footer'>
            <div className='inner'>
                <h2 className='major'>Всегда на связи</h2>
                <p>По любым вопросам вы можете нам написать или позвонить. Мы ответим. Всегда.</p>
                <ul className='contact'>
                    <li className='icon solid fa-phone'>+7 (926) 677-08-71</li>
                    <li className='icon solid fa-envelope'>
                        <a
                            target='_blank'
                            href='mailto:blackicealpclub@gmail.com'
                            rel='noreferrer'>
                            blackicealpclub@gmail.com
                        </a>
                    </li>
                    <li className='icon brands fa-vk'>
                        <a
                            target='_blank'
                            href='https://vk.com/black_ice_alpinizm'
                            rel='noreferrer'>
                            vk.com/black_ice_alpinizm
                        </a>
                    </li>
                    <li className='icon brands fa-facebook-f'>
                        <a
                            target='_blank'
                            href='https://www.facebook.com/%D0%90%D0%BB%D1%8C%D0%BF%D0%BA%D0%BB%D1%83%D0%B1-Black-Ice-106732311471707'
                            rel='noreferrer'>
                            facebook.com/BlackIce
                        </a>
                    </li>
                    <li className='icon brands fa-instagram'>
                        <a
                            target='_blank'
                            href='https://www.instagram.com/blackiceclub/'
                            rel='noreferrer'>
                            @blackiceclub
                        </a>
                    </li>
                </ul>
                <div className='copyright flex'>
                    <a
                        className='flex'
                        target='_blank'
                        href='https://github.com/AprilBoy'
                        rel='noreferrer'>
                        &copy; Night Walrus Production&nbsp;
                        <img
                            src={Walrus}
                            width='24px'
                            height='24px'
                            alt='Night Walrus'
                        />
                    </a>
                </div>
            </div>
        </footer>
    );
};
