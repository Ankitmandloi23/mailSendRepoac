import EmailTriggerPage from './pages/EmailTriggerPage';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom'; // Import BrowserRouter as Router
import Login from './pages/login/Login.js';
import ProtectedRoute from './ProtectedRoute.jsx';
import { ToastContainer } from 'react-toastify';



const App = () => {

  return (
    <Router>
       <ToastContainer
            position="top-right"
            autoClose={1500}
            hideProgressBar={false}
            newestOnTop
            closeOnClick
            pauseOnHover
            draggable
            theme="colored"
          />
      <Routes>
        <Route path='/' element={<Navigate to='/emails' />} /> {/* Redirect to /tasks */}
        <Route path="/emails" element={<ProtectedRoute><EmailTriggerPage /></ProtectedRoute>} />
        <Route path="/login" element={<Login />} /> {/* Use element instead of component */}
      </Routes>
    </Router>
  );
};

export default App;
