// src/theme/theme.ts
import { createTheme } from '@mui/material/styles'

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: { main: '#1976d2' },    
    secondary: { main: '#9c27b0' },
    error: { main: '#d32f2f' },
    background: { default: '#f5f5f5' }
  },
  typography: {
    fontFamily: "'Inter', 'Roboto', 'sans-serif'",
    h1: { fontSize: '2rem' }
  }
})

export default theme
