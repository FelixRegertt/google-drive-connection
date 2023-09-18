import { google } from "googleapis";
import root from "app-root-path";

/**
 * Conexion con la API de Google Drive a partir de las credenciales de
 * la cuenta de servicio
 */

const credentialFilename = root.path + "/resources/credentials.json";

const scopes = ["https://www.googleapis.com/auth/drive"];

const auth = new google.auth.GoogleAuth({keyFile: credentialFilename, scopes: scopes});
const driveConnection = google.drive({ version: "v3", auth });

export { driveConnection as drive };

