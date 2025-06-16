'use client';

import * as React from 'react';
import { useParams } from 'next/navigation';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Box from '@mui/material/Box';
import ReactMarkdown from 'react-markdown';

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

  const [analise, setAnalise] = React.useState<string | null>(null);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    async function fetchAnalise() {
      setLoading(true);
      setError(null);
      try {
        // Substitua a URL abaixo pela URL real da sua API
        const response = await fetch(`/api/commodities/${id}/analise`);
        if (!response.ok) throw new Error('Erro ao buscar análise');
        const json = await response.json();
        // Normalize markdown: ensure all newlines are real newlines
        let analiseText = json?.data?.getUltimaAnalise?.analise || null;
        // Debug: log the raw markdown string
        console.log('Raw analise markdown:', analiseText);
        // Robust normalization: handle double-escaped newlines and carriage returns
        if (analiseText) {
          // Convert all escaped newlines (\\n or \n) to real newlines using String.raw and replaceAll
          analiseText = analiseText.replaceAll(String.raw`\n`, '\n');
        }
        setAnalise(analiseText);
      } catch {
        setError('Não foi possível carregar a análise.');
      } finally {
        setLoading(false);
      }
    }
    if (id) fetchAnalise();
  }, [id]);

  return (
    <Stack spacing={3}>
      <Typography variant="h4">{data.title}</Typography>
      <Typography variant="body1">{data.description}</Typography>
      <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 3 }}>
        {/* Left column: Análise de IA */}
        <Box sx={{ width: { xs: '100%', md: '50%' }, minWidth: 0, p: 1 }}>
          <Card>
            <CardContent sx={{ maxHeight: 400, overflow: 'auto' }}>
              <Typography variant="h6" gutterBottom>Análise de IA</Typography>
              {loading && <Typography variant="body2">Carregando análise...</Typography>}
              {error && <Typography variant="body2" color="error.main">{error}</Typography>}
              {analise && (
                <Box sx={{ mt: 2 }}>
                  <ReactMarkdown
                    components={{
                      h1: ({node, ...props}) => <Typography variant="h4" gutterBottom {...props} />,
                      h2: ({node, ...props}) => <Typography variant="h5" gutterBottom {...props} />,
                      h3: ({node, ...props}) => <Typography variant="h6" gutterBottom {...props} />,
                      h4: ({node, ...props}) => <Typography variant="subtitle1" gutterBottom {...props} />,
                      h5: ({node, ...props}) => <Typography variant="subtitle2" gutterBottom {...props} />,
                      h6: ({node, ...props}) => <Typography variant="body1" gutterBottom {...props} />,
                      p: ({node, ...props}) => <Typography variant="body1" paragraph {...props} />,
                      li: ({node, ...props}) => <li><Typography variant="body2" component="span" {...props} /></li>,
                      strong: ({node, ...props}) => <strong {...props} />,
                      em: ({node, ...props}) => <em {...props} />,
                      ul: ({node, ...props}) => <ul style={{ marginLeft: 24 }} {...props} />,
                      ol: ({node, ...props}) => <ol style={{ marginLeft: 24 }} {...props} />,
                      code: ({node, ...props}) => <code style={{ background: '#f5f5f5', borderRadius: 4, padding: '2px 4px' }} {...props} />,
                    }}
                  >
                    {analise}
                  </ReactMarkdown>
                </Box>
              )}
              {!loading && !analise && !error && (
                <Typography variant="body2" color="text.secondary">(Resposta da IA será exibida aqui...)</Typography>
              )}
            </CardContent>
          </Card>
        </Box>
        {/* Right column: Gráfico de Candles and Últimas Notícias */}
        <Box sx={{ width: { xs: '100%', md: '50%' }, minWidth: 0, p: 1, display: 'flex', flexDirection: 'column', gap: 3 }}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>Gráfico de Candles</Typography>
              <Typography variant="body2" color="text.secondary">(Gráfico de candles será exibido aqui...)</Typography>
            </CardContent>
          </Card>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>Últimas Notícias & Sentimento</Typography>
              <Typography variant="body2" color="text.secondary">(Notícias e sentimento serão exibidos aqui...)</Typography>
            </CardContent>
          </Card>
        </Box>
      </Box>
    </Stack>
  );
}
