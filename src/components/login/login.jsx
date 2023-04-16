import { useState } from "react";
import "./login.css";
import { useSelector, useDispatch } from "react-redux";
import { setAccountLogin, setShowLoginForm } from "../../redux/actions";
import axios from 'axios';
import API_BASE_URL from '../../config';

export const LoginForm = () => {
    const dispatch = useDispatch();
    const [isLoginForm, setIsLoginForm] = useState(true);
    const showLoginForm = useSelector((state) => state.showLoginForm);
    const [loginsuccess, setLoginsuccess] = useState(true);

    function toggleForm() {
        setIsLoginForm(!isLoginForm);
    }
    function handleSetShowLoginForm() {
        dispatch(setShowLoginForm(false));
    }


    // Khi người dùng click vào nút Login

    const handleLogin = async (event) => {
        event.preventDefault();
        setLoginsuccess(true);
        // Lấy thông tin tài khoản và mật khẩu từ input
        const username = event.target.username.value;
        const password = event.target.password.value;
        // console.log(username, password);
        axios({
            method: 'post',
            url: `${API_BASE_URL}login`,
            data: {
                username: username,
                password: password
            }
        }).then((response) => {
            localStorage.setItem('access_token', response.data.access_token);   
            axios.get(`${API_BASE_URL}user`, {
                headers: {
                    'Authorization': `Bearer ${response.data.access_token}`
                }
            })
            .then((response) => {
                console.log(response.data);
                dispatch(setAccountLogin({
                    ...response.data,
                    isLogin: true
                }));
            })
            .catch((error) => {
                console.log(error);
            });    
            dispatch(setShowLoginForm(false));
        }).catch((error) => {
            setLoginsuccess(false);
        })
    };
    const handleRegister = async (event) => {
        event.preventDefault();
        const username = event.target.username.value;

        const email = event.target.email.value;
        const password = event.target.password.value;

        axios(
            {
                method: 'post',
                url: `${API_BASE_URL}register`,
                data: {
                    username: username,
                    email: email,
                    password: password
                }
            }
        ).then((response) => {
            console.log(response.data);
            alert('Đăng ký thành công.');
        }
        ).error((error) => {
            console.log(error);
            alert('Đăng ký thất bại.' + error);
        }
        );
    };
    
    return (
        // isLoginForm? `wrapper `:`wrapper active` 
        <div className={ showLoginForm ? `wrapper active-popup ${isLoginForm ? '' : 'active'}` : `wrapper`}>
            <span className="icon-close" onClick={handleSetShowLoginForm}>
                <box-icon name="x" type="solid" color="#000"></box-icon>
            </span>
            <div className="form-box login">
                <h2>Login</h2>
                <form onSubmit={handleLogin}>
                    <div className="input-box">
                        <span className="icon">
                            <box-icon name='user' type='solid' color="#fff" ></box-icon>
                        </span>
                        <input type="username" name="username" required />
                        <label>Username</label>
                    </div>
                    <div className="input-box">
                        <span className="icon">
                            <box-icon name='lock-alt' type='solid' color="#fff" ></box-icon>
                        </span>
                        <input type="password" name="password" required />
                        <label>Password</label>
                    </div>
                    <div className="remember-forgot">
                        <label>
                            <input type="checkbox" />
                            Remember me
                        </label>
                        <a href="#">Forgot Password?</a>
                    

                    </div>
                    <div className={`text-danger login-error ${!loginsuccess? 'active-error': ''}`}>Username or password error</div>
                    <button type="submit" className="btn">
                        Login
                    </button>
                    <div className="login-register">
                        <p>
                            Don't have an account?{" "}
                            <div onClick={toggleForm} className="register-link">
                                Register
                            </div>
                        </p>
                    </div>
                </form>
            </div>
            <div className="form-box register">
                <h2>Registration</h2>
                <form onSubmit={handleRegister}>
                    <div className="input-box">
                        <span className="icon">
                            <box-icon name='username1' type='solid' color="#fff" ></box-icon>
                        </span>
                        <input type="text" name="username" required />
                        <label>Username</label>
                    </div>
                    <div className="input-box">
                        <span className="icon">
                            <box-icon name='envelope' type='solid' color="#fff" ></box-icon>
                        </span>
                        <input type="email" name="email" required />
                        <label>Email</label>
                    </div>
                    <div className="input-box">
                        <span className="icon">
                            <box-icon name='lock-alt' type='solid' color="#fff" ></box-icon>
                        </span>
                        <input type="password" name="password" required />
                        <label>Password</label>
                    </div>
                    <div className="remember-forgot">
                        <label>
                            <input type="checkbox" />
                            I agree to the terms & conditions
                        </label>
                    </div>
                    <button type="submit" className="btn">
                        Register
                    </button>
                    <div className="login-register">
                        <p>
                            Already have an account?{" "}
                            <div onClick={toggleForm} className="login-link">
                                Login
                            </div>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    );
}

