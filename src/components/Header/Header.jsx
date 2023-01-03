import React from 'react'
import { Link } from 'react-router-dom'
import './Header.css'

export function Header() {
  return (
    <header>
        <nav>
          <Link to="/">Home</Link>
          <Link to="/login">Login</Link>  
          <Link to=''>About</Link>
        </nav>
      </header>
  )
}
