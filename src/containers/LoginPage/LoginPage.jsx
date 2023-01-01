import React from 'react'
import './LoginPage.css'
import '../../App.css'

export const LoginPage = () => {
    return (
        <form className='loginForm'>
            <h2>Авторизация</h2>
            <div>
                <input type="text" placeholder='Имя пользователя' className='loginFormInput'/>
            </div>
            <div>
                <input type="password" placeholder='Пароль' className='loginFormInput'/>
            </div>
            <div>
                <button type="submit" className="blackBtn">Войти</button>
            </div>
        </form>
    )
}