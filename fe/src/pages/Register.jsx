import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { registerAPI } from '../services/authService';
import '../styles/auth.css';

const Register = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await registerAPI(formData.name, formData.email, formData.password);
      alert('Registrasi berhasil! Silakan login.');
      navigate('/login');
    } catch (err) {
      alert(err.response?.data?.message || 'Registrasi gagal');
    }
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-card">
        <h1>Buat Akun</h1>
        <p className="auth-subtitle">Mulai kelola pengeluaran Anda</p>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Nama Lengkap</label>
            <input 
              type="text" 
              onChange={(e) => setFormData({...formData, name: e.target.value})} 
              placeholder="Nama Anda" 
              required 
            />
          </div>
          <div className="form-group">
            <label>Email</label>
            <input 
              type="email" 
              onChange={(e) => setFormData({...formData, email: e.target.value})} 
              placeholder="nama@email.com" 
              required 
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input 
              type="password" 
              onChange={(e) => setFormData({...formData, password: e.target.value})} 
              placeholder="••••••••" 
              required 
            />
          </div>
          <button type="submit" className="btn-auth">Daftar</button>
        </form>
        <p className="auth-footer">
          Sudah punya akun? <Link to="/login">Login di sini</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;