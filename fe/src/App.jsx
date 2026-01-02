import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AuthProvider from './context/AuthProvider';
import ProtectedRoute from './components/ProtectedRoute';

// Import Pages
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import MyExpenses from './pages/MyExpenses';
import ExpenseForm from './pages/ExpenseForm';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Protected Routes (Hanya bisa diakses jika sudah login) */}
          <Route 
            path="/" 
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/expenses" 
            element={
              <ProtectedRoute>
                <MyExpenses />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/expenses/new" 
            element={
              <ProtectedRoute>
                <ExpenseForm />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/expenses/edit/:id" 
            element={
              <ProtectedRoute>
                <ExpenseForm />
              </ProtectedRoute>
            } 
          />

          {/* Fallback jika route tidak ditemukan */}
          <Route path="*" element={<Login />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;