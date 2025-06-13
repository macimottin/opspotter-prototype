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

export const metadata = { title: `Commodities | Dashboard | ${config.site.name}` } satisfies Metadata;

const placeholder = '/assets/product-1.png';
const commodities = [
  {
    id: 'milho',
    title: 'Milho',
    description: 'O milho é um grão amplamente cultivado, essencial para alimentação, ração animal e produtos industriais.',
    logo: placeholder,
    installs: 1200,
    updatedAt: dayjs().subtract(2, 'hour').toDate(),
  },
  {
    id: 'soja',
    title: 'Soja',
    description: 'A soja é uma importante fonte de proteína e óleo, utilizada na alimentação e na indústria.',
    logo: placeholder,
    installs: 950,
    updatedAt: dayjs().subtract(1, 'day').toDate(),
  },
  {
    id: 'trigo',
    title: 'Trigo',
    description: 'O trigo é um alimento básico, fornecendo nutrição para bilhões de pessoas no mundo.',
    logo: placeholder,
    installs: 1100,
    updatedAt: dayjs().subtract(3, 'hour').toDate(),
  },
  {
    id: 'arroz',
    title: 'Arroz',
    description: 'O arroz é a principal fonte de alimento para mais da metade da população mundial.',
    logo: placeholder,
    installs: 800,
    updatedAt: dayjs().subtract(5, 'hour').toDate(),
  },
];

export default function Page(): React.JSX.Element {
  return (
    <Stack spacing={3}>
      <Typography variant="h4">Commodities</Typography>
      <Grid container spacing={3}>
        {commodities.map((commodity) => (
          <Grid
            key={commodity.id}
            size={{
              lg: 4,
              md: 6,
              xs: 12,
            }}
          >
            <Link href={`/dashboard/commodities/${commodity.id}`} style={{ textDecoration: 'none' }}>
              <IntegrationCard integration={commodity} />
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
