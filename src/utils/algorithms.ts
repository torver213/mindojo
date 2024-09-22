import { ISheetCell, ISheetGrid } from "@/interfaces";


const bfs = (grid: ISheetGrid, startCells: ISheetCell[]): Set<string> => {
    const rows = grid.length;
    const cols = grid[0].length;
    
    const flow = new Set<string>(startCells.map(cell => `${cell[0]},${cell[1]}`)); // Store cells as strings 'r,c'
    const queue: ISheetCell[] = [...startCells];
  
    const directions: ISheetCell[] = [
      [0, 1], [0, -1], [1, 0], [-1, 0]
    ];
  
    while (queue.length > 0) {
      const [r, c] = queue.shift() as ISheetCell;
      for (const [dr, dc] of directions) {
        const nr = r + dr;
        const nc = c + dc;
        if (nr >= 0 && nr < rows && nc >= 0 && nc < cols && !flow.has(`${nr},${nc}`)) {
          if (grid[nr][nc] <= grid[r][c]) {
            queue.push([nr, nc]);
            flow.add(`${nr},${nc}`);
          }
        }
      }
    }
  
    return flow;
  };
  
  
  export const findCellsWithFlowToBothOceans = (grid: ISheetGrid): ISheetCell[] => {
    const rows = grid.length;
    const cols = grid[0].length;
  
    const northwestEdgeCells: ISheetCell[] = [];
    const southeastEdgeCells: ISheetCell[] = [];
  
    // Collect all cells on the left (northwest) and right (southeast) edges
    for (let i = 0; i < rows; i++) {
      northwestEdgeCells.push([i, 0]);  // Left edge
      southeastEdgeCells.push([i, cols - 1]);  // Right edge
    }
  
    // Collect all cells on the top (northwest) and bottom (southeast) edges
    for (let j = 0; j < cols; j++) {
      northwestEdgeCells.push([0, j]);  // Top edge
      southeastEdgeCells.push([rows - 1, j]);  // Bottom edge
    }
  
    // Use BFS to find all cells that can flow to the northwest and southeast
    const northwestFlow = bfs(grid, northwestEdgeCells);
    const southeastFlow = bfs(grid, southeastEdgeCells);
  
    // Find the intersection of the sets (cells that can flow to both oceans)
    const intersection: ISheetCell[] = Array.from(northwestFlow).filter(cell => southeastFlow.has(cell))
      .map(str => str.split(',').map(Number) as ISheetCell);
  
    return intersection;
  };
  
  
  