import { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import { getMonthlyExpenses } from '../services/expensesService';
import { useAuth } from '../context/authContext';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import '../styles/dashboard.css';
import capitalize from '../helpers/categoryFormat';

ChartJS.register(ArcElement, Tooltip, Legend);

const Dashboard = () => {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const { token } = useAuth();

  // State untuk Filter
  const now = new Date();
  const [month, setMonth] = useState(now.getMonth() + 1);
  const [year, setYear] = useState(now.getFullYear());

  // Daftar Nama Bulan untuk Dropdown
  const monthNames = [
    "Januari", "Februari", "Maret", "April", "Mei", "Juni",
    "Juli", "Agustus", "September", "Oktober", "November", "Desember"
  ];

  // Daftar Tahun (3 tahun terakhir hingga sekarang)
  const years = [now.getFullYear(), now.getFullYear() - 1, now.getFullYear() - 2];

  
  // Re-fetch data setiap kali month atau year berubah
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // Mengirimkan parameter month dan year ke API
        const res = await getMonthlyExpenses(month, year);
        setExpenses(res.data.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    if (token) fetchData();
  }, [token, month, year]);

  // Logic Grouping tetap sama seperti sebelumnya
  const groupedData = expenses.reduce((acc, item) => {
    const rawName = item.category?.name || item.categoryName || "Lainnya";
    const categoryName = capitalize(rawName); 

  if (!acc[categoryName]) acc[categoryName] = 0;
  acc[categoryName] += Number(item.amount);
  return acc;
  }, {});

  const categoriesArray = Object.keys(groupedData).map(name => ({
    name: name,
    total: groupedData[name]
  }));

  const grandTotal = categoriesArray.reduce((sum, cat) => sum + cat.total, 0);

  const chartData = {
    labels: categoriesArray.map(cat => cat.name),
    datasets: [
      {
        data: categoriesArray.map(cat => cat.total),
        backgroundColor: ['#3b82f6', '#ef4444', '#10b981', '#f59e0b', '#8b5cf6', '#06b6d4'],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="dashboard-page">
      <Navbar />
      <div className="dashboard-container">
        
        <div className="dashboard-header">
          <h1 className="page-title">Dashboard Bulanan</h1>
          
          {/* FILTER DROPDOWN */}
          <div className="filter-group">
            <select value={month} onChange={(e) => setMonth(Number(e.target.value))}>
              {monthNames.map((name, index) => (
                <option key={index} value={index + 1}>{name}</option>
              ))}
            </select>
            <select value={year} onChange={(e) => setYear(Number(e.target.value))}>
              {years.map((y) => (
                <option key={y} value={y}>{y}</option>
              ))}
            </select>
          </div>
        </div>

        {loading ? <p className="loading-text">Memuat data...</p> : (
          <div className="dashboard-grid">
            <div className="card chart-card">
              <h3>Proporsi Pengeluaran</h3>
              <div className="pie-wrapper">
                {categoriesArray.length > 0 ? <Pie data={chartData} /> : <p className="no-data">Tidak ada data di periode ini</p>}
              </div>
            </div>

            <div className="card table-card">
              <h3>Ringkasan per Kategori</h3>
              <table className="expense-table">
                <thead>
                  <tr>
                    <th>KATEGORI</th>
                    <th style={{ textAlign: 'right' }}>TOTAL JUMLAH</th>
                  </tr>
                </thead>
                <tbody>
                  {categoriesArray.length > 0 ? (
                    categoriesArray.map((cat, index) => (
                      <tr key={index}>
                        <td>{cat.name}</td>
                        <td className="amount" style={{ textAlign: 'right' }}>
                          Rp {cat.total.toLocaleString('id-ID')}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr><td colSpan="2" style={{ textAlign: 'center', padding: '20px' }}>Tidak ada transaksi.</td></tr>
                  )}
                </tbody>
                {categoriesArray.length > 0 && (
                  <tfoot>
                    <tr className="grand-total-row">
                      <td>TOTAL KESELURUHAN</td>
                      <td style={{ textAlign: 'right' }}>
                        Rp {grandTotal.toLocaleString('id-ID')}
                      </td>
                    </tr>
                  </tfoot>
                )}
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;