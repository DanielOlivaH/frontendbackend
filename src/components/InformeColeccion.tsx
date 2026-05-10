// src/components/InformeColeccion.tsx
import React, { useMemo } from 'react';
import MaterialTable, { type Column } from '@material-table/core';
import { ExportCsv, ExportPdf } from '@material-table/exporters';
import { Box, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';

interface Item {
  id?: number;
  nombre: string;
  marca: string;
  tipo: string;
  precio: number;
}

interface Props {
  data: Item[];
}

const InformeColeccion: React.FC<Props> = ({ data }) => {
  const theme = useTheme();

  const columns: Array<Column<Item>> = [
    { title: 'Nombre', field: 'nombre', filtering: false },
    { title: 'Marca', field: 'marca', filtering: true },
    { title: 'Tipo', field: 'tipo', filtering: true },
    { title: 'Precio', field: 'precio', type: 'numeric', filtering: false }
  ];

  const totalPrecio = useMemo(() => {
    return data.reduce((acc, cur) => acc + (Number(cur.precio) || 0), 0);
  }, [data]);

  return (
    <Box sx={{ mt: 3 }}>
      <MaterialTable
        title="Informe — Colección"
        columns={columns}
        data={data}
        options={{
          draggable: true,
          paging: true,
          pageSize: 10,
          columnsButton: true,
          filtering: true,
          exportMenu: [
            {
              label: 'Exportar CSV',
              exportFunc: (cols, rows) => ExportCsv(cols, rows, 'informe_coleccion')
            },
            {
              label: 'Exportar PDF',
              exportFunc: (cols, rows) => ExportPdf(cols, rows, 'informe_coleccion')
            }
          ],
          headerStyle: {
            backgroundColor: theme.palette.primary.main,
            color: theme.palette.primary.contrastText
          },
          showTitle: true,
        }}
      />

      <Box sx={{ mt: 2, textAlign: 'right' }}>
        <Typography variant="h6">
          Total precio: {totalPrecio.toFixed(2)} €
        </Typography>
      </Box>
    </Box>
  );
};

export default InformeColeccion;
