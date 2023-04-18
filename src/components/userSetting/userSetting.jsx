import React, { useEffect, useState } from 'react';

import {AccountInfo} from './settingComponents';
import './userSetting.css';
import { setShowSettingForm } from '../../redux/actions';
import { useDispatch, useSelector } from 'react-redux';

export const UserSetting = () => {
    const dispatch = useDispatch();
    const account = useSelector((state) => state.accountLogin);
    const [isClosed, setIsClosed] = useState(false);
    return (
        <div className='user-setting' id='content'>
            <div className="user-setting__content">
                <div className="user-setting__content__left">
                    <div className="user-setting__content__left__title">
                    Cài đặt người dùng
                    </div>
                    <div className="user-setting__content__left__item">  
                        <div className="user-setting__content__left__item__content">
                        Thông tin tài khoản
                        </div>
                    </div>
                    <div className="user-setting__content__left__item">  
                        <div className="user-setting__content__left__item__content">
                        Đổi mật khẩu
                        </div>
                    </div>
                    <div className="user-setting__content__left__item">  
                        <div className="user-setting__content__left__item__content">
                        Đăng xuất

                        </div>
                    </div>
                </div>
                <div className="user-setting__content__right">
                    {
                        account.isLogin? <AccountInfo account={account}/> : ''
                    }
                </div>
            </div>
        </div>
    )
}