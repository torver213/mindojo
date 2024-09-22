import Homepage from "@/components/Homepage"
import { ISheetName } from "@/interfaces"

export default async function Home() {
  // get spreadsheet names
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/sheets`
  const result = await fetch(url, { method: "GET",})
  if(!result.ok) return <p>Error trying to sheet names</p>
  const sheetNames: ISheetName[] = await result.json()
  return <Homepage data={sheetNames} />
}
