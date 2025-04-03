// Archivo de autenticación simple sin dependencias de Next.js
export async function verificarCredenciales(username, password) {
    // Obtener credenciales de las variables de entorno o usar valores predeterminados
    const correctUsername = import.meta.env?.AUTH_USERNAME || "cantina"
    const correctPassword = import.meta.env?.AUTH_PASSWORD || "cantina 1234"
  
    // Verificar credenciales
    return username === correctUsername && password === correctPassword
  }
  
  