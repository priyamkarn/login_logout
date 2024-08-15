import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Signup from '../components/signup';
import Login from '../components/Login';

function App() {
    return (
            <Routes>
                <Route path="/signup" element={<Signup />} />
                <Route path="/login" element={<Login />} />
            </Routes>
    );
}

export default App;
