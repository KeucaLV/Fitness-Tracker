import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Register from './pages/Register';
import Login from './pages/Login';
import Home from './pages/Home';
import Terms from "./pages/Terms";
import Privacy from "./pages/Privacy";
import DietPlan from "./pages/DietPlan";
import Profile from "./pages/Profile";
import CalendarPage from "./pages/CalendarPage";
import Workouts from "./pages/Workouts";
import WorkoutList from "./pages/WorkoutList";
import ProtectedRoute from './components/ProtectedRoute'; // Import the ProtectedRoute

function App() {
    return (
        <Router>
            <Routes>
                {/* Public routes */}
                <Route path="/" element={<Register />} />
                <Route path="/login" element={<Login />} />
                <Route path="/terms" element={<Terms />} />
                <Route path="/privacy" element={<Privacy />} />

                {/* Protected routes */}
                <Route path="/home" element={
                    <ProtectedRoute>
                        <Home />
                    </ProtectedRoute>
                } />
                <Route path="/profile" element={
                    <ProtectedRoute>
                        <Profile />
                    </ProtectedRoute>
                } />
                <Route path="/calendar" element={
                    <ProtectedRoute>
                        <CalendarPage />
                    </ProtectedRoute>
                } />
                <Route path="/workouts" element={
                    <ProtectedRoute>
                        <Workouts />
                    </ProtectedRoute>
                } />
                <Route path="/workouts/:muscle" element={
                    <ProtectedRoute>
                        <WorkoutList />
                    </ProtectedRoute>
                } />
                <Route path="/diet" element={
                    <ProtectedRoute>
                        <DietPlan />
                    </ProtectedRoute>
                } />
            </Routes>
        </Router>
    );
}

export default App;
