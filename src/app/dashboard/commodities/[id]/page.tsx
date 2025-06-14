'use client';

import * as React from 'react';
import { useParams } from 'next/navigation';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Box from '@mui/material/Box';

const commodityData: Record<string, { title: string; description: string }> = {
  'milho': {
    title: 'Milho',
    description: 'O milho é um grão amplamente cultivado, essencial para alimentação, ração animal e produtos industriais.'
  },
  'soja': {
    title: 'Soja',
    description: 'A soja é uma importante fonte de proteína e óleo, utilizada na alimentação e na indústria.'
  },
  'trigo': {
    title: 'Trigo',
    description: 'O trigo é um alimento básico, fornecendo nutrição para bilhões de pessoas no mundo.'
  },
  'arroz': {
    title: 'Arroz',
    description: 'O arroz é a principal fonte de alimento para mais da metade da população mundial.'
  }
};

export default function CommodityPage() {
  const params = useParams();
  const id = (params?.id as string)?.toLowerCase();
  const data = commodityData[id] || { title: 'Commoditie', description: 'Dados não encontrados.' };

  return (
    <Stack spacing={3}>
      <Typography variant="h4">{data.title}</Typography>
      <Typography variant="body1">{data.description}</Typography>
      <Grid container spacing={3}>
        <Box sx={{ flex: { xs: '1 1 100%', md: '1 1 66%' }, minWidth: 0, p: 1 }}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>Análise de IA</Typography>
              {/* Aqui será exibida a resposta do agente de IA sobre a análise mais recente */}
              <Typography variant="body2" color="text.secondary">(Resposta da IA será exibida aqui...)</Typography>
            </CardContent>
          </Card>
        </Box>
        <Box sx={{ flex: { xs: '1 1 100%', md: '1 1 33%' }, minWidth: 0, p: 1, display: 'flex', flexDirection: 'column', gap: 3 }}>
          <Card sx={{ mb: 3 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>Gráfico de Candles</Typography>
              {/* Aqui será exibido o gráfico de candles do ativo */}
              <Typography variant="body2" color="text.secondary">(Gráfico de candles será exibido aqui...)</Typography>
            </CardContent>
          </Card>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>Últimas Notícias & Sentimento</Typography>
              {/* Aqui será exibida a lista de notícias e o sentimento */}
              <Typography variant="body2" color="text.secondary">(Notícias e sentimento serão exibidos aqui...)</Typography>
            </CardContent>
          </Card>
        </Box>
      </Grid>
    </Stack>
  );
}
