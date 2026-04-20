const UPSTREAM_TIMEOUT_MS = 30000;
const OPENROUTER_MAX_ATTEMPTS = 3;
const DEFAULT_OPENAI_MODEL = "gpt-4o-mini";
const DEFAULT_OPENROUTER_MODEL = "openrouter/free";
const PROFILE_CONTEXT = {
  nombre: "Mario Garrido Martin",
  titulo_profesional:
    "Desarrollador Backend / Web Junior | Big Data e Inteligencia Artificial",
  ubicacion: {
    ciudad: "Madrid",
    pais: "Espana",
  },
  contacto: {
    telefono: "682 63 46 44",
    email: "mario.garrido.martin936@gmail.com",
    github: "https://github.com/capDAOIZ",
  },
  perfil_profesional:
    "Desarrollador junior con base solida en backend, desarrollo web y proyectos practicos. Experiencia con Laravel, Python, APIs REST, MySQL, React y automatizacion. Actualmente ampliando conocimientos en Big Data, ingenieria de datos, analisis de datos e inteligencia artificial, con interes en construir soluciones utiles, escalables y bien estructuradas.",
  experiencia_laboral: [
    {
      puesto: "Desarrollador Web Junior",
      empresa: "Ginseg",
      duracion: "3 meses",
      responsabilidades: [
        "Desarrollo de una solucion web con WordPress y PHP en arquitectura multidominio y multibase de datos, en colaboracion directa con otro desarrollador.",
        "Implementacion de un sistema de generacion automatica de paginas y productos en funcion de la busqueda del cliente, mediante consumo de API externa y logica dinamica de negocio.",
        "Integracion de Stripe como sistema de pago para la comercializacion de contenido e informacion adicional generada automaticamente.",
        "Participacion en la implementacion de mecanismos de autenticacion y seguridad mediante JWT, para el control de acceso a la plataforma.",
        "Colaboracion en una solucion orientada a la automatizacion, escalabilidad y personalizacion del servicio segun cada cliente.",
      ],
    },
  ],
  proyectos_destacados: [
    {
      nombre: "Portfolio interactivo estilo Windows 98",
      tecnologias: ["React", "TypeScript", "Vite"],
      descripcion:
        "Portfolio personal con estetica Windows 98 y arquitectura por componentes, con ventanas arrastrables, barra de tareas, formulario de contacto, descarga de CV y minijuego de Snake.",
    },
    {
      nombre: "API CRUD en Laravel con MySQL y Docker",
      tecnologias: ["Laravel", "MySQL", "Docker"],
      descripcion:
        "Desarrollo de una API REST para gestion de platos con operaciones CRUD, validacion de datos y almacenamiento de imagenes, preparada para despliegue con Docker y consumo desde cliente.",
    },
    {
      nombre: "Plataforma de adopcion de animales",
      tecnologias: ["Laravel", "React", "Vite"],
      descripcion:
        "Aplicacion web con separacion frontend/backend para publicacion de animales, panel administrativo y flujo de revision previo a la autorizacion del contenido.",
    },
    {
      nombre: "CryptoLake - Plataforma de analitica crypto en tiempo real",
      tecnologias: [
        "Spark",
        "Kafka",
        "Iceberg",
        "dbt",
        "Airflow",
        "FastAPI",
        "Streamlit",
        "Docker Compose",
        "Terraform",
      ],
      descripcion:
        "Proyecto end-to-end de analitica crypto en tiempo real e historico, con arquitectura Medallion (Bronze, Silver y Gold) y procesamiento distribuido con Spark. Integracion de herramientas de ingenieria de datos y visualizacion como Kafka, Iceberg, dbt, Airflow, FastAPI, Streamlit, Docker Compose y Terraform.",
    },
  ],
  formacion: [
    {
      titulo: "Master FP en Big Data",
      centro: "FP Euroformac",
      estado: "En curso",
    },
    {
      titulo: "Desarrollo de Aplicaciones Web (DAW)",
      centro: "IES Palomeras-Vallecas",
      periodo: "2023-2025",
    },
  ],
  competencias_tecnicas: {
    lenguajes: ["Python", "PHP", "JavaScript", "TypeScript", "SQL", "HTML", "CSS"],
    frameworks_y_herramientas: [
      "Laravel",
      "React",
      "Vite",
      "Tailwind",
      "Bootstrap",
      "FastAPI",
      "Streamlit",
      "Git",
      "GitHub",
      "Docker",
      "Docker Compose",
      "XAMPP",
    ],
    bases_de_datos_y_almacenamiento: ["MySQL", "MinIO", "Apache Iceberg"],
    datos_e_ingenieria: [
      "Apache Spark (PySpark)",
      "Apache Kafka",
      "dbt",
      "Apache Airflow",
      "ETL/ELT",
      "arquitectura Medallion",
      "validacion de datos",
    ],
    otros: [
      "APIs REST",
      "Pydantic",
      "JSON",
      "AJAX",
      "automatizacion",
      "testing",
      "CI/CD basico",
      "Terraform basico",
      "despliegue de proyectos",
    ],
  },
  idiomas: [
    { idioma: "Espanol", nivel: "Nativo" },
    { idioma: "Ingles", nivel: "B2-C1" },
  ],
  habilidades_profesionales: [
    "Resolucion de problemas",
    "Capacidad analitica",
    "Aprendizaje continuo",
    "Trabajo en equipo",
  ],
  areas_de_interes: [
    "backend",
    "desarrollo web",
    "big data",
    "ingenieria de datos",
    "analisis de datos",
    "inteligencia artificial",
    "automatizacion",
  ],
};

