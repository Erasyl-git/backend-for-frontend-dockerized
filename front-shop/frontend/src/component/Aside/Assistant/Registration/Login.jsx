import React, { useEffect, useRef, useState } from "react"
import axios from "axios";
import { GrView } from "react-icons/gr";
import { FaRegEyeSlash } from "react-icons/fa6";



export default function LogIn() {
    const [img, setImg] = useState(JSON.parse(localStorage.getItem('imageUser')) || '')
    const [imgChange, setImgChange] = useState(false)
    const [username, setUsername] = useState(JSON.parse(localStorage.getItem('username')) || '')
    const [usernameRedactionDirty, setUsernameRedactionDirty] = useState(false)
    const [usernameRedactionError, setUsernameRedactionError] = useState('Поле для имени пользователья не может быть пустым')
    const [email, setEmail] = useState(JSON.parse(localStorage.getItem('email')) || '')
    const [emailRedactionDirty, setEmailRedactionDirty] = useState(false)
    const [emailRedactionError, setEmailRedactionError] = useState('Поле для почты не может быть пустым')
    const [password, setPassword] = useState(JSON.parse(localStorage.getItem('password')) || '')
    const [passwordRedaction, setPasswordRedactionDirty] = useState(false)
    const [passwordRedactionError, setPasswordRedactionError] = useState('Поле для паролья не может быть пустым')
    const [valid, setValid] = useState(false)
    const [users, setUsers] = useState([])
    const [viewNoView, setViewNoView] = useState(false)
    const nickname = useRef(null)
    const mail = useRef(null)
    const newPassword = useRef(null)
    const userUrl = 'https://media.istockphoto.com/id/1337144146/ru/%D0%B2%D0%B5%D0%BA%D1%82%D0%BE%D1%80%D0%BD%D0%B0%D1%8F/%D0%B2%D0%B5%D0%BA%D1%82%D0%BE%D1%80-%D0%B7%D0%BD%D0%B0%D1%87%D0%BA%D0%B0-%D0%BF%D1%80%D0%BE%D1%84%D0%B8%D0%BB%D1%8F-%D0%B0%D0%B2%D0%B0%D1%82%D0%B0%D1%80%D0%B0-%D0%BF%D0%BE-%D1%83%D0%BC%D0%BE%D0%BB%D1%87%D0%B0%D0%BD%D0%B8%D1%8E.jpg?s=612x612&w=0&k=20&c=fHyhvKma_mzzlFxVsuAoB7juqZOWt-ZUO56PRvkAO_c='
    const urlPy = 'http://127.0.0.1:8000/account/register/'
    let userObj = {}


    useEffect(() => {
        if (emailRedactionError || passwordRedactionError || usernameRedactionError) {
            setValid(false)
        } else {
            setValid(true)
        }
    }, [emailRedactionError, passwordRedactionError, usernameRedactionError])

    const changeEmailRedactionHandler = (e) => {
        setEmail(e.target.value)
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        if (!re.test(String(e.target.value).toLowerCase())) {
            setEmailRedactionError('Некорректная почта')
            if (!e.target.value) {
                setEmailRedactionError('Поле для почты не может быть пустым')
            }
        } else {
            setEmailRedactionError('')
        }
        localStorage.setItem('email', JSON.stringify(e.target.value))
    }

    const changeImgHandler = (e) => {
        setImg(e.target.value)
        localStorage.setItem('imageUser', JSON.stringify(e.target.value))
    }

    const changePasswordRedactionHandler = (e) => {
        setPassword(e.target.value)
        if (e.target.value.length < 3 || e.target.value.length > 12) {
            setPasswordRedactionError('Пароль должен быть в пределах 3-12 символов')
            if (!e.target.value) {
                setPasswordRedactionError('Поле для паролья не может быть пустым')
            }
        } else {
            setPasswordRedactionError('')
        }
        localStorage.setItem('password', JSON.stringify(e.target.value))
    }

    const changeUsernameRedactionHandler = (e) => {
        setUsername(e.target.value)
        if(e.target.value.length < 3 || e.target.value.length > 20) {
            setUsernameRedactionError('Имя пользователья должна быть длинне 3 символов и меньше 20 символов')
            if (!e.target.value) {
                setUsernameRedactionError('Поле для имени пользователья не может быть пустым')
            }
        } else {
            setUsernameRedactionError('')
        }
        localStorage.setItem('username', JSON.stringify(e.target.value))
    }

    const blurHandler = (e) => {
        e.preventDefault()
        switch (e.target.name) {
            case 'emailEdit':
                setEmailRedactionDirty(true)
                break
            case 'passwordRedaction':
                setPasswordRedactionDirty(true)
                break
            case 'userEdit':
                setUsernameRedactionDirty(true)
                break
            default:
        }
    }

    const userCreation = (e) => {
        if (img.length > 0) {
            setImg(JSON.parse(localStorage.getItem('imageUser')) || '')
        } else if (img.length === 0) {
            setImg('')
        }
        nickname.current.value = ''
        mail.current.value = ''
        newPassword.current.value = ''
        e.target.disabled = valid
        userObj = {
            "image" : img,
            "username" : username,
            "email" : email,
            "password" : password,
        }
        setUsers([...users, {...userObj}])
        axios
            .post(urlPy, { ...userObj })
            .then(response => {
                localStorage.setItem('profile_url', JSON.stringify(response.data.profile_url))
                localStorage.setItem('cart_url', JSON.stringify(response.data.cart_url))
                localStorage.setItem('status', JSON.stringify(response.status))
            })
    }

    const hideViewPassword = () => {
        const inputElement = document.querySelector('[data-password]')
        const inputType = inputElement.getAttribute('type')
        if(inputType === 'password') {
            inputElement.setAttribute('type', 'text')
        } else {
            inputElement.setAttribute('type', 'password')
        }
    }

    return (
        <div className="constructor">
            <div className="main_profile" data-profile>
                <div>
                    <div>
                        <div className="img__block">
                            <h3>Фото профиля:</h3>
                            <div>
                                <img src={img.length > 0 ? img : userUrl} alt="error" height="60px" width="60px" style={{
                                    borderRadius: '50px',
                                    background: 'no-reapet center center fixed'
                                }}/>
                                <button style={{
                                    marginLeft: '1rem',
                                    marginTop: '7px',
                                    padding: '9px',
                                    border: 'none',
                                    outline: 'none',
                                    borderRadius: '8px',
                                    color: '#fff',
                                    background: '#0d6efd',
                                }} onClick={() => {
                                    setImgChange(!imgChange)
                                }} type="button">Изменить фото профиля</button>
                            </div>
                            {imgChange && 
                                <div>
                                    <input style={{
                                        marginTop: '.8rem',
                                        marginBottom: '.5rem'
                                    }} className="form-control w-100" name="image" id="img" placeholder="Ставьте ссылку на ваше фото" onChange={e => changeImgHandler(e)}/>
                                </div>
                            }
                            <span>Максимальный размер фото 5 МБ</span>
                        </div>
                    </div>
                    <div className="username_block">
                        <h3>Имя пользователья:</h3>
                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                        }}>
                        </div>
                            <div>
                                {(usernameRedactionDirty && usernameRedactionError) && <div style={{color: 'red', margin: '0 0 5px 2px'}}>{usernameRedactionError}</div>}
                                    <input style={{
                                        margin: '.6rem 0' 
                                    }} ref={nickname} className="form-control w-100" type="username" name="userEdit" placeholder="Имя пользователья" onBlur={e => blurHandler(e)} onChange={e => changeUsernameRedactionHandler(e)}/>
                            </div>
                    </div>
                    <div className="email_block">
                        <h3>Почта пользователья:</h3>
                        <div style={{
                            display: 'flex',
                            alignItems: 'center'
                        }}>
                        </div>
                            <div>
                                {(emailRedactionDirty && emailRedactionError) && <div style={{color: 'red', margin: '0 0 5px 2px'}}>{emailRedactionError}</div>}
                                    <input style={{
                                        margin: '.6rem 0' 
                                    }} ref={mail} className="form-control w-100" type="text" name="emailEdit" placeholder="Почта пользователья" onBlur={e => blurHandler(e)} onChange={e => changeEmailRedactionHandler(e)}/>
                            </div>
                    </div>
                    <div className="password_block">
                        <h3>Изменить пароль:</h3>
                            {(passwordRedaction && passwordRedactionError) && <div style={{color: 'red', margin: '0 0 5px 2px'}}>{passwordRedactionError}</div>}
                        <div className="control">
                            <input ref={newPassword} data-password className="form-control w-100" type="password" name="passwordRedaction" placeholder="Придумайте пароль" onBlur={e => blurHandler(e)} onChange={e => changePasswordRedactionHandler(e)}/>
                            <button type="button" className="button" onClick={() => {
                                hideViewPassword()
                                setViewNoView(!viewNoView)
                            }}>{viewNoView ? <GrView /> : < FaRegEyeSlash/>}
                            </button>
                        </div>
                    </div>
                    <div>
                        <button data-btn disabled={!valid} className="btn btn-primary" type="button" onClick={e => {
                            userCreation(e)
                        }}>Зарегистрироваться</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
