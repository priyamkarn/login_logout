import { useState } from 'react';
import axios from 'axios';
function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3000/api/v1/user/login', {
                email,
                password
            }, {
                withCredentials: true
            });

            console.log('Login successful:', response.data);
            setMessage('Login successful');
            setIsLoggedIn(true);
        } catch (error) {
            console.error('Error:', error.response ? error.response.data : error.message);
            setMessage('Error during login');
        }
    };

    const handleLogout = async () => {
        try {
            await axios.post('http://localhost:3000/api/v1/user/logout', {email,
                password}, {
                withCredentials: true 
            });

            console.log('Logout successful');
            setMessage('Logout successful');
            setIsLoggedIn(false);
        } catch (error) {
            console.error('Error:', error.response ? error.response.data : error.message);
            setMessage('Error during logout');
        }
    };

    return (
        <div>
            {!isLoggedIn ? (
                <form className='login-container' onSubmit={handleLogin}>
                    <div className='header'>
                        <h1>Login Form</h1>
                    </div>
                    <div>
                        <input
                            type="email"
                            placeholder='Enter your email'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <input
                            type="password"
                            placeholder='Enter your password'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    {message && <p className="message">{message}</p>}
                    <button type="submit">Login</button>
                </form>
            ) : (
                <div className='logout-container'>
                    <p>You are logged in</p>
                    {message && <p className="message">{message}</p>}
                    <button onClick={handleLogout}>Logout</button>
                </div>
            )}
        </div>
    );
}

export default Login;
