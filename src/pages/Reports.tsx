// src/pages/Reports.tsx
import Menu from '../components/Menu';
import { Container, Typography, Button } from '@mui/material';
import React, { useState } from 'react';
import InformeColeccion from '../components/InformeColeccion';
import Tooltip from "@mui/material/Tooltip";
export default function Reports() {
  const [data, setData] = useState<any[]>([]);
  const [showInforme, setShowInforme] = useState(false);

  const handleGenerar = async () => {
    try {
      const resp = await fetch('http://localhost:3030/getItems');
      const json = await resp.json();
      setData(json.data || []);
      setShowInforme(true);
    } catch (err) {
      console.error('Error al obtener datos para informe', err);
    }
  };

  return (
    <>
      <Menu />
      <Container component="main" maxWidth="md" sx={{ mt: 6 }}>
        <Typography variant="h2" component="h2" gutterBottom>
          Informe Colección
        </Typography>
<Tooltip title="Generar informe de colección" arrow placement="top">
        <Button variant="contained" onClick={handleGenerar} sx={{ mb: 2 }}>
          INFORME COLECCION
        </Button>
</Tooltip>
        {showInforme && <InformeColeccion data={data} />}
      </Container>
    </>
  );
}
