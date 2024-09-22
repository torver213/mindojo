export interface ISheetName {
    title: string;
    sheetId: string;
}

export type ISheetCell = [number, number]; // A cell in the grid represented by its row and column coordinates
export type ISheetGrid = number[][];       // A grid is a 2D array of numbers representing elevation