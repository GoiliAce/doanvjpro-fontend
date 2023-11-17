import React, { useEffect, useState } from 'react';

import {AccountInfo, ChangePassword} from './settingComponents';
import './userSetting.css';
import { setAccountLogin, setShowSettingForm } from '../../redux/actions';
import { useDispatch, useSelector } from 'react-redux';
import { Error } from '../subcomponents/subcomponents';
import meomeoerror from '../../assets/images/meomeo.png'


export const UserSetting = () => {
    const dispatch = useDispatch();
    const account = useSelector((state) => state.accountLogin);
    const [isClosed, setIsClosed] = useState(false);
    const [option, setOption] = useState(1);
    const handleLogout = () => {
        dispatch(setAccountLogin({
            isLogin: false,
            username: '',
            email: '',
            thumbnail: '',
            id: ''
            }));
        localStorage.removeItem('access_token');
        dispatch(setShowSettingForm(false));    
    }
    return (
        account.isLogin ? (<div className='user-setting' id='content'>
        <div className="user-setting__content">
            <div className="user-setting__content__left">
                <div className="user-setting__content__left__title">
                Cài đặt người dùng
                </div>
                <div className="user-setting__content__left__item" onClick={()=>{setOption(1)}}>  
                    <div className="user-setting__content__left__item__content">
                    Thông tin tài khoản
                    </div>
                </div>
                <div className="user-setting__content__left__item" onClick={()=>{setOption(2)}}>  
                    <div className="user-setting__content__left__item__content">
                    Đổi mật khẩu
                    </div>
                </div>
                <div className="user-setting__content__left__item"  onClick={handleLogout}>  
                    <div className="user-setting__content__left__item__content">
                    Đăng xuất
                    </div>
                </div>
            </div>
            <div className="user-setting__content__right">
                {
                    option==1? <AccountInfo account={account}/>: <ChangePassword account={account}/>
                }
            </div>
        </div>
    </div>): (
        <Error id='content' img={meomeoerror} content={'Bạn chưa đăng nhập, vui lòng đăng nhập để truy cập'}/>
    )
    )
}