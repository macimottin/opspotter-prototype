'use client';

import * as React from 'react';
import { useParams } from 'next/navigation';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

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
      {/* Aqui você pode adicionar componentes para mostrar dados dinâmicos da API futuramente */}
    </Stack>
  );
}
