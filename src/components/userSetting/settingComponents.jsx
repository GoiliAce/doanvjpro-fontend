import axios from 'axios';
import defaultAvatar from '../../assets/images/avt.png';
import { setAccountLogin } from '../../redux/actions';
import './settingComponents.css'
import { useEffect, useRef, useState } from 'react';
import FilePicker from 'react-file-picker';
import { useDispatch } from 'react-redux';
import API_BASE_URL from '../../config';







export const AccountInfo = ({ account }) => {
    const [showModalFormUpdateName, setShowModalFormUpdateName] = useState(false);
    const [showModalFormUpdateEmail, setShowModalFormUpdatEmail] = useState(false);

    const handleButtonClickOpen = (buttonType) => {
        if (buttonType === 'update-name') {
            setShowModalFormUpdateName(true);
        } else if (buttonType === 'update-email') {
            setShowModalFormUpdatEmail(true);
        }
    };
    const handleButtonClickClose = (buttonType) => {
        if (buttonType === 'update-name') {
            setShowModalFormUpdateName(false);
        } else if (buttonType === 'update-email') {
            setShowModalFormUpdatEmail(false);
        }
    };


    const FormUpdate = ({ contentButton, buttonType, showForm }) => {
        const dispatch = useDispatch();
        const [wrongpass, setWrongpass] = useState(false);
        const [wrongemail, setWrongemail] = useState(false);
        const handleModelSubmit = async (event) => {
            event.preventDefault();
            setWrongemail(false);
            setWrongpass(false);
            const form = event.target;
            const formData = new FormData(form);
            const data = Object.fromEntries(formData);
            console.log('====================================');
            console.log(data);
            console.log('====================================');
            // Thay đổi dữ liệu ở đây

            const res = await checkPassword(data.password);

            if (res) {
            const result = await updateAccount({...account, ...data});
            if (result) {
                delete data.password;
                dispatch(setAccountLogin({...account, ...data}));
            handleButtonClickClose(buttonType)

            } else {
                setWrongemail(true);
            }}
            else {
                setWrongpass(true);
            // Đóng form
            }
        };
        return contentButton && showForm && (
            <div className="modal-background">
                <div className="modal-container">
                    <button className="close-button" onClick={() => handleButtonClickClose(buttonType)}>
                        <box-icon name='x' color="#fff"></box-icon>
                    </button>
                    <div className="user-setting__form_update">
                        <div className="user-setting__form_update__title">
                            {contentButton.title}
                        </div>
                        <div className="user-setting__form_update__title_description">
                            {contentButton.description}
                        </div>
                        <div className="user-setting__form_update__content">
                            <form onSubmit={handleModelSubmit}>
                                {
                                    contentButton.content.map((item, index) => {
                                        return (
                                            <div className="form-group">
                                                <label for={item.name}>{item.title}</label>
                                                <input type={item.type} className="form-control" id={item.name} placeholder={item.value} name={item.name} />
                                                {item.name === 'email' && wrongemail && <small class="form-text text-danger">Email của bạn đã được sử dụng</small>}
                                                {item.name === 'password' && wrongpass && <small class="form-text text-danger">Mật khẩu của bạn không chính xác</small>}
                                            </div>
                                        )
                                    })
                                }

                                <button type="submit" class="btn_update" >Submit</button>

                            </form>
                        </div>
                    </div>
                </div>
            </div>

        )
    };
    const updateAccount = async (account) => {
        const access_token = localStorage.getItem('access_token');
        try {
            const response = await axios.put(`${API_BASE_URL}user`, account, {
                headers: {
                    'Authorization': `Bearer ${access_token}`
                }
            });
            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    }
    const checkPassword = async (password) => {
        const username = account.username;
        try {
            const response = await axios.post(`${API_BASE_URL}login`, 
            {
                username:username,
                password: password 
            });
            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    }
    useEffect(() => {
        updateAccount(account);
    }, [account]);

    const Avatar = ({ src, alt }) => {
        const dispatch = useDispatch();
        const handleFileUpload = (event) => {
            const file = event.target.files[0];
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => {
                const imageSrc = reader.result; // đường dẫn URL của tệp ảnh đã chọn
                const newAccount = { ...account, thumbnail: imageSrc };
                dispatch(setAccountLogin(newAccount));
            };

        }
        const handleFileSelect = () => {
            const fileInput = document.createElement('input');
            fileInput.type = 'file';
            fileInput.onchange = handleFileUpload;
            fileInput.click();
        }
        return (
            <div className="user-setting__content__right__item__content__item__avatar">
                <img id='avatar' src={src} alt={alt} />
                <box-icon onClick={handleFileSelect} type='solid' name='edit-alt' color="#fffff"></box-icon>
            </div>
        )
    }

    const AvatarWithCover = ({ src, alt, account }) => {
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

    const InfoItem = ({ title, content, contentButton, showForm }) => {
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
                    <button className='btn_update' onClick={() => handleButtonClickOpen(showForm.buttonType)}>Update</button>
                </div>
                <FormUpdate contentButton={contentButton} showForm={showForm.content} buttonType={showForm.buttonType} />
            </div>
        )
    }
    const Info = ({ account }) => {
        return (
            <div className="user-setting__content__right__item__content__item__info">
                <InfoItem title="Tên đăng nhập"
                    content={account.first_name + account.last_name === '' ? "None" : account.first_name +" "+ account.last_name}
                    contentButton={
                        {
                            title: "Đổi tên người dùng",
                            description: "Nhập tên người dùng mới và mật khẩu hiện tại",
                            content:
                                [
                                    {
                                        title: "First name",
                                        value: account.first_name,
                                        type: "text",
                                        name: "first_name"
                                    },
                                    {
                                        title: "Last name",
                                        value: account.last_name,
                                        type: "text",
                                        name: "last_name"
                                    },
                                    {
                                        title: "Mật khẩu hiện tại",
                                        value: "",
                                        type: "password",
                                        name: "password"
                                    }
                                ]
                        }
                    }
                    showForm={{
                        content: showModalFormUpdateName,
                        buttonType: "update-name"
                    }}
                />
                <InfoItem title="Email" content={account.email}
                    contentButton={
                        {
                            title: "Đổi email ",
                            description: "Nhập email mới và mật khẩu hiện tại",
                            content:
                                [
                                    {
                                        title: "Email",
                                        value: account.email,
                                        type: "email",
                                        name: "email"
                                    },
                                    {
                                        title: "Mật khẩu hiện tại",
                                        value: "",
                                        type: "password",
                                        name: "password"
                                    }
                                ]
                        }
                    }
                    showForm={{
                        content: showModalFormUpdateEmail,
                        buttonType: "update-email"
                    }}
                />
            </div>
        )
    }

    const UserInfo = ({ account }) => {
        return (
            <div className="user-setting__content__right__item__content__item">
                <div className="user-setting__content__right__item__content__item__user-info">
                    <AvatarWithCover src={account.thumbnail ? account.thumbnail : defaultAvatar} alt={account.username} />
                    <div className="user-setting__content__right__item__content__item__user-info__name">
                        <h3>{ account.first_name + account.last_name !=='' ? account.first_name +' '+ account.last_name : account.username}</h3>
                    </div>
                    <Info account={account} />
                </div>
            </div>
        )
    }
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