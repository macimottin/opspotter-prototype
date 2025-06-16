import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

export interface Integration {
  id: string;
  title: string;
  description: string;
  logo: string;
  installs: number;
  updatedAt: Date;
}

export interface IntegrationCardProps {
  integration: Integration;
}

export function IntegrationCard({ integration }: IntegrationCardProps): React.JSX.Element {
  return (
    <Card
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        transition: 'box-shadow 0.2s, transform 0.2s',
        boxShadow: 1,
        cursor: 'pointer',
        '&:hover': {
          boxShadow: 6,
          transform: 'translateY(-4px) scale(1.03)',
        },
        '&:active': {
          boxShadow: 12,
          transform: 'scale(0.98)',
        },
      }}
    >
      <CardContent sx={{ flex: '1 1 auto' }}>
        <Stack spacing={2}>
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <Box component="img" src={integration.logo} alt={integration.title} sx={{ width: 96, height: 96 }} />
          </Box>
          <Stack spacing={1}>
            <Typography align="center" variant="h5">
              {integration.title}
            </Typography>
            <Typography align="center" variant="body1">
              {integration.description}
            </Typography>
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
}
