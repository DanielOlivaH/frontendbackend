import { Container, Typography, Button, Box, TextField, Alert } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { useDispatch} from 'react-redux'
import { authActions } from '../store/authSlice';
export default function Login() {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  
  const USER_OK = "danielolivahernandez@gmail.com"
  const PASS_OK = "mondongo"

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const [error, setError] = useState(false)

 const handleLogin = async (e: React.FormEvent) => {
  e.preventDefault();

  try {
    const resp = await fetch(`http://localhost:3030/login?user=${email}&password=${password}`);
    const json = await resp.json();

    // json.data es un array (vacío o con usuario)
    if (json.data && json.data.length > 0) {
      const usuarioBD = json.data[0];

      dispatch(authActions.login({
        name: usuarioBD.nombre,
        rol: usuarioBD.rol
      }));

      setError(false);
      navigate('/home');
    } else {
      setError(true);
    }
  } catch (err) {
    console.error('Error conectando al backend', err);
    setError(true);
  }
};

  return (
    <Container component="main" maxWidth="sm" sx={{ mt: 6 }}>
      <Typography variant="h1" component="h1" gutterBottom>
        Página de Login — Tu Nombre
      </Typography>

      <Typography variant="h2" component="h2" gutterBottom>
        Acceso de usuario
      </Typography>

      {/* Mostrar alerta si hay error */}
      {error && (
        <Alert severity="error" sx={{ mt: 2 }}>
          Usuario y/o contraseña incorrectos
        </Alert>
      )}

      <Box component="form" noValidate onSubmit={handleLogin} aria-label="formulario de login" sx={{ mt: 3 }}>
        <TextField
          required
          fullWidth
          id="email"
          label="Usuario"
          name="email"
          autoComplete="email"
          margin="normal"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
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
          value={password}
          onChange={(e) => setPassword(e.target.value)}
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
