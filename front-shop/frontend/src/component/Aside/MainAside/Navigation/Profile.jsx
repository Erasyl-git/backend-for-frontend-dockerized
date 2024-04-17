import React from "react"
import { Link } from "react-router-dom"
import { FaPen } from "react-icons/fa";




export default function Profile() {
    const userUrl = 'data:image/jpeg;base64,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'

    return (
        <>
            {JSON.parse(localStorage.getItem('status')) === 200 ?
                <div>
                    <div className="main_form_control_block">
                        <div className="form_control_block">
                            <h2>Пользователь сайта</h2>
                            <Link to="/profile/update">
                                <div className="update_button"><FaPen /></div>
                            </Link>
                        </div>
                        <div className="form_control_img">
                            <h4>Фото профиля:</h4>
                            <div className="img_avatar">
                                <img
                                    src={JSON.parse(localStorage.getItem('imageUser')) === null ? userUrl : `${JSON.parse(localStorage.getItem('imageUser'))}`}
                                    alt="error"
                                    style={{
                                        width: '65px',
                                        height: '65px',
                                        borderRadius: '50px',
                                        margin: '3px 0'
                                    }}
                                />
                            </div>
                        </div>
                        <div className="form_control_username">
                            <h4>Имя пользователья:</h4>
                            <p>{JSON.parse(localStorage.getItem('username')) || '' }</p>
                        </div>
                        <div className="form_control_email">
                            <h4>Почта пользователья:</h4>
                            <p>{JSON.parse(localStorage.getItem('email')) || '' }</p>
                        </div>
                    </div>
                </div>
            :
            <div className="main_reg_control_block">
                <div className="reg_control_block">
                    <div className="btn_control_block">
                        <div className="sigin">
                            <Link to="/profile/signin">
                                <button type="button" className="btn btn-primary w-100">Войти</button>
                            </Link>
                        </div>
                        <div className="login">
                            <Link to="/profile/login">
                                <button type="button" className="btn btn-success w-100">Зарегистрироваться</button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>}
         </>
    )
}