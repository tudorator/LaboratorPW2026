import { useState } from 'react';

function Contact() {
  const [name, setName]         = useState('');
  const [email, setEmail]       = useState('');
  const [message, setMessage]   = useState('');
  const [feedback, setFeedback] = useState('');
  const [isError, setIsError]   = useState(false);

  function handleSubmit() {
    if (name.trim().length < 2) {
      setFeedback('Eroare: Numele trebuie sa aiba cel putin 2 caractere.');
      setIsError(true);
      return;
    }
    if (!email.includes('@') || !email.includes('.')) {
      setFeedback('Eroare: Adresa de email nu este valida.');
      setIsError(true);
      return;
    }
    if (message.trim().length < 10) {
      setFeedback('Eroare: Mesajul trebuie sa aiba cel putin 10 caractere.');
      setIsError(true);
      return;
    }
    setFeedback(`Multumesc, ${name}! Mesajul tau a fost trimis cu succes.`);
    setIsError(false);
    setName('');
    setEmail('');
    setMessage('');
  }

  return (
    <div>
      <h2>Contact</h2>
      <p style={{ marginBottom: '24px' }}>Trimite un mesaj.</p>

      <div className="card" style={{ maxWidth: '500px' }}>
        {feedback && (
          <p className={isError ? 'error' : 'feedback'} style={{ marginBottom: '16px' }}>
            {feedback}
          </p>
        )}
        <div className="form-group">
          <input
            value={name}
            onChange={function (e) { setName(e.target.value); }}
            placeholder="Numele tau..."
          />
          <input
            type="email"
            value={email}
            onChange={function (e) { setEmail(e.target.value); }}
            placeholder="Email-ul tau..."
          />
          <textarea
            value={message}
            onChange={function (e) { setMessage(e.target.value); }}
            placeholder="Mesajul tau..."
          />
          <button className="btn btn-orange" onClick={handleSubmit}>
            Trimite mesaj
          </button>
        </div>
      </div>
    </div>
  );
}

export default Contact;
