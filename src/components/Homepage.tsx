'use client'
import { useCallback, useEffect, useState } from 'react';
import GridDisplay from './GridDisplay';
import axiosAPI from '@/config/axiosAPI';
import { ISheetCell, ISheetName } from '@/interfaces';
import { Box, CircularProgress, Container, FormControl, InputLabel, MenuItem, Select, Typography } from '@mui/material';
import { getErrorMessage } from '@/utils';

type LocalState = {
  loading: boolean
  isError: boolean
  selectedSheet: string
  message?: string
  data?: { cellCount: number, coordinates: ISheetCell[]}
}

export default function Homepage({data}:{data: ISheetName[]}) {
  const [state, setState] = useState<LocalState>({
    selectedSheet: data.length > 0 ? data[0].title: '',
    loading: false, 
    isError: false, 
    data: { cellCount: 0, coordinates: [[0,0]] }
   })

  useEffect(() => {
    handleSheetSelect(state.selectedSheet)
    return () => {}
  }, [])

  const handleSheetSelect = useCallback(
    async (sheetName: string) => {
      if(!sheetName) return
      setState(prev => ({...prev, selectedSheet: sheetName, message: '', isError: false, loading: true}))
      try {
        const res = await axiosAPI.get(`/flow-cells/${sheetName}`);
        setState(prev => ({...prev, data: res.data}))
      } catch (err: any) {
        setState(prev => ({...prev, isError: true, data: undefined, message: getErrorMessage(err)}));
      } finally {
        setState(prev => ({...prev,loading: false}));
      }
    },
    [state.selectedSheet],
  )
  

  return (
    <Container maxWidth="xl" sx={{my: 3}}>
      <Typography variant='h3' textAlign={"center"}>Island Water Flow Analysis</Typography>
      <Box sx={{ width: {xl: 400, lg: 400, md: 300, sm: "100%", xs: "100%"}, mb: 4 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Select a Sheet</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={state.selectedSheet}
          label="sheet"
          onChange={ev => handleSheetSelect(ev.target.value)}
        >
          {data.map((sheet) => (
          <MenuItem key={sheet.sheetId} value={sheet.title}>
            {sheet.title}
          </MenuItem>
        ))}
        </Select>
      </FormControl>
      <Box sx={{
        my: 1, 
        position: "absolute",
        left: "50%",
        right: "50%",
        }}>
      {state.loading && <CircularProgress size={20} />}
      </Box>
    </Box>

    <Box sx={{opacity: state.loading ? 0.3 : 1}}>
      {state.data && (
        <Box>
          <Typography variant='subtitle1'>Selected sheet: {state.selectedSheet}</Typography>
          <Typography variant='subtitle2'>Number of cells with flow to both oceans: {state.data.cellCount}</Typography>
          <GridDisplay coordinates={state.data.coordinates} />
        </Box>
      )}
      </Box>
      {state.isError && <Typography sx={{textAlign: "center"}} variant='subtitle1' color='error'>{state.message}</Typography>}
    </Container>
  );
}
