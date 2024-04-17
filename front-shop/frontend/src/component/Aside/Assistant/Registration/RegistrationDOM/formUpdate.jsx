import { Link } from "react-router-dom"
import { useState, useEffect, useRef } from "react"
import axios from "axios"


const UpdateDOM = () => {
    const [email, setEmail] = useState(JSON.parse(localStorage.getItem('email')) || '')
    const [emailRedactionDirty, setEmailRedactionDirty] = useState(false)
    const [emailRedactionError, setEmailRedactionError] = useState('Поле для почты не может быть пустым')
    const [password, setPassword] = useState(JSON.parse(localStorage.getItem('password')) || '')
    const [passwordRedaction, setPasswordRedactionDirty] = useState(false)
    const [passwordRedactionError, setPasswordRedactionError] = useState('Поле для паролья не может быть пустым')
    const [valid, setValid] = useState(false)
    const form = useRef(null)

    useEffect(() => {
        if (emailRedactionError || passwordRedactionError) {
            setValid(false)
        } else {
            setValid(true)
        }
    }, [emailRedactionError, passwordRedactionError])

    const changeEmailHandler = (e) => {
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

    const changePasswordHandler = (e) => {
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

    const blurHandler = (e) => {
        e.preventDefault()
        switch (e.target.name) {
            case 'email':
                setEmailRedactionDirty(true)
                break
            case 'password':
                setPasswordRedactionDirty(true)
                break
            default:
        }
    }

    return (
        <div className="update_control" style={{maxWidth: '300px', marginLeft: '5.5rem'}}>
            <form ref={form}>
                <span>
                    <label htmlFor="username">Имя пользователья</label>
                    <input type="text" name="username" className="form-control mt-2 mb-2" id="username" placeholder="Новое имя" onChange={(e) => localStorage.setItem('username', JSON.stringify(e.target.value))}/>
                </span>
                <span>
                    <label htmlFor="image">Новая аватарка</label>
                    <input type="text" name="image" className="form-control mt-2 mb-2" id="image" placeholder="Ставьте ссылку на новую аватарку" onChange={(e) => localStorage.setItem('imageUser', JSON.stringify(e.target.value))} />
                </span>
                <span>
                    <label htmlFor="email">Почта пользователья</label>
                {(emailRedactionDirty && emailRedactionError) && <div style={{color: 'red', margin: '0 0 5px 2px'}}>{emailRedactionError}</div>}
                    <input type="text" name="email" className="form-control mt-2 mb-2" id="email" placeholder="Новая почта" onBlur={(e) => blurHandler(e)} onChange={(e) => changeEmailHandler(e)}/>
                </span>
                <span>
                    <label htmlFor="password">Новый пароль</label>
                {(passwordRedaction && passwordRedactionError) && <div style={{color: 'red', margin: '0 0 5px 2px'}}>{passwordRedactionError}</div>}
                    <input type="password" name="password" className="form-control mt-2 mb-2" id="password" placeholder="Новый пароль" onBlur={(e) => blurHandler(e)} onChange={(e) => changePasswordHandler(e)}/>
                </span>
                <div className="update_btn">
                    <Link to="/profile">
                        <button type="button" disabled={!valid} className="btn btn-primary mt-2" onClick={() => {
                            form.current.reset()
                            axios
                                .put('http://127.0.0.1:8000/account/update/', {
                                    "old_username": JSON.parse(localStorage.getItem('username_json')),
                                    "username": JSON.parse(localStorage.getItem('username')),
                                    "email": email,
                                    "password": password,
                                    "image": JSON.parse(localStorage.getItem('imageUser'))
                                })
                                .then(data => {
                                    localStorage.setItem('username_json', JSON.stringify(data.data.user))
                                    localStorage.setItem('cart_url', JSON.stringify(data.data.cart_url))
                                    localStorage.setItem('profile_url', JSON.stringify(data.data.profile_url))
                                })
                                .catch(data => {
                                    localStorage.setItem('username_json', JSON.stringify(data.data.user))
                                    localStorage.setItem('cart_url', JSON.stringify(data.data.cart_url))
                                    localStorage.setItem('profile_url', JSON.stringify(data.data.profile_url))
                                })
                        }}>Изменить</button>
                    </Link>
                </div>
            </form>
        </div>
    )
}
 
export default UpdateDOM;