import React from 'react'
import './LoginPage.css'
import '../../App.css'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'

export const LoginPage = (props) => {

    const history = useNavigate();

    const handleLoginIn = (e) => {
        e.preventDefault()
        history('/')
    }

    return (
        <form className='loginForm' onSubmit={handleLoginIn}>
            <h2>Авторизация</h2>
            <div>
                <input 
                    type="text" 
                    placeholder='Имя пользователя' 
                    className='loginFormInput'
                    required
                />
            </div>
            <div>
                <input 
                    type="password" 
                    placeholder='Пароль' 
                    className='loginFormInput'
                    required
                />
            </div>
            <div>
                <button>Войти</button>
            </div>
        </form>
    )
}