// src/services/chatService.ts

export async function sendMessage(userMessage: string): Promise<string> {
    const response = await fetch("https://ia-prueba.onrender.com/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userMessage }),
    });
  
    if (!response.ok) {
      throw new Error("Error en la solicitud al servidor");
    }
  
    const data: { reply: string } = await response.json();
    return data.reply;
  }
  