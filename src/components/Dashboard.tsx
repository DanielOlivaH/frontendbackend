// src/components/Dashboard.tsx
import React, { useState, useEffect } from 'react';
import { Box, Paper, TextField, Button, Table, TableHead, TableRow, TableCell, TableBody, TableContainer, Typography } from '@mui/material';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

interface ItemType {
  id?: number;
  nombre: string;
  marca: string;
  tipo: string;
  precio: number;
}

const itemInitialState: ItemType = {
  nombre: '',
  marca: '',
  tipo: '',
  precio: 0
};

export default function Dashboard() {
  const [item, setItem] = useState<ItemType>(itemInitialState);
  const [tableData, setTableData] = useState<ItemType[]>([]);

  useEffect(() => {
    getItems();
  }, []);

  const getItems = async () => {
    try {
      const resp = await fetch('http://localhost:3030/getItems');
      const json = await resp.json();
      setTableData(json.data || []);
    } catch (err) {
      console.error('Error getItems', err);
    }
  };

  const handleInsert = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const qs = new URLSearchParams({
        nombre: item.nombre,
        marca: item.marca,
        tipo: item.tipo,
        precio: String(item.precio)
      }).toString();

      const resp = await fetch(`http://localhost:3030/addItem?${qs}`);
      const filas = await resp.json();

      if (filas > 0) {
        alert('Datos guardados con éxito');
        setItem(itemInitialState);
        getItems();
      } else {
        alert('No se han insertado datos');
      }
    } catch (err) {
      console.error('Error addItem', err);
    }
  };

  const handleDelete = async (id?: number) => {
    if (!id) return;
    if (!confirm('¿Confirmas borrar el registro?')) return;
    try {
      await fetch(`http://localhost:3030/deleteItem?id=${id}`);
      getItems();
    } catch (err) {
      console.error('Error deleteItem', err);
    }
  };

  return (
    <Box sx={{ p: 2 }}>
      <Paper sx={{ p: 2, mb: 2 }}>
        <Typography variant="h6" gutterBottom>Insertar elemento</Typography>
        <Box component="form" onSubmit={handleInsert} sx={{ display: 'grid', gap: 2 }}>
          <TextField label="Nombre" value={item.nombre} onChange={e => setItem({ ...item, nombre: e.target.value })} required />
          <TextField label="Marca" value={item.marca} onChange={e => setItem({ ...item, marca: e.target.value })} required />
          <TextField label="Tipo" value={item.tipo} onChange={e => setItem({ ...item, tipo: e.target.value })} required />
          <TextField label="Precio" type="number" value={item.precio} onChange={e => setItem({ ...item, precio: Number((e.target as HTMLInputElement).value) })} required />
          <Button type="submit" variant="contained">+ INSERTAR DATOS</Button>
        </Box>
      </Paper>

      <TableContainer component={Paper}>
        <Table aria-label="Tabla de colección">
          <TableHead>
            <TableRow>
              <TableCell>Acciones</TableCell>
              <TableCell>Nombre</TableCell>
              <TableCell>Marca</TableCell>
              <TableCell>Tipo</TableCell>
              <TableCell>Precio</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tableData.map(row => (
              <TableRow key={row.id}>
                <TableCell>
                  <Button onClick={() => handleDelete(row.id)}><DeleteForeverIcon /></Button>
                </TableCell>
                <TableCell>{row.nombre}</TableCell>
                <TableCell>{row.marca}</TableCell>
                <TableCell>{row.tipo}</TableCell>
                <TableCell>{row.precio}</TableCell>
              </TableRow>
            ))}
            {tableData.length === 0 && (
              <TableRow>
                <TableCell colSpan={5} align="center">No hay registros</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
