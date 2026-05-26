import { useState, useEffect } from 'react';
import Card from './Card';

const API = 'http://localhost:3000';

function ProjectList() {
  const [projects, setProjects]         = useState([]);
  const [loading, setLoading]           = useState(true);
  const [error, setError]               = useState(null);
  const [title, setTitle]               = useState('');
  const [tech, setTech]                 = useState('');
  const [editingId, setEditingId]       = useState(null);
  const [editTitle, setEditTitle]       = useState('');
  const [editTech, setEditTech]         = useState('');
  const [search, setSearch]             = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [sortBy, setSortBy]             = useState('default');

  useEffect(function () {
    fetch(API + '/api/projects')
      .then(function (res) { return res.json(); })
      .then(function (data) {
        setProjects(data);
        setLoading(false);
      })
      .catch(function () {
        setError('Nu pot contacta serverul. Verificati ca Express ruleaza.');
        setLoading(false);
      });
  }, []);

  async function handleSubmit() {
    if (title.trim() === '' || tech.trim() === '') {
      setError('Completati titlul si tehnologia!');
      return;
    }
    setError(null);
    try {
      const response = await fetch(API + '/api/projects', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: title, tech: tech, done: false }),
      });
      const newProject = await response.json();
      setProjects([...projects, newProject]);
      setTitle('');
      setTech('');
    } catch (err) {
      setError('Eroare la adaugare: ' + err.message);
    }
  }

  async function handleDelete(id) {
    if (!window.confirm('Sigur doriti sa stergeti acest proiect?')) return;
    try {
      await fetch(API + '/api/projects/' + id, { method: 'DELETE' });
      setProjects(projects.filter(function (p) { return p._id !== id; }));
    } catch (err) {
      setError('Eroare la stergere: ' + err.message);
    }
  }

  async function handleToggle(id, currentDone) {
    try {
      const response = await fetch(API + '/api/projects/' + id, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ done: !currentDone }),
      });
      const updatedProject = await response.json();
      setProjects(projects.map(function (p) {
        return p._id === id ? updatedProject : p;
      }));
    } catch (err) {
      setError('Eroare la actualizare: ' + err.message);
    }
  }

  function handleEditStart(project) {
    setEditingId(project._id);
    setEditTitle(project.title);
    setEditTech(project.tech);
  }

  async function handleEditSave(id) {
    if (editTitle.trim() === '' || editTech.trim() === '') {
      setError('Titlul si tehnologia nu pot fi goale!');
      return;
    }
    try {
      const response = await fetch(API + '/api/projects/' + id, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: editTitle, tech: editTech }),
      });
      const updatedProject = await response.json();
      setProjects(projects.map(function (p) {
        return p._id === id ? updatedProject : p;
      }));
      setEditingId(null);
    } catch (err) {
      setError('Eroare la salvare: ' + err.message);
    }
  }

  function handleEditCancel() {
    setEditingId(null);
  }

  let displayedProjects = projects
    .filter(function (p) {
      return p.title.toLowerCase().includes(search.toLowerCase());
    })
    .filter(function (p) {
      if (filterStatus === 'done') return p.done === true;
      if (filterStatus === 'inProgress') return p.done === false;
      return true;
    })
    .sort(function (a, b) {
      if (sortBy === 'title') return a.title.localeCompare(b.title);
      if (sortBy === 'status') return Number(a.done) - Number(b.done);
      return 0;
    });

  const total      = projects.length;
  const done       = projects.filter(function (p) { return p.done; }).length;
  const inProgress = total - done;

  if (loading) return <p className="loading">Se incarca proiectele...</p>;

  return (
    <div>
      {error && <p className="error">{error}</p>}

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-number">{total}</div>
          <div className="stat-label">Total proiecte</div>
        </div>
        <div className="stat-card">
          <div className="stat-number" style={{ color: 'var(--green)' }}>{done}</div>
          <div className="stat-label">Finalizate</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">{inProgress}</div>
          <div className="stat-label">In lucru</div>
        </div>
      </div>

      <div className="card" style={{ marginBottom: '24px' }}>
        <h3 style={{ marginBottom: '12px' }}>Adauga proiect nou</h3>
        <div className="form-group">
          <input
            value={title}
            onChange={function (e) { setTitle(e.target.value); }}
            placeholder="Titlul proiectului..."
          />
          <input
            value={tech}
            onChange={function (e) { setTech(e.target.value); }}
            placeholder="Tehnologii (ex: React, CSS)..."
          />
          <button className="btn btn-orange" onClick={handleSubmit}>Adauga</button>
        </div>
      </div>

      <div className="controls">
        <input
          value={search}
          onChange={function (e) { setSearch(e.target.value); }}
          placeholder="Cauta dupa titlu..."
        />
        <select value={filterStatus} onChange={function (e) { setFilterStatus(e.target.value); }}>
          <option value="all">Toate</option>
          <option value="done">Finalizate</option>
          <option value="inProgress">In lucru</option>
        </select>
        <select value={sortBy} onChange={function (e) { setSortBy(e.target.value); }}>
          <option value="default">Sortare: default</option>
          <option value="title">Sortare: titlu A-Z</option>
          <option value="status">Sortare: status</option>
        </select>
      </div>

      {displayedProjects.length === 0 ? (
        <p className="loading">Nu exista proiecte care sa corespunda filtrelor.</p>
      ) : (
        <div className="projects-grid">
          {displayedProjects.map(function (project) {
            if (editingId === project._id) {
              return (
                <div key={project._id} className="card">
                  <h3 style={{ marginBottom: '12px' }}>Editare</h3>
                  <div className="edit-form">
                    <input
                      value={editTitle}
                      onChange={function (e) { setEditTitle(e.target.value); }}
                      placeholder="Titlu..."
                    />
                    <input
                      value={editTech}
                      onChange={function (e) { setEditTech(e.target.value); }}
                      placeholder="Tehnologie..."
                    />
                    <div style={{ display: 'flex', gap: '8px', marginTop: '8px' }}>
                      <button className="btn btn-green" onClick={function () { handleEditSave(project._id); }}>
                        Salveaza
                      </button>
                      <button className="btn btn-gray" onClick={handleEditCancel}>
                        Anuleaza
                      </button>
                    </div>
                  </div>
                </div>
              );
            }
            return (
              <Card
                key={project._id}
                project={project}
                onDelete={handleDelete}
                onToggle={handleToggle}
                onEdit={handleEditStart}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}

export default ProjectList;
