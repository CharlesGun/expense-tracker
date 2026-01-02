import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { getAllExpenses, deleteExpense } from '../services/expensesService';
import { Eye, Edit2, Trash2, Plus, X } from 'lucide-react'; // Tambah icon X
import '../styles/expenses.css'; 
import capitalize from '../helpers/categoryFormat';

const MyExpenses = () => {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // State untuk Modal Detail
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedExpense, setSelectedExpense] = useState(null);
  
  const navigate = useNavigate();

  // Fungsi untuk memicu modal
  const handleOpenDetail = (item) => {
    setSelectedExpense(item);
    setIsModalOpen(true);
  };

  const fetchAll = async () => {
    try {
      const res = await getAllExpenses();
      setExpenses(res.data.data);
    } catch (err) {
      console.error("Gagal load data:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAll();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Yakin ingin menghapus data ini?")) {
      try {
        await deleteExpense(id);
        fetchAll();
      } catch (err) {
        alert("Gagal menghapus");
        console.log(err);
      }
    }
  };

  const groupedData = expenses.reduce((acc, item) => {
    const date = new Date(item.date);
    const year = date.getFullYear();
    const month = date.toLocaleString('id-ID', { month: 'long' });

    if (!acc[year]) acc[year] = {};
    if (!acc[year][month]) acc[year][month] = [];
    
    acc[year][month].push(item);
    return acc;
  }, {});

  return (
    <>
      <Navbar />
      <div className="expenses-container">
        <div className="header-list">
          <h1>My Expenses</h1>
          <button className="btn-add" onClick={() => navigate('/expenses/new')}>
            <Plus size={18} /> Tambah Baru
          </button>
        </div>

        {loading ? <p>Memuat...</p> : (
          Object.keys(groupedData).sort((a, b) => b - a).map(year => (
            <div key={year} className="year-section">
              <h2 className="year-title">{year}</h2>
              
              {Object.keys(groupedData[year]).map(month => (
                <div key={month} className="month-section">
                  <h3 className="month-title">{month}</h3>
                  
                  <div className="expense-list">
                    {groupedData[year][month].map(item => (
                      <div key={item.id} className="expense-item">
                        <div className="item-info">
                          <span className="item-date-badge">{new Date(item.date).getDate()}</span>
                          <span className="item-category">{capitalize(item.category?.name || item.categoryName)}</span>
                          <span className="item-amount">Rp {item.amount.toLocaleString('id-ID')}</span>
                        </div>
                        
                        <div className="item-actions">
                          {/* Trigger Modal di Sini */}
                          <button onClick={() => handleOpenDetail(item)} title="Detail">
                            <Eye size={18} color="#64748b" />
                          </button>
                          <button onClick={() => navigate(`/expenses/edit/${item.id}`, { state: { expense: item } })} title="Edit">
                            <Edit2 size={18} color="#3b82f6" />
                          </button>
                          <button onClick={() => handleDelete(item.id)} title="Hapus">
                            <Trash2 size={18} color="#ef4444" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ))
        )}

        {/* --- MODAL DETAIL POP UP --- */}
        {isModalOpen && selectedExpense && (
          <div className="modal-overlay" onClick={() => setIsModalOpen(false)}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <div className="modal-header">
                <h3>Detail Transaksi</h3>
                <button className="close-btn" onClick={() => setIsModalOpen(false)}>
                  <X size={20} />
                </button>
              </div>
              
              <div className="modal-body">
                {/* Baris Amount dibuat menonjol */}
                <div className="detail-row amount-box">
                                <label>Pengeluaran</label>
                                <p className="detail-amount">Rp {selectedExpense.amount.toLocaleString('id-ID')}</p>
                </div>
                <div className="detail-row">
                                <label>Kategori</label>
                                <p>{capitalize(selectedExpense.category?.name || selectedExpense.categoryName)}</p>
                </div>
                <div className="detail-row">
                                <label>Tanggal Transaksi</label>
                                <p>{new Date(selectedExpense.date).toLocaleDateString('id-ID', { 
                                                day: 'numeric', month: 'long', year: 'numeric' 
                                })}</p>
                </div>

                <div className="detail-row">
                                <label>Catatan</label>
                                <p className="detail-desc">{selectedExpense.description || "Tidak ada deskripsi"}</p>
                </div>
              </div>

              <div className="modal-footer">
                <button className="btn-close-modal" onClick={() => setIsModalOpen(false)}>Tutup</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default MyExpenses;