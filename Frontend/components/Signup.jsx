import { useState } from 'react';
import axios from 'axios';
function Signup() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
            const response = await axios.post('http://localhost:3000/api/v1/user/signup', {
                name,
                email,
                password
            }, {
                withCredentials: true
            });

            console.log('Signup successful:', response.data);
        } catch (error) {
            console.error('Error:', error.response ? error.response.data : error.message);
            setError('Error during signup');
        }
    };

    return (
        <form className='signup-container' onSubmit={handleSubmit}>
            <div className='header'>
                <h1>Signup Form</h1>
            </div>
            <div>
                <input
                    type="text"
                    placeholder='Enter your name'
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
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
            {error && <p className="error">{error}</p>}
            <button type="submit">Signup</button>
        </form>
    );
}

export default Signup;
