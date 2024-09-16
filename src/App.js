import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Register from './components/register';
import Login from './components/login'; // Import the Login component
import Home from './components/home';
import Terms from "./components/terms";
import Privacy from "./components/privacy";
import Slider from "./components/slider";
import Profile from "./components/profile";
import CalendarComponent from "./components/calendar";
import Workouts from "./components/workouts";
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
                <Route path="/slider" element={<Slider />} />
                <Route path="/test" element={<Test />} />
                {/*<Route path="*" element={<NotFound />} />*/}
            </Routes>
        </Router>
    );
}

export default App;
