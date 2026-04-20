# Portfolio Windows 98

Portfolio interactivo estilo Windows 98 construido con React + TypeScript + Vite.

## Stack

- React 19
- TypeScript
- Vite
- TailwindCSS
- EmailJS (contacto)
- Funcion serverless en Vercel para IA (`/api/chat`)

## Desarrollo local

```bash
npm install
npm run dev
```

## Variables de entorno

Usa `.env.example` como base.

Frontend:

- `VITE_EMAILJS_SERVICE_ID`
- `VITE_EMAILJS_TEMPLATE_ID`
- `VITE_EMAILJS_PUBLIC_KEY`
- `VITE_AI_API_URL` (opcional)

Backend serverless:

- `OPENAI_API_KEY` (recomendada para mayor estabilidad)
- `OPENAI_MODEL` (opcional, por defecto `gpt-4o-mini`)
- `OPENROUTER_API_KEY` (alternativa)
- `OPENROUTER_MODEL` (opcional, por defecto `openrouter/free`)
- `OPENROUTER_REFERER` y `OPENROUTER_TITLE` (opcionales)
- `CHAT_LOCAL_FIRST` (opcional)
- `AI_BACKEND_URL` (fallback opcional)

## Despliegue en Vercel

1. Importa el repo en Vercel.
2. Configura variables de entorno.
3. Despliega (`npm run build`, output `dist`).

`vercel.json` ya incluye:

- Fallback SPA a `index.html`
- API serverless en `api/chat.ts`

