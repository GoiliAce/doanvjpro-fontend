import { Virtual } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/virtual';
import './user.css';
import { RecenlyPlayed, SongFavorite } from './userLibrary';
import { Navbar } from '../navbar/Navbar';
import { useActionData } from 'react-router-dom';
import { Error } from '../subcomponents/subcomponents';
import meomeoerror from '../../assets/images/meomeo.png'

import { useSelector } from 'react-redux';

export const User = () => {  
    const accountLogin = useSelector(state => state.accountLogin);
    return (
        accountLogin?.isLogin ? (
        <div id='content'>
            <Navbar />
            <RecenlyPlayed />
            <SongFavorite />
        </div>
    ): <Error id='content' img={meomeoerror} content={'Bạn chưa đăng nhập, vui lòng đăng nhập để truy cập'}/>)
};