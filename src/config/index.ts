import { google } from "googleapis";

export const sheetApi = google.sheets({version: "v4", auth: process.env.GOOGLE_API_KEY,   })
