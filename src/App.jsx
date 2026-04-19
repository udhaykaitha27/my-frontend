import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { useSelector } from 'react-redux';

import Login from './Login';
import EmployeeDashboard from './EmployeeDashboard';
import AdminDashboard from './AdminDashboard';

function App() {
  const { isAuthenticated, role } = useSelector((state) => state.auth);

  return (
    <Router>
      {/* Main layout wrapper utilizing Tailwind CSS v4 */}
      <div className="min-h-screen bg-gray-50 text-gray-900">
        {/* Global Notifications configuration */}
        <Toaster position="top-right" reverseOrder={false} />
        
        <Routes>
          {/* Login Route: Redirects based on user role if already authenticated */}
          <Route
            path="/"
            element={
              !isAuthenticated ? (
                <Login />
              ) : role === 'Admin' ? (
                <Navigate to="/admin" replace />
              ) : (
                <Navigate to="/employee" replace />
              )
            }
          />

          {/* Protected Employee Route */}
          <Route
            path="/employee"
            element={isAuthenticated && role === 'Employee' ? <EmployeeDashboard /> : <Navigate to="/" replace />}
          />

          {/* Protected Admin Route */}
          <Route
            path="/admin"
            element={isAuthenticated && role === 'Admin' ? <AdminDashboard /> : <Navigate to="/" replace />}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;