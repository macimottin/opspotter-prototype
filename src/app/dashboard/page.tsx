'use client';

import * as React from 'react';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Link from 'next/link';

import { paths } from '@/paths';
import { IntegrationCard } from '@/components/dashboard/integrations/integrations-card';

const options = [
  {
    key: 'commodities',
    title: 'Commodities',
    description: 'Acesse análises de commodities agrícolas.',
    logo: '/assets/commodities-logo.svg',
    href: paths.dashboard.commodities,
  },
  {
    key: 'criptomoedas',
    title: 'Criptomoedas',
    description: 'Veja análises de criptomoedas como Bitcoin e Ethereum.',
    logo: '/assets/cripto-logo.svg',
    href: paths.dashboard.criptomoedas,
  },
];

export default function Page(): React.JSX.Element {
  return (
    <Stack spacing={4} sx={{ mt: 4, ml: 4, alignItems: 'center' }}>
      <Typography variant="h3">O que você quer analisar hoje?</Typography>
      <Box sx={{ display: 'flex', gap: 6, flexWrap: 'wrap', justifyContent: 'center' }}>
        {options.map((option) => (
          <Box key={option.key} sx={{ minWidth: 340, maxWidth: 380, flex: '1 1 340px', display: 'flex', justifyContent: 'center' }}>
            <Link href={option.href} style={{ textDecoration: 'none', width: '100%' }}>
              <IntegrationCard
                integration={{
                  id: option.key,
                  title: option.title,
                  description: option.description,
                  logo: option.logo,
                  installs: 0,
                  updatedAt: new Date(),
                }}
              />
            </Link>
          </Box>
        ))}
      </Box>
    </Stack>
  );
}
