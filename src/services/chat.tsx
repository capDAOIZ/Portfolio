import { CHAT_API_URL } from "../config/env";

const REQUEST_TIMEOUT_MS = 22000;
const LOCAL_FALLBACK_REPLY =
  "El asistente esta saturado ahora mismo. Intentalo de nuevo en unos segundos.";

export async function sendMessage(userMessage: string): Promise<string> {
  const controller = new AbortController();
  const timeoutId = window.setTimeout(
    () => controller.abort(),
    REQUEST_TIMEOUT_MS
  );

  try {
    const response = await fetch(CHAT_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userMessage }),
      signal: controller.signal,
    });

    if (!response.ok) {
      let message = "Error en la solicitud al servidor";
      try {
        const failure = (await response.json()) as { error?: string; detail?: unknown };
        if (failure.error === "Upstream timeout") {
          return LOCAL_FALLBACK_REPLY;
        } else if (failure.error === "Upstream error") {
          return LOCAL_FALLBACK_REPLY;
        } else if (typeof failure.detail === "string" && failure.detail.trim()) {
          message = failure.detail;
        }
      } catch {
        // no-op: fallback to generic error
      }
      throw new Error(message);
    }

    const data: { reply?: string } = await response.json();
    if (!data.reply) {
      throw new Error("Respuesta inválida del servidor");
    }
    return data.reply;
  } catch (error) {
    if (error instanceof DOMException && error.name === "AbortError") {
      return LOCAL_FALLBACK_REPLY;
    }
    throw error;
  } finally {
    window.clearTimeout(timeoutId);
  }
}