const PROFILE_CONTEXT_FOR_MODEL = {
  nombre: PROFILE_CONTEXT.nombre,
  titulo_profesional: PROFILE_CONTEXT.titulo_profesional,
  ubicacion: PROFILE_CONTEXT.ubicacion,
  contacto: PROFILE_CONTEXT.contacto,
  perfil_profesional: PROFILE_CONTEXT.perfil_profesional,
  experiencia_laboral: PROFILE_CONTEXT.experiencia_laboral.map((exp) => ({
    puesto: exp.puesto,
    empresa: exp.empresa,
    duracion: exp.duracion,
    responsabilidades: exp.responsabilidades.slice(0, 3),
  })),
  proyectos_destacados: PROFILE_CONTEXT.proyectos_destacados.map((proyecto) => ({
    nombre: proyecto.nombre,
    tecnologias: proyecto.tecnologias,
    descripcion: proyecto.descripcion,
  })),
  formacion: PROFILE_CONTEXT.formacion,
  competencias_tecnicas: PROFILE_CONTEXT.competencias_tecnicas,
  idiomas: PROFILE_CONTEXT.idiomas,
  habilidades_profesionales: PROFILE_CONTEXT.habilidades_profesionales,
  areas_de_interes: PROFILE_CONTEXT.areas_de_interes,
};

const SYSTEM_PROMPT = `Eres el asistente personal del CV de Mario Garrido Martin.
Tu tarea es resolver dudas sobre Mario usando EXCLUSIVAMENTE la informacion de contexto.
Reglas:
- Responde en espanol claro y profesional.
- Si preguntan algo que no este en el contexto, dilo explicitamente y no inventes.
- Si procede, estructura respuestas en puntos breves.
- Mantente centrado en perfil profesional, proyectos, formacion, habilidades y contacto.
- Prioriza respuestas utiles y concretas (2-6 lineas).

Contexto del CV:
${JSON.stringify(PROFILE_CONTEXT_FOR_MODEL)}`;

const buildLocalFallbackReply = (): string =>
  "El asistente esta saturado ahora mismo. Intentalo de nuevo en unos segundos.";

type ReqBody = {
  userMessage?: string;
};

type EnvShape = {
  OPENAI_API_KEY?: string;
  OPENAI_MODEL?: string;
  OPENROUTER_API_KEY?: string;
  OPENROUTER_MODEL?: string;
  OPENROUTER_REFERER?: string;
  OPENROUTER_TITLE?: string;
  CHAT_LOCAL_FIRST?: string;
  AI_BACKEND_URL?: string;
};

const getEnv = (): EnvShape =>
  ((globalThis as { process?: { env?: EnvShape } }).process?.env ?? {}) as EnvShape;

const extractOpenAIText = (payload: any): string | null => {
  if (typeof payload?.output_text === "string" && payload.output_text.trim()) {
    return payload.output_text;
  }

  const output = Array.isArray(payload?.output) ? payload.output : [];
  for (const item of output) {
    const content = Array.isArray(item?.content) ? item.content : [];
    for (const block of content) {
      if (block?.type === "output_text" && typeof block?.text === "string" && block.text.trim()) {
        return block.text;
      }
      if (block?.type === "text" && typeof block?.text === "string" && block.text.trim()) {
        return block.text;
      }
    }
  }

  return null;
};

const withTimeout = async <T>(
  task: (signal: AbortSignal) => Promise<T>,
  timeoutMs = UPSTREAM_TIMEOUT_MS
): Promise<T> => {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeoutMs);
  try {
    return await task(controller.signal);
  } finally {
    clearTimeout(timeoutId);
  }
};

const sleep = (ms: number): Promise<void> => new Promise((resolve) => setTimeout(resolve, ms));

