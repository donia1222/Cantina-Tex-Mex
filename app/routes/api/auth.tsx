import { json } from "@remix-run/node"
import type { ActionFunction } from "@remix-run/node"

export const action: ActionFunction = async ({ request }) => {
  try {
    const formData = await request.formData()
    const username = formData.get("username")
    const password = formData.get("password")

    // Verificar que los datos sean strings
    if (typeof username !== "string" || typeof password !== "string") {
      return json({ success: false, message: "Datos inválidos" }, { status: 400 })
    }

    // Obtener credenciales de las variables de entorno del servidor
    // En Remix, se accede a las variables de entorno con process.env
    const correctUsername = process.env.AUTH_USERNAME || "cantina"
    const correctPassword = process.env.AUTH_PASSWORD || "cantina 1234"

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


