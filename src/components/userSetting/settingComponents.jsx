import defaultAvatar from '../../assets/images/avt.png';
import './settingComponents.css'
import { useEffect, useRef } from 'react';

const Avatar = ({ src, alt }) => {
    return (
        <div className="user-setting__content__right__item__content__item__avatar">
            <img src={src} alt={alt} />
        </div>
    )
}

const AvatarWithCover = ({ src, alt }) => {
    const canvasRef = useRef(null);

    useEffect(() => {
        // Lấy context của canvas và tạo ảnh bìa
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        const coverImg = new Image();
        coverImg.src = src;

        // Đợi ảnh bìa tải xong trước khi thực hiện tính toán
        coverImg.onload = () => {
            // Vẽ ảnh bìa lên canvas
            ctx.drawImage(coverImg, 0, 0);

            // Lấy dữ liệu pixel từ ảnh bìa
            const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
            const data = imageData.data;

            // Tính toán màu trung bình
            let rTotal = 0, gTotal = 0, bTotal = 0, count = 0;
            for (let i = 0; i < data.length; i += 4) {
                rTotal += data[i];
                gTotal += data[i + 1];
                bTotal += data[i + 2];
                count++;
            }
            const rAverage = Math.round(rTotal / count);
            const gAverage = Math.round(gTotal / count);
            const bAverage = Math.round(bTotal / count);
            const averageColor = `rgb(${rAverage}, ${gAverage}, ${bAverage})`;

            // Đặt màu nền cho canvas
            ctx.fillStyle = averageColor;
            ctx.fillRect(0, 0, canvas.width, canvas.height);
        }
    }, [src]);

    return (
        <div className="user-setting__content__right__item__content__item__cover">
            <canvas ref={canvasRef} />
            <Avatar src={src} alt={alt} />

        </div>
    )
}
const InfoItem = ({ title, content }) => {
    return (
        <div className="user-setting__content__right__item__content__item__info__item">
            <div className='item__content__item__info__item_info'>
                <div className="item__info__item__title">
                    <h3>{title}</h3>
                </div>
                <div className="item__info__item__content">
                    <span>{content}</span>
                </div>
            </div>
            <div className='item__content__item__info__item_update'>
                <button className='btn_update'>Update</button>
            </div>
            
        </div>
    )
}
const Info = ({account}) => {
    return (
        <div className="user-setting__content__right__item__content__item__info">
            <InfoItem title="Tên đăng nhập" content={account.username}/>
            <InfoItem title="Email" content={account.email}/>
        </div>
    )
}

const UserInfo = ({ account }) => {
    return (
        <div className="user-setting__content__right__item__content__item">
            <div className="user-setting__content__right__item__content__item__user-info">
                <AvatarWithCover src={account.thumbnail? account.thumbnail: defaultAvatar} alt={account.username} /> 
                <div className="user-setting__content__right__item__content__item__user-info__name">
                    <h3>{account.username}</h3>
                </div>
                <Info account={account}/>
            </div>
        </div>
    )
}


export const AccountInfo = ({ account }) => {
    return (
        <div className="user-setting__content__right__item">
            <div className="user-setting__content__right__item__title">
                <h2>Tài khoản của tôi</h2>
            </div>
            <div className="user-setting__content__right__item__content">
                <UserInfo account={account} />
            </div>
        </div>
    )
}