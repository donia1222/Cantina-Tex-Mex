import { json } from "@remix-run/node"
import type { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node"
import fs from "fs"
import path from "path"

// Path to the JSON file
const dataFilePath = path.join(process.cwd(), "data", "mesas.json")

// Ensure the directory exists
const ensureDirectoryExists = (dirPath: string) => {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true })
  }
}

// Loader function to get table assignments
export async function loader({ request }: LoaderFunctionArgs) {
  try {
    ensureDirectoryExists(path.dirname(dataFilePath))

    // Check if file exists
    if (!fs.existsSync(dataFilePath)) {
      // Create empty file if it doesn't exist
      fs.writeFileSync(dataFilePath, JSON.stringify({}))
      return json({})
    }

    // Read the file
    const data = fs.readFileSync(dataFilePath, "utf8")
    const mesas = JSON.parse(data)

    return json(mesas)
  } catch (error) {
    console.error("Error reading mesas data:", error)
    return json({ error: "Error reading data" }, { status: 500 })
  }
}

// Action function to save table assignments
export async function action({ request }: ActionFunctionArgs) {
  try {
    ensureDirectoryExists(path.dirname(dataFilePath))

    // Get data from request
    const mesas = await request.json()

    // Write to file
    fs.writeFileSync(dataFilePath, JSON.stringify(mesas, null, 2))

    return json({ success: true })
  } catch (error) {
    console.error("Error saving mesas data:", error)
    return json({ error: "Error saving data" }, { status: 500 })
  }
}

