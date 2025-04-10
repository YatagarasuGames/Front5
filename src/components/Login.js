import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login({ setToken }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:8080/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Ошибка входа');
            }

            localStorage.setItem('token', data.token);
            setToken(data.token);
            navigate('/protected');
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div className="main-content">
            <div className="auth-card">
                <h2 className="auth-title">Вход в систему</h2>
                {error && <div className="alert alert-danger">{error}</div>}
                <form className="auth-form" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label className="form-label">Имя пользователя:</label>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="form-control"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label className="form-label">Пароль:</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="form-control"
                            required
                        />
                    </div>
                    <button type="submit" className="submit-button">Войти</button>
                </form>
            </div>
        </div>
    );
}

export default Login;