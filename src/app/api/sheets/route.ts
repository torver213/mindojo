import { sheetApi } from "@/config";


export async function GET(){
    try {
        // get spreadsheet based on ID
        const result = await sheetApi.spreadsheets.get({spreadsheetId: process.env.GOOGLE_SPREADSHEET_ID})
        const spreadsheet = result.data.sheets
        // loop through and customise the shape
        const sheets = spreadsheet?.map(s => ({title: s.properties?.title, sheetId: s.properties?.sheetId}))
        // check if null
        if(!sheets) return Response.json("No sheets found", {status: 404})
        return Response.json(sheets)
    } catch (error: any) {
        return Response.json(error?.message, {status: error?.status ?? 500})
    }
}