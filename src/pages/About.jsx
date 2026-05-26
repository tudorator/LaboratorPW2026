function About() {
  return (
    <div>
      <h2>Despre mine</h2>
      <p style={{ marginBottom: '24px' }}>Informatii despre autor si proiect.</p>

      <div className="card">
        <h3 style={{ marginBottom: '12px' }}>Dashboard Web</h3>
        <p>
          Aceasta aplicatie a fost construita in cadrul cursului de Programare Web,
          parcurgand 12 laboratoare care acopera intreg stack-ul modern de dezvoltare web.
        </p>
        <p style={{ marginTop: '12px' }}>
          <strong style={{ color: 'var(--accent)' }}>Autor:</strong> Grecu Tudor-Mihai
        </p>
        <p style={{ marginTop: '8px' }}>
          <strong style={{ color: 'var(--accent)' }}>Facultate:</strong> IESC — Calculatoare, Universitatea Transilvania Brasov
        </p>
        <p style={{ marginTop: '8px' }}>
          <strong style={{ color: 'var(--accent)' }}>An:</strong> {new Date().getFullYear()}
        </p>
        <p style={{ marginTop: '8px' }}>
          <strong style={{ color: 'var(--accent)' }}>GitHub:</strong>{' '}
          <a href="https://github.com/tudorator" style={{ color: 'var(--accent)' }} target="_blank" rel="noreferrer">
            github.com/tudorator
          </a>
        </p>
      </div>
    </div>
  );
}

export default About;
