'use client';

import * as React from 'react';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import Box from '@mui/material/Box';
import { useRouter } from 'next/navigation';

import { config } from '@/config';
import { paths } from '@/paths';

const options = [
  {
    key: 'commodities',
    title: 'Commodities',
    description: 'Acesse análises de commodities agrícolas.',
    href: paths.dashboard.commodities,
  },
  {
    key: 'criptomoedas',
    title: 'Criptomoedas',
    description: 'Veja análises de criptomoedas como Bitcoin e Ethereum.',
    href: paths.dashboard.criptomoedas,
  },
];

export default function Page(): React.JSX.Element {
  const router = useRouter();
  return (
    <Stack spacing={4} sx={{ mt: 4, ml: 4 }}>
      <Typography variant="h3">O que você quer analisar hoje?</Typography>
      <Grid container spacing={4}>
        {options.map((option) => (
          <Box key={option.key} sx={{ width: { xs: '100%', sm: '50%', md: '33.33%', lg: '25%' }, p: 2, boxSizing: 'border-box' }}>
            <Card>
              <CardActionArea onClick={() => router.push(option.href)}>
                <Box
                  sx={{
                    p: 4,
                    minHeight: 120,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Typography variant="h5" align="center">
                    {option.title}
                  </Typography>
                  <Typography variant="body2" align="center" sx={{ mt: 1 }}>
                    {option.description}
                  </Typography>
                </Box>
              </CardActionArea>
            </Card>
          </Box>
        ))}
      </Grid>
    </Stack>
  );
}
