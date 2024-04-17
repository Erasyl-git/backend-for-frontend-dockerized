import React, { useEffect, useRef, useState } from "react"
import { Link } from "react-router-dom"
import { GrView } from "react-icons/gr";
import { FaRegEyeSlash } from "react-icons/fa6";
import { modalOpen } from "./Modal/Modal";
import ModalWindow from "./Modal/Modal";
import axios from "axios";


export default function SignIn() {
    // Форма входа
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
    const urlPy = 'http://127.0.0.1:8000/account/signin/'
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
        nickname.current.value = ''
        mail.current.value = ''
        newPassword.current.value = ''
        e.target.disabled = valid
        userObj = {
            "username" : username,
            "email" : email,
            "password" : password
        }
        setUsers([...users, {...userObj}])
        axios
            .post(urlPy, { ...userObj })
            .then(data => {
                localStorage.setItem('cart_url', JSON.stringify(data.data.cart_url))
                localStorage.setItem('profile_url', JSON.stringify(data.data.profile_url))
                localStorage.setItem('username_json', JSON.stringify(data.data.user))
                localStorage.setItem('id', JSON.stringify(data.data.user_id))
                localStorage.setItem('status', JSON.stringify(data.status))
                console.log(data.data)
                if (JSON.parse(localStorage.getItem('status')) !== 200) {
                    return modalOpen({
                        title: 'Ошибка',
                        body: 'Ошибка сервера, попробуйте снова!',
                        footer: <button type="button" className="btn btn-danger">Закрыть</button>
                    })
                } else if (JSON.parse(localStorage.getItem('status')) === 200) {
                    axios
                        .get(`http://127.0.0.1:8000${data.data.profile_url}`)
                        .then(response => {
                            localStorage.setItem('imageUser', JSON.stringify(response.data.image))
                            console.log('GET')
                        })
                    modalOpen({
                        title: 'Вы вошли!',
                        body: 'Вы успешно вошли!',
                        footer: <Link to="/profile"><button type="button" className="btn btn-success">Закрыть</button></Link>
                    })
                }
                
            })
            .catch(data => {
                if (data.request.status === 0) {
                    return modalOpen({
                        title: `Ошибка, код статуса: ${data.request.status}`,
                        body: 'Ошибка сети, попробуйте снова!',
                        footer: <button type="button" className="btn btn-danger">Закрыть</button>
                    })
                }
                console.log(data)
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
        <div>
            <div className="constructor">
                <div className="main_profile" data-profile>
                    <div>
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
                            <h3>Введите пароль:</h3>
                                {(passwordRedaction && passwordRedactionError) && <div style={{color: 'red', margin: '0 0 5px 2px'}}>{passwordRedactionError}</div>}
                            <div className="control">
                                <input ref={newPassword} data-password className="form-control w-100" type="password" name="passwordRedaction" placeholder="Введите пароль" onBlur={e => blurHandler(e)} onChange={e => changePasswordRedactionHandler(e)}/>
                                <button type="button" className="button" onClick={() => {
                                    hideViewPassword()
                                    setViewNoView(!viewNoView)
                                }}>{viewNoView ? <GrView /> : < FaRegEyeSlash/>}
                                </button>
                            </div>
                        </div>
                        <div>
                            <button disabled={!valid} className="btn btn-primary" type="button" onClick={e => {
                                userCreation(e)
                            }}>Войти</button>
                        </div>
                    </div>
                </div>
            </div>
            <ModalWindow />
        </div>
    )
}