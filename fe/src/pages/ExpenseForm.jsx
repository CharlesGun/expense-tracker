import { useState, useEffect } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { createExpense, updateExpense, getCategories } from '../services/expensesService';
import '../styles/expense-form.css';
import capitalize from '../helpers/categoryFormat';

const ExpenseForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const isEditMode = !!id;

  const [categories, setCategories] = useState([]);
  const [filteredCategories, setFilteredCategories] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  
  const [formData, setFormData] = useState(() => {
  const editData = location.state?.expense;
  
  // Ambil nama kategori awal: cek di objek Category, atau di categoryName langsung
  const initialCategoryName = editData?.category?.name || editData?.categoryName || "";

  return {
    amount: editData?.amount || '',
    date: editData?.date ? new Date(editData.date).toISOString().split('T')[0] : new Date().toISOString().split('T')[0],
    description: editData?.description || '',
    categoryId: editData?.categoryId || null,
    categoryName: capitalize(initialCategoryName) // Gunakan fungsi capitalize agar tampilan rapi
  };
});

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const res = await getCategories();
        setCategories(res.data.data || []);
      } catch (err) {
        console.error("Gagal memuat kategori", err);
      }
    };
    loadCategories();
  }, []);

  const handleCategoryChange = (e) => {
    const value = e.target.value;
    // Simpan apa adanya ke state, tapi logic filter tetap case-insensitive
    setFormData({ ...formData, categoryName: value, categoryId: null });

    if (value.length > 0) {
      const filtered = categories.filter(cat => 
        cat.name.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredCategories(filtered);
      setShowSuggestions(true);
    } else {
      setShowSuggestions(false);
    }
  };

  const selectCategory = (cat) => {
    setFormData({ 
      ...formData, 
      categoryName: cat.name, 
      categoryId: cat.id 
    });
    setShowSuggestions(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Logika Final: Salah satu harus berisi, salah satu null
    const payload = {
      ...formData,
      amount: Number(formData.amount),
      // Jika categoryId ada, kirim categoryName sebagai null, dan sebaliknya
      categoryName: formData.categoryId ? null : formData.categoryName,
      categoryId: formData.categoryId ? formData.categoryId : null,
      description: formData.description || null // Kirim null jika kosong
    };

    try {
      if (isEditMode) {
        await updateExpense(id, payload);
      } else {
        await createExpense(payload);
      }
      navigate('/expenses');
    } catch (err) {
      alert(err.response?.data?.message || 'Gagal menyimpan data');
    }
  };

return (
  <>
    <Navbar />
    <div className="form-container">
      <div className="form-card">
        <h2>{isEditMode ? 'Ubah Transaksi' : 'Tambah Pengeluaran'}</h2>
        <form onSubmit={handleSubmit} autoComplete="off">
          
          <div className="form-group">
  <label>Kategori</label>
  <div className="autocomplete-wrapper">
    <input
      type="text"
      value={formData.categoryName}
      onChange={handleCategoryChange}
      onFocus={() => formData.categoryName.length > 0 && setShowSuggestions(true)}
      placeholder="Cari atau buat kategori baru..."
      required
    />
    
    {/* HUBUNGKAN VARIABEL DI SINI */}
    {showSuggestions && filteredCategories.length > 0 && (
  <ul className="suggestions-list">
    {filteredCategories.map((cat) => (
      <li 
        key={cat.id} 
        onClick={() => selectCategory({ ...cat, name: capitalize(cat.name) })}
      >
        {capitalize(cat.name)} {/* Huruf awal besar di sini */}
      </li>
    ))}
  </ul>
)}
  </div>
</div>

          <div className="form-group">
            <label>Jumlah (Rp)</label>
            <input
              type="number"
              value={formData.amount}
              onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
              placeholder="0"
              required
            />
          </div>

          <div className="form-group">
            <label>Tanggal</label>
            <input
              type="date"
              value={formData.date}
              onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              required
            />
          </div>

          <div className="form-group">
            <label>Deskripsi (Opsional)</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Contoh: Makan siang di kantor"
            />
          </div>

          <div className="form-actions">
            <button type="button" className="btn-cancel" onClick={() => navigate('/expenses')}>
              Batal
            </button>
            <button type="submit" className="btn-submit">
              Simpan Transaksi
            </button>
          </div>
        </form>
      </div>
    </div>
  </>
);
};

export default ExpenseForm;