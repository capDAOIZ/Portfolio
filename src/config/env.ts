const DEFAULT_REMOTE_CHAT_URL = "https://ia-prueba.onrender.com/chat";

const fromEnv = (value: string | undefined): string | undefined => {
  const trimmed = value?.trim();
  return trimmed ? trimmed : undefined;
};

const configuredChatUrl = fromEnv(import.meta.env.VITE_AI_API_URL);

export const CHAT_API_URL =
  configuredChatUrl ??
  (import.meta.env.PROD ? "/api/chat" : DEFAULT_REMOTE_CHAT_URL);

export const EMAILJS_CONFIG = {
  serviceId: fromEnv(import.meta.env.VITE_EMAILJS_SERVICE_ID) ?? "",
  templateId: fromEnv(import.meta.env.VITE_EMAILJS_TEMPLATE_ID) ?? "",
  publicKey: fromEnv(import.meta.env.VITE_EMAILJS_PUBLIC_KEY) ?? "",
};

export const isEmailJsConfigured = (): boolean =>
  Boolean(
    EMAILJS_CONFIG.serviceId &&
      EMAILJS_CONFIG.templateId &&
      EMAILJS_CONFIG.publicKey
  );
