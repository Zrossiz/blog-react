import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import './App.css'
import { Header } from './components/Header/Header'
import { Footer } from './components/Footer/Footer'
import { BlogPage } from './containers/BlogPage/BlogPage'
import { LoginPage } from './containers/LoginPage/LoginPage'

export function App() {
  
  return (
      <Router>
        <div className="App">
          <Header />
          <main>
            <Routes>
              <Route
               path="/login"
               element={<LoginPage />}
              />
              <Route
               path="/"
               element={<BlogPage />} 
              />  
            </Routes>  
          </main>
          <Footer 
            year={new Date().getFullYear()}
          />
        </div>
      </Router>    
  );
}
