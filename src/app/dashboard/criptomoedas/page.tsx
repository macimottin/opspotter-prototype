import * as React from 'react';
import type { Metadata } from 'next';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import dayjs from 'dayjs';
import Link from 'next/link';

import { config } from '@/config';
import { IntegrationCard } from '@/components/dashboard/integrations/integrations-card';

export const metadata = { title: `Criptomoedas | Dashboard | ${config.site.name}` } satisfies Metadata;

const criptos = [
  {
    id: 'bitcoin',
    title: 'Bitcoin',
    description: 'Bitcoin é a primeira e mais conhecida criptomoeda, utilizada como reserva de valor e meio de troca digital.',
    logo: '/assets/btc-logo.svg',
    installs: 21_000_000, // Satoshi max supply for fun
    updatedAt: dayjs().subtract(1, 'hour').toDate(),
  },
  {
    id: 'ethereum',
    title: 'Ethereum',
    description: 'Ethereum é uma plataforma descentralizada que permite a criação de contratos inteligentes e aplicativos distribuídos.',
    logo: '/assets/eth-logo.svg',
    installs: 120_000_000, // Example supply
    updatedAt: dayjs().subtract(2, 'hour').toDate(),
  },
];

export default function Page(): React.JSX.Element {
  return (
    <Stack spacing={3}>
      <Typography variant="h4">Criptomoedas</Typography>
      <Grid container spacing={3}>
        {criptos.map((crypto) => (
          <Grid
            key={crypto.id}
            size={{
              lg: 4,
              md: 6,
              xs: 12,
            }}
          >
            <Link href={`/dashboard/criptomoedas/${crypto.id}`} style={{ textDecoration: 'none' }}>
              <IntegrationCard integration={crypto} />
            </Link>
          </Grid>
        ))}
      </Grid>
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <Pagination count={1} size="small" />
      </Box>
    </Stack>
  );
}
