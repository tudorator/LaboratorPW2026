import ProjectList from '../ProjectList';

function Projects() {
  return (
    <div>
      <h2>Proiectele mele</h2>
      <p style={{ marginBottom: '24px' }}>
        Gestionati proiectele voastre web. Adaugati, editati sau stergeti proiecte.
      </p>
      <ProjectList />
    </div>
  );
}

export default Projects;
