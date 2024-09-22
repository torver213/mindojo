import { sheetApi } from "@/config";
import { findCellsWithFlowToBothOceans } from "@/utils/algorithms";

const getSheetData = async(sheetName: string) => {
    try {
        // get spreadsheet based on sheet name
        const result = await sheetApi.spreadsheets.values.get({spreadsheetId: process.env.GOOGLE_SPREADSHEET_ID, range: `${sheetName}`  })
        const values = result.data.values
        if(!values) throw new Error(`No data found in the sheet ${sheetName}`)
        return values as string[][]
    } catch (error: any) {
        throw error
    }
  }

export async function GET(req: Request, { params: { sheetName } }: { params: { sheetName: string }}){
    try {
        console.log("sheet name ", sheetName )
        // get sheet data
        const sheetData = await getSheetData(sheetName)
        // Convert string grid to integer grid
        const grid = sheetData.map(row => row.map(Number));
        // calculate the flow cells
        const flowCells = findCellsWithFlowToBothOceans(grid);
        console.log(flowCells)
        return Response.json({ cellCount: flowCells.length, coordinates: flowCells });
    } catch (error: any) {
        const msg = error?.message as string
        const errorMessage = msg.includes("https://") ? `Sorry an error occurred trying to get sheet(${sheetName}) data. This might be related to network issues, please check your connection and try again!`: msg
        return Response.json(errorMessage, {status: error?.status ?? 500})
    }
}