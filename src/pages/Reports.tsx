// src/pages/Reports.tsx
import Menu from '../components/menu';
import { Container, Typography } from '@mui/material';

export default function Reports() {
  return (
    <>
      <Menu />
      <Container component="main" maxWidth="md" sx={{ mt: 6 }}>
        <Typography variant="h2" component="h2" gutterBottom>
          Página Reports de Daniel Oliva Hernández
        </Typography>
      </Container>
    </>
  );
}
