import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { useState } from 'react';
import Login from './components/Login';
import Register from './components/Register';
import Protected from './components/Protected';
import './App.css';

function App() {
  const [token, setToken] = useState(localStorage.getItem('token'));

  const handleLogout = () => {
    localStorage.removeItem('token');
    setToken(null);
  };

  return (
      <Router>
        <div className="app-container">
          <nav className="app-navbar">
            <div className="container">
              <Link className="navbar-brand" to="/">JWT Аутентификация</Link>
              <div className="nav-buttons">
                {!token ? (
                    <>
                      <Link className="nav-button" to="/login">Вход</Link>
                      <Link className="nav-button" to="/register">Регистрация</Link>
                    </>
                ) : (
                    <>
                      <Link className="nav-button" to="/protected">Защищенная страница</Link>
                      <button
                          onClick={handleLogout}
                          className="nav-button logout-button"
                      >
                        Выйти
                      </button>
                    </>
                )}
              </div>
            </div>
          </nav>

          <div className="main-content">
            <Routes>
              <Route path="/login" element={<Login setToken={setToken} />} />
              <Route path="/register" element={<Register />} />
              <Route path="/protected" element={<Protected token={token} />} />
              <Route path="/" element={
                <div className="welcome-container">
                  <h2 className="welcome-title">Добро пожаловать!</h2>
                  <p className="welcome-text">Пожалуйста, войдите или зарегистрируйтесь.</p>
                </div>
              } />
            </Routes>
          </div>
        </div>
      </Router>
  );
}

export default App;