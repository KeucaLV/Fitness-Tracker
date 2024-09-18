import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Register from './pages/Register';
import Login from './pages/Login'; // Import the Login component
import Home from './pages/Home';
import Terms from "./pages/Terms";
import Privacy from "./pages/Privacy";
import Slider from "./components/Slider";
import Profile from "./pages/Profile";
import CalendarComponent from "./components/Calendar";
import Workouts from "./pages/Workouts";
import Test from "./components/test";
// import NotFound from './components/notfound';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Register />} />
                <Route path="/login" element={<Login />} />
                <Route path="/home" element={<Home />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/calendar" element={<CalendarComponent />} />
                <Route path="/workouts" element={<Workouts />} />
                <Route path="/terms" element={<Terms />} />
                <Route path="/privacy" element={<Privacy />} />
                <Route path="/test" element={<Test />} />
                {/*<Route path="*" element={<NotFound />} />*/}
            </Routes>
        </Router>
    );
}

export default App;
