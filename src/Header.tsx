type View = 'dashboard' | 'table' | 'card';
interface HeaderProps { total: number; view: View; setView: (v: View) => void; onAdd: () => void; }

export default function Header({ total, onAdd, view, setView }: HeaderProps) {
  return (
    <header className="main-header-bw">
      <div className="header-top-bw">
        <div className="logo-area"><div className="logo-box">L</div><div><h1>LIMKOKWING UNIVERSITY - STUDENT MANAGER</h1><p>Interactive Student Management Portal</p></div></div>
        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}><span className="total-badge">TOTAL: {total}</span><button className="btn btn-primary" onClick={onAdd}>+ ADD STUDENT</button></div>
      </div>
      <nav className="header-nav-bw">
        <button className={`nav-btn ${view === 'dashboard' ? 'active' : ''}`} onClick={() => setView('dashboard')}>DASHBOARD</button>
        <button className={`nav-btn ${view === 'table' ? 'active' : ''}`} onClick={() => setView('table')}>TABLE VIEW</button>
        <button className={`nav-btn ${view === 'card' ? 'active' : ''}`} onClick={() => setView('card')}>CARD VIEW</button>
      </nav>
    </header>
  );
}
