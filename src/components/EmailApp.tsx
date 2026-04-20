import { useState } from "react";
import emailjs from "@emailjs/browser";
import { EMAILJS_CONFIG, isEmailJsConfigured } from "../config/env";
import "./EmailApp.css";

type FormState = {
  name: string;
  email: string;
  message: string;
};

type Status = "idle" | "sending" | "success" | "error" | "missing_config";

const INITIAL_FORM: FormState = {
  name: "",
  email: "",
  message: "",
};

function EmailApp() {
  const [form, setForm] = useState<FormState>(INITIAL_FORM);
  const [status, setStatus] = useState<Status>("idle");
  const [errorDetail, setErrorDetail] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isEmailJsConfigured()) {
      setStatus("missing_config");
      setErrorDetail("");
      return;
    }

    setStatus("sending");
    setErrorDetail("");

    try {
      await emailjs.send(
        EMAILJS_CONFIG.serviceId,
        EMAILJS_CONFIG.templateId,
        {
          name: form.name,
          email: form.email,
          from_email: form.email,
          reply_to: form.email,
          user_email: form.email,
          message: form.message,
          title: "nuevo_contacto_portfolio",
          time: new Date().toLocaleString("es-ES"),
        },
        EMAILJS_CONFIG.publicKey
      );

      setStatus("success");
      setForm(INITIAL_FORM);
    } catch (err) {
      setStatus("error");
      if (typeof err === "object" && err !== null && "text" in err) {
        setErrorDetail(String((err as { text?: string }).text || ""));
      } else if (err instanceof Error) {
        setErrorDetail(err.message);
      } else {
        setErrorDetail("");
      }
    }
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

        <div className="retro-button-container">
          <button type="submit" disabled={status === "sending"} className="retro-button">
            {status === "sending" ? "Enviando..." : "ENVIAR"}
          </button>
        </div>

        {status === "success" && (
          <p className="retro-success">Correo enviado correctamente.</p>
        )}
        {status === "error" && (
          <p className="retro-error">
            Error al enviar. {errorDetail ? `Detalle: ${errorDetail}` : "Intentalo de nuevo."}
          </p>
        )}
        {status === "missing_config" && (
          <p className="retro-error">
            Configura EmailJS en Vercel para activar el envio del formulario.
          </p>
        )}
      </div>
    </form>
  );
}

export default EmailApp;
