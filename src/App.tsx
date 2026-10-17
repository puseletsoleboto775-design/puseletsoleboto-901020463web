import { useState, useEffect } from 'react';
import Header from './Header';
import Footer from './Footer';
import './App.css';

type Status = 'Enrolled' | 'Pending' | 'Graduated';
type View = 'dashboard' | 'table' | 'card';

interface Student {
  id: string;
  fullName: string;
  age: number;
  email: string;
  course: string;
  status: Status;
}

interface FormData {
  fullName: string;
  age: string;
  email: string;
  course: string;
  status: Status;
}

interface FormErrors {
  fullName?: string;
  age?: string;
  email?: string;
  course?: string;
}

const INITIAL: Student[] = [
  { id: '901020462', fullName: 'Hlokomelang Sethuntsa', age: 20, email: 'matlosa@gmail.com', course: 'Diploma in TV and Film', status: 'Enrolled' },
  { id: '901020463', fullName: 'Puseletso Leboto', age: 23, email: 'puseletso90@gmail.com', course: 'BSc IT', status: 'Enrolled' },
  { id: '901020464', fullName: 'Teboho Molapo', age: 21, email: 'tebohomolapo@gmail.com', course: 'BA Architecture', status: 'Pending' },
  { id: '901020465', fullName: 'Lerato Mokoena', age: 22, email: 'leratomokoena@gmail.com', course: 'Diploma in Broadcasting', status: 'Enrolled' },
  { id: '901020466', fullName: 'Thabo Khale', age: 20, email: 'thabokhale@gmail.com', course: 'BA Education', status: 'Graduated' },
  { id: '901020467', fullName: 'Nthabiseng Sehlabo', age: 19, email: 'nthabisehlabo@gmail.com', course: 'BSc General', status: 'Enrolled' },
  { id: '901020468', fullName: 'Khotso Letsie', age: 24, email: 'khotsoletsie@gmail.com', course: 'Diploma in Business', status: 'Pending' },
  { id: '901020469', fullName: 'Mamello Thamae', age: 21, email: 'mamellothamae@gmail.com', course: 'BSc Information Tech', status: 'Enrolled' },
  { id: '901020470', fullName: 'Bokang Ramotso', age: 22, email: 'bokangramotso@gmail.com', course: 'BA Journalism', status: 'Enrolled' },
  { id: '901020471', fullName: 'Karabo Ntene', age: 20, email: 'karabontene@gmail.com', course: 'Diploma in IT', status: 'Graduated' },
  { id: '901020472', fullName: 'Lineo Mohapi', age: 23, email: 'lineomohapi@gmail.com', course: 'BSc Environmental Science', status: 'Enrolled' },
  { id: '901020473', fullName: 'Tumelo Bereng', age: 19, email: 'tumelobereng@gmail.com', course: 'BA Law', status: 'Pending' },
  { id: '901020474', fullName: 'Relebohile Sekhonyana', age: 25, email: 'relebohilesek@gmail.com', course: 'Diploma in Design', status: 'Enrolled' },
  { id: '901020475', fullName: 'Mpho Tau', age: 24, email: 'mphotau@gmail.com', course: 'BA Graphic Design', status: 'Enrolled' },
  { id: '901020476', fullName: 'Keletso Mafa', age: 26, email: 'keletsomafa@gmail.com', course: 'MBA', status: 'Enrolled' },
  { id: '901020477', fullName: 'Puleng Lethunya', age: 23, email: 'pulenglethunya@gmail.com', course: 'Diploma in Culinary', status: 'Graduated' },
  { id: '901020478', fullName: 'Lebohang Moahloli', age: 22, email: 'lebohangmoahloli@gmail.com', course: 'BSc Software Engineering', status: 'Enrolled' },
  { id: '901020479', fullName: 'Tlotliso Nkome', age: 20, email: 'tlotlisonkome@gmail.com', course: 'BA Social Work', status: 'Enrolled' },
  { id: '901020480', fullName: 'Kanelo Phafoli', age: 21, email: 'kananelo@gmail.com', course: 'Diploma in Hospitality', status: 'Pending' },
  { id: '901020481', fullName: 'Lerato Phoofolo', age: 22, email: 'leratophoofolo@gmail.com', course: 'BSc Business IT', status: 'Enrolled' },
];

