// RetroContactForm.tsx
import React, { useState } from 'react';
import emailjs from '@emailjs/browser';
import './EmailApp.css'

const RetroContactForm: React.FC = () => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    message: ''
  });

  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');

    const templateParams = {
      name: form.name,
      email: form.email,
      message: form.message,
      title: 'trabajo' // título oculto
    };

    emailjs.send(
      'tu_service_id',
      'tu_template_id',
      templateParams,
      'tu_public_key'
    ).then(() => {
      setStatus('success');
      setForm({ name: '', email: '', message: '' });
    }).catch(() => {
      setStatus('error');
    });
  };

  return (
    <form onSubmit={handleSubmit} className="retro-container">
      <div className="retro-box">
        <div className="retro-row">
          <label>Nombre:</label>
          <input
            name="name"
            type="text"
            value={form.name}
            onChange={handleChange}
            required
            className="retro-input"
          />
        </div>

        <div className="retro-row">
          <label>Email:</label>
          <input
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            required
            className="retro-input"
          />
        </div>

        

        {/* Caja de mensaje */}
        <div className="retro-message-box">
        <label>Mensaje:</label>
          <textarea
            name="message"
            value={form.message}
            onChange={handleChange}
            rows={8}
            required
            className="retro-textarea"
          />
        </div>
        {/* Botón alineado derecha */}
        <div className="retro-button-container">
          <button type="submit" disabled={status === 'sending'} className="retro-button">
            {status === 'sending' ? 'Enviando...' : 'ENVIAR'}
          </button>
        </div>

        {status === 'success' && <p className="retro-success">Correo enviado correctamente.</p>}
        {status === 'error' && <p className="retro-error">Error al enviar. Inténtalo de nuevo.</p>}
      </div>
    </form>
  );
};

export default RetroContactForm;
