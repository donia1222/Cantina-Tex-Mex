import { json } from "@remix-run/node"
import type { ActionFunction } from "@remix-run/node"

export const action: ActionFunction = async ({ request }) => {
  // Verificar si las variables de entorno están cargadas (solo para desarrollo)
  console.log("Estado de las variables de entorno:", {
    AUTH_USERNAME: process.env.AUTH_USERNAME ? "✅ Configurado" : "❌ No configurado",
    AUTH_PASSWORD: process.env.AUTH_PASSWORD ? "✅ Configurado" : "❌ No configurado",
    NODE_ENV: process.env.NODE_ENV || "no definido"
  });

  try {
    const formData = await request.formData()
    const username = formData.get("username")
    const password = formData.get("password")

    // Verificar que los datos sean strings
    if (typeof username !== "string" || typeof password !== "string") {
      return json({ success: false, message: "Datos inválidos" }, { status: 400 })
    }

    // Obtener credenciales de las variables de entorno del servidor
    const correctUsername = process.env.AUTH_USERNAME
    const correctPassword = process.env.AUTH_PASSWORD

    // Verificar que existan las credenciales en las variables de entorno
    if (!correctUsername || !correctPassword) {
      console.error("Error: Variables de entorno AUTH_USERNAME o AUTH_PASSWORD no configuradas")
      return json({ success: false, message: "Error de configuración del servidor" }, { status: 500 })
    }

    // Verificar credenciales
    if (username === correctUsername && password === correctPassword) {
      return json({ success: true })
    } else {
      return json({ success: false, message: "Credenciales incorrectas" })
    }
  } catch (error) {
    console.error("Error en la autenticación:", error)
    return json({ success: false, message: "Error en el servidor" }, { status: 500 })
  }
}