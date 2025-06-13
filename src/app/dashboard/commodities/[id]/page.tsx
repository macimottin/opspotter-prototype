'use client';

import * as React from 'react';
import { useParams } from 'next/navigation';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

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
      {/* Aqui você pode adicionar componentes para mostrar dados dinâmicos da API futuramente */}
    </Stack>
  );
}
