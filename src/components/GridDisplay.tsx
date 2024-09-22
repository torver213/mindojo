import { ISheetCell } from "@/interfaces";
import { Box, Typography } from "@mui/material";
import { LineChart } from '@mui/x-charts/LineChart';

const fakeCoordinates = [
  [ 0, 0 ], [ 9, 0 ], [ 0, 1 ],
  [ 0, 2 ], [ 0, 3 ], [ 0, 4 ],
  [ 0, 5 ], [ 0, 6 ], [ 0, 7 ],
  [ 0, 8 ], [ 0, 9 ], [ 9, 1 ],
  [ 9, 2 ], [ 9, 3 ], [ 9, 4 ],
  [ 9, 5 ], [ 9, 6 ], [ 9, 7 ],
  [ 9, 8 ], [ 9, 9 ], [ 8, 9 ],
  [ 7, 9 ], [ 6, 9 ], [ 5, 9 ],
  [ 4, 9 ], [ 3, 9 ], [ 2, 9 ],
  [ 1, 9 ]
]
export default function GridDisplay({ coordinates }:{coordinates: ISheetCell[]}) {
  const dataset = coordinates.reduce((prev, curr) => {
    prev[0].push(curr[0])
    prev[1].push(curr[1])
    return prev
},[[],[]] as number[][]);
  // const dataset = fakeCoordinates.map(coord => ({x: coord[0], y: coord[1]}))
  const northWestData = dataset[0]
  const southEastData = dataset[1]
  const xLabels = coordinates.map((c, index) => `Grid ${++index}`)
    return (
      <Box>
        <Typography variant="h5" textAlign={"center"}>Flow Cells Coordinates</Typography>
        <LineChart
          // width={500}
          height={500}
          series={[
            { data: northWestData, label: 'NW', id: 'nwId' },
            { data: southEastData, label: 'SE', id: 'seId' },
          ]}
          xAxis={[{ scaleType: 'point', data: xLabels }]}
          grid={{ vertical: true, horizontal: true }}
          />
        {/* <LineChart
          dataset={dataset}
          xAxis={[{ dataKey: 'x', label: "North West" }]}
          series={[{ dataKey: 'y', label: "South East" }]}
          height={300}
          margin={{ left: 30, right: 30, top: 30, bottom: 30 }}
          grid={{ vertical: true, horizontal: true }}
        /> */}
      </Box>
    );
  }
  