export default async function handler(req: any, res: any) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { userMessage } = (req.body || {}) as ReqBody;
  if (!userMessage || typeof userMessage !== "string") {
    return res.status(400).json({ error: "Invalid userMessage" });
  }

  const env = getEnv();
  const openAiKey = env.OPENAI_API_KEY?.trim();
  const openAiModel = env.OPENAI_MODEL?.trim() || DEFAULT_OPENAI_MODEL;
  const openRouterKey = env.OPENROUTER_API_KEY?.trim();
  const openRouterModel = env.OPENROUTER_MODEL?.trim() || DEFAULT_OPENROUTER_MODEL;
  const localFirst = (env.CHAT_LOCAL_FIRST?.trim().toLowerCase() ?? "false") === "true";
  const fallbackBackendUrl = env.AI_BACKEND_URL?.trim();

  if (localFirst) {
    return res.status(200).json({
      reply: buildLocalFallbackReply(),
      local: true,
    });
  }

  try {
    if (openAiKey) {
      const openAiResponse = await withTimeout((signal) =>
        fetch("https://api.openai.com/v1/responses", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${openAiKey}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            model: openAiModel,
            instructions: SYSTEM_PROMPT,
            input: userMessage,
          }),
          signal,
        })
      );

      const openAiPayload = await openAiResponse.json().catch(() => ({}));
      if (!openAiResponse.ok) {
        return res.status(502).json({
          error: "Upstream error",
          detail: "OpenAI request failed",
          providerStatus: openAiResponse.status,
        });
      }

      const reply = extractOpenAIText(openAiPayload);
      if (!reply) {
        return res.status(502).json({
          error: "Upstream error",
          detail: "OpenAI returned no text output",
        });
      }

      return res.status(200).json({ reply });
    }

    if (openRouterKey) {
      const headers: Record<string, string> = {
        Authorization: `Bearer ${openRouterKey}`,
        "Content-Type": "application/json",
      };

      const referer = env.OPENROUTER_REFERER?.trim();
      const title = env.OPENROUTER_TITLE?.trim();
      if (referer) headers["HTTP-Referer"] = referer;
      if (title) headers["X-Title"] = title;

      for (let attempt = 1; attempt <= OPENROUTER_MAX_ATTEMPTS; attempt++) {
        try {
          const openRouterResponse = await withTimeout(
            (signal) =>
              fetch("https://openrouter.ai/api/v1/chat/completions", {
                method: "POST",
                headers,
                body: JSON.stringify({
                  model: openRouterModel,
                  max_tokens: 220,
                  temperature: 0.4,
                  messages: [
                    { role: "system", content: SYSTEM_PROMPT },
                    { role: "user", content: userMessage },
                  ],
                }),
                signal,
              }),
            UPSTREAM_TIMEOUT_MS
          );

          const openRouterPayload = await openRouterResponse.json().catch(() => ({}));
          if (!openRouterResponse.ok) {
            const isRetryable =
              openRouterResponse.status === 408 ||
              openRouterResponse.status === 429 ||
              openRouterResponse.status >= 500;

            if (isRetryable && attempt < OPENROUTER_MAX_ATTEMPTS) {
              const backoffMs = 700 * 2 ** (attempt - 1);
              await sleep(backoffMs);
              continue;
            }

            if (isRetryable) {
              return res.status(200).json({
                reply: buildLocalFallbackReply(),
                degraded: true,
              });
            }

            return res.status(502).json({
              error: "Upstream error",
              detail: "OpenRouter request failed",
              providerStatus: openRouterResponse.status,
            });
          }

          const reply = openRouterPayload?.choices?.[0]?.message?.content;
          if (typeof reply !== "string" || !reply.trim()) {
            if (attempt < OPENROUTER_MAX_ATTEMPTS) {
              const backoffMs = 700 * 2 ** (attempt - 1);
              await sleep(backoffMs);
              continue;
            }

            return res.status(200).json({
              reply: buildLocalFallbackReply(),
              degraded: true,
            });
          }

          return res.status(200).json({ reply });
        } catch (error) {
          if (error instanceof Error && error.name === "AbortError") {
            if (attempt < OPENROUTER_MAX_ATTEMPTS) {
              const backoffMs = 700 * 2 ** (attempt - 1);
              await sleep(backoffMs);
              continue;
            }

            return res.status(200).json({
              reply: buildLocalFallbackReply(),
              degraded: true,
            });
          }

          if (attempt < OPENROUTER_MAX_ATTEMPTS) {
            const backoffMs = 700 * 2 ** (attempt - 1);
            await sleep(backoffMs);
            continue;
          }

          return res.status(200).json({
            reply: buildLocalFallbackReply(),
            degraded: true,
          });
        }
      }

      return res.status(200).json({
        reply: buildLocalFallbackReply(),
        degraded: true,
      });
    }

    if (fallbackBackendUrl) {
      const upstreamResponse = await withTimeout((signal) =>
        fetch(fallbackBackendUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userMessage }),
          signal,
        })
      );

      const contentType = upstreamResponse.headers.get("content-type") || "";
      const data = contentType.includes("application/json")
        ? await upstreamResponse.json().catch(() => ({}))
        : { reply: await upstreamResponse.text() };

      if (!upstreamResponse.ok) {
        return res.status(upstreamResponse.status).json({
          error: "Upstream error",
          detail: data,
        });
      }

      return res.status(200).json(data);
    }

    return res.status(503).json({
      error: "Missing configuration",
      detail: "Configura OPENAI_API_KEY, OPENROUTER_API_KEY o AI_BACKEND_URL en Vercel",
    });
  } catch (error) {
    if (error instanceof Error && error.name === "AbortError") {
      return res.status(200).json({
        reply: buildLocalFallbackReply(),
        degraded: true,
      });
    }

    return res.status(502).json({
      error: "Bad gateway",
      detail: error instanceof Error ? error.message : "Unknown error",
    });
  }
}
