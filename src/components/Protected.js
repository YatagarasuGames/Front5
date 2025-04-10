import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Protected({ token }) {
    const [data, setData] = useState(null);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        if (!token) {
            navigate('/login');
            return;
        }

        const fetchProtectedData = async () => {
            try {
                const response = await fetch('http://localhost:8080/api/protected', {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                });

                const result = await response.json();

                if (!response.ok) {
                    throw new Error(result.message || 'Ошибка доступа');
                }

                setData(result);
            } catch (err) {
                setError(err.message);
            }
        };

        fetchProtectedData();
    }, [token, navigate]);

    if (!token) {
        return null;
    }

    return (
        <div className="main-content">
            <div className="auth-card">
                <h2 className="auth-title">Защищенная страница</h2>
                {error && <div className="alert alert-danger">{error}</div>}
                {data && (
                    <div className="alert alert-success">
                        <p>{data.message}</p>
                        <p className="user-greeting">Добро пожаловать, {data.user.username}!</p>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Protected;