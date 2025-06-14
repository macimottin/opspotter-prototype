'use client';

import * as React from 'react';
import { useParams } from 'next/navigation';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Box from '@mui/material/Box';

const cryptoData: Record<string, { title: string; description: string }> = {
  'bitcoin': {
    title: 'Bitcoin',
    description: 'Bitcoin é a primeira e mais conhecida criptomoeda, utilizada como reserva de valor e meio de troca digital.'
  },
  'ethereum': {
    title: 'Ethereum',
    description: 'Ethereum é uma plataforma descentralizada que permite a criação de contratos inteligentes e aplicativos distribuídos.'
  }
};

export default function CriptoPage() {
  const params = useParams();
  const id = (params?.id as string)?.toLowerCase();
  const data = cryptoData[id] || { title: 'Criptomoeda', description: 'Dados não encontrados.' };

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
