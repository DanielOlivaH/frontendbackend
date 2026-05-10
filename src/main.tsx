import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'                  // Componente raiz
import CssBaseline from '@mui/material/CssBaseline'
import { ThemeProvider } from '@mui/material/styles'
import theme from './theme/theme'
import { Provider } from 'react-redux'
import { store } from './store/index'

// ReactDOM crea la app y la inyecta en #root del index.html
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />   {/* Resetea/normaliza estilos, tipografías base */}
      <Provider store={store}>
      <App />
      </Provider>
    </ThemeProvider>
  </React.StrictMode>
)
