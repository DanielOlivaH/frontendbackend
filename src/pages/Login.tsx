import { Container, Typography, Button, Box, TextField } from '@mui/material'
import { useNavigate } from 'react-router-dom'

export default function Login() {
  const navigate = useNavigate()

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    // Aquí podrías validar los datos del formulario si quisieras
    navigate('/home') // Redirige a la página de inicio
  }

  return (
    <Container component="main" maxWidth="sm" sx={{ mt: 6 }}>
      <Typography variant="h1" component="h1" gutterBottom>
        Página de Login — Tu Nombre
      </Typography>

      <Typography variant="h2" component="h2" gutterBottom>
        Acceso de usuario
      </Typography>

      <Box component="form" noValidate onSubmit={handleLogin} aria-label="formulario de login" sx={{ mt: 3 }}>
        <TextField
          required
          fullWidth
          id="email"
          label="Correo electrónico"
          name="email"
          autoComplete="email"
          margin="normal"
        />

        <TextField
          required
          fullWidth
          name="password"
          label="Contraseña"
          type="password"
          id="password"
          autoComplete="current-password"
          margin="normal"
        />

        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
          <Button type="submit" variant="contained" color="primary">
            Iniciar sesión
          </Button>
        </Box>
      </Box>

      <Typography variant="caption" display="block" sx={{ mt: 4 }}>
        Texto de pie — ejemplo de caption.
      </Typography>
    </Container>
  )
}
