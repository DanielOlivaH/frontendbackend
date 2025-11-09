import { Container, Typography } from '@mui/material'

export default function Home() {
  return (
    <Container component="main" maxWidth="md" sx={{ mt: 6 }}>
      <Typography variant="h2" component="h2" gutterBottom>
        Página de Inicio
      </Typography>
      <Typography variant="body1">
        ¡Bienvenido! Has iniciado sesión correctamente.
      </Typography>
    </Container>
  )
}
