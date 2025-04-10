import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Register() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:8080/api/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Ошибка регистрации');
            }

            setSuccess(true);
            setTimeout(() => navigate('/login'), 1500);
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div className="main-content">
            <div className="auth-card">
                <h2 className="auth-title">Регистрация</h2>
                {error && <div className="alert alert-danger">{error}</div>}
                {success && <div className="alert alert-success">Регистрация успешна! Перенаправляем на страницу входа...</div>}
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
                    <button type="submit" className="submit-button">Зарегистрироваться</button>
                </form>
            </div>
        </div>
    );
}

export default Register;