export default function App() {
  const [students, setStudents] = useState<Student[]>(() => {
    const s = localStorage.getItem('luct_students_Leboto');
    return s ? (JSON.parse(s) as Student[]) : INITIAL;
  });

  const [search, setSearch] = useState<string>('');
  const [view, setView] = useState<View>('table');
  const [showModal, setShowModal] = useState<boolean>(false);
  const [editStudent, setEditStudent] = useState<Student | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<Student | null>(null);
  const [form, setForm] = useState<FormData>({ fullName: '', age: '', email: '', course: '', status: 'Enrolled' });
  const [errors, setErrors] = useState<FormErrors>({});

  useEffect(() => {
    localStorage.setItem('luct_students_Leboto', JSON.stringify(students));
  }, [students]);

  const generateId = (): string => {
    const maxNum = Math.max(...students.map(s => Number(s.id)), 901020481);
    return String(maxNum + 1);
  };

  const validate = (): boolean => {
    const e: FormErrors = {};
    if (!form.fullName.trim()) e.fullName = 'Required';
    if (!form.age || Number(form.age) < 16 || Number(form.age) > 60) e.age = '16-60 only';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Invalid email';
    if (!form.course.trim()) e.course = 'Required';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSave = (): void => {
    if (!validate()) return;
    if (editStudent) {
      setStudents(prev => prev.map(s => s.id === editStudent.id ? { ...s, ...form, age: Number(form.age) } : s));
    } else {
      setStudents(prev => [...prev, { ...form, age: Number(form.age), id: generateId() } as Student]);
    }
    setShowModal(false);
    setEditStudent(null);
  };

  const filtered = students.filter(s =>
    `${s.fullName} ${s.email} ${s.course} ${s.id}`.toLowerCase().includes(search.toLowerCase())
  );

  const stats = {
    total: students.length,
    enrolled: students.filter(s => s.status === 'Enrolled').length,
    pending: students.filter(s => s.status === 'Pending').length,
    graduated: students.filter(s => s.status === 'Graduated').length,
  };

  return (
    <>
      <Header total={students.length} view={view} setView={setView} onAdd={() => { setEditStudent(null); setForm({ fullName: '', age: '', email: '', course: '', status: 'Enrolled' }); setErrors({}); setShowModal(true); }} />
      
      <div className="container">
        <div className="toolbar">
          <input className="search" placeholder="Search by name, ID, course, email..." value={search} onChange={(e) => setSearch(e.target.value)} />
          <span className="found">{filtered.length} FOUND</span>
        </div>

        {view === 'dashboard' && (
          <div className="dashboard-stats">
            <div className="stat-card purple"><h2>{stats.total}</h2><p>Total Students</p></div>
            <div className="stat-card green"><h2>{stats.enrolled}</h2><p>Enrolled</p></div>
            <div className="stat-card yellow"><h2>{stats.pending}</h2><p>Pending</p></div>
            <div className="stat-card blue"><h2>{stats.graduated}</h2><p>Graduated</p></div>
          </div>
        )}

        {view === 'table' && (
          <div className="table-wrap">
            <table>
              <thead><tr><th>ID</th><th>FULL NAME</th><th>AGE</th><th>EMAIL</th><th>COURSE</th><th>STATUS</th><th>ACTION</th></tr></thead>
              <tbody>
                {filtered.map(s => (
                  <tr key={s.id}>
                    <td><b>{s.id}</b></td><td>{s.fullName}</td><td>{s.age}</td><td>{s.email}</td><td>{s.course}</td>
                    <td><span className={`status ${s.status.toLowerCase()}`}>{s.status}</span></td>
                    <td>
                      <button className="btn-small" onClick={() => { setEditStudent(s); setForm({ fullName: s.fullName, age: String(s.age), email: s.email, course: s.course, status: s.status }); setShowModal(true); }}>Edit</button>
                      <button className="btn-small danger" onClick={() => setDeleteTarget(s)}>Del</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {view === 'card' && (
          <div className="cards-grid">
            {filtered.map(s => (
              <div key={s.id} className="student-card">
                <div className="card-top"><span className="card-id">{s.id}</span><span className={`status ${s.status.toLowerCase()}`}>{s.status}</span></div>
                <h3>{s.fullName}</h3><p className="card-course">{s.course} • {s.age} yrs</p><p className="card-email">{s.email}</p>
                <div className="card-actions"><button className="btn-small" onClick={() => { setEditStudent(s); setForm({ fullName: s.fullName, age: String(s.age), email: s.email, course: s.course, status: s.status }); setShowModal(true); }}>Edit</button><button className="btn-small danger" onClick={() => setDeleteTarget(s)}>Delete</button></div>
              </div>
            ))}
          </div>
        )}
      </div>

      <Footer />

      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <h3>{editStudent ? 'Edit Student' : 'Add Student'}</h3>
            <input placeholder="Full Name" value={form.fullName} onChange={e => setForm({ ...form, fullName: e.target.value })} />{errors.fullName && <small className="err">{errors.fullName}</small>}
            <input placeholder="Age" type="number" value={form.age} onChange={e => setForm({ ...form, age: e.target.value })} />{errors.age && <small className="err">{errors.age}</small>}
            <input placeholder="Email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />{errors.email && <small className="err">{errors.email}</small>}
            <input placeholder="Course" value={form.course} onChange={e => setForm({ ...form, course: e.target.value })} />{errors.course && <small className="err">{errors.course}</small>}
            <select value={form.status} onChange={e => setForm({ ...form, status: e.target.value as Status })}><option>Enrolled</option><option>Pending</option><option>Graduated</option></select>
            <div className="modal-btns"><button className="btn" onClick={() => setShowModal(false)}>Cancel</button><button className="btn btn-primary" onClick={handleSave}>Save</button></div>
          </div>
        </div>
      )}

      {deleteTarget && (
        <div className="modal-overlay" onClick={() => setDeleteTarget(null)}>
          <div className="modal" onClick={e => e.stopPropagation()}><h3>Confirm Delete</h3><p>Delete {deleteTarget.fullName} ({deleteTarget.id})?</p><div className="modal-btns"><button className="btn" onClick={() => setDeleteTarget(null)}>No</button><button className="btn danger" onClick={() => { setStudents(prev => prev.filter(s => s.id !== deleteTarget.id)); setDeleteTarget(null); }}>Yes Delete</button></div></div>
        </div>
      )}
    </>
  );
}
