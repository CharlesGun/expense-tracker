import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css' // Pastikan file ini tidak punya background: black;

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)