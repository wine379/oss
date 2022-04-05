import { Box, TextField, MenuItem } from '@mui/material'
import React from 'react'

const Select = () => {
  return (
    <Box width='250px'>
    <TextField label='Select Country' select>
      <MenuItem>India</MenuItem>
    </TextField>
    </Box>
  )
}

export default Select