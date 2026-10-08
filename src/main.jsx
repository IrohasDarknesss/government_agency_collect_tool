import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: '40px', fontFamily: 'sans-serif', maxWidth: '600px', margin: '40px auto', background: '#fff', border: '1px solid #e2e8f0', borderRadius: '12px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)' }}>
          <h2 style={{ color: '#e11d48', marginTop: 0 }}>⚠️ 表示エラーが発生しました</h2>
          <p style={{ color: '#475569', fontSize: '14px' }}>画面の描画中にエラーが発生しました。以下のボタンで再読み込みまたはキャッシュのクリアをお試しください。</p>
          <pre style={{ background: '#f1f5f9', padding: '12px', borderRadius: '8px', fontSize: '12px', overflow: 'auto', color: '#334155' }}>
            {this.state.error?.message || String(this.state.error)}
          </pre>
          <div style={{ display: 'flex', gap: '8px', marginTop: '16px' }}>
            <button 
              onClick={() => window.location.reload()} 
              style={{ background: '#2563eb', color: '#fff', border: 'none', padding: '8px 16px', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' }}
            >
              ページを再読み込み
            </button>
            <button 
              onClick={() => { localStorage.clear(); window.location.reload(); }} 
              style={{ background: '#f8fafc', color: '#475569', border: '1px solid #cbd5e1', padding: '8px 16px', borderRadius: '6px', cursor: 'pointer' }}
            >
              キャッシュを初期化して再読込
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </React.StrictMode>
);
