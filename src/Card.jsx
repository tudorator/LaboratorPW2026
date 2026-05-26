function Card({ project, onDelete, onToggle, onEdit }) {
  return (
    <div className={`card ${project.done ? 'done' : 'in-progress'}`}>
      <h3 style={{ textDecoration: project.done ? 'line-through' : 'none' }}>
        {project.title}
      </h3>
      <span className="tech-badge">{project.tech}</span>
      <p className={`status ${project.done ? 'done' : ''}`}>
        {project.done ? 'Finalizat' : 'In lucru'}
      </p>
      <div>
        <button
          className={`btn ${project.done ? 'btn-gray' : 'btn-green'}`}
          onClick={() => onToggle(project._id, project.done)}
        >
          {project.done ? 'Redeschide' : 'Finalizeaza'}
        </button>
        <button className="btn btn-blue" onClick={() => onEdit(project)}>
          Editeaza
        </button>
        <button className="btn btn-red" onClick={() => onDelete(project._id)}>
          Sterge
        </button>
      </div>
    </div>
  );
}

export default Card;
