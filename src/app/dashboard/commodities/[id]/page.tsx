'use client';

import * as React from 'react';
import { useParams } from 'next/navigation';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Box from '@mui/material/Box';
import ReactMarkdown from 'react-markdown';
import dynamic from 'next/dynamic';
import CircularProgress from '@mui/material/CircularProgress';

// Dynamically import ReactApexChart to avoid SSR issues
const ReactApexChart = dynamic(() => import('react-apexcharts'), { ssr: false });

// Type for candlestick data
interface Candle {
  x: Date;
  y: [number, number, number, number];
}

const commodityData: Record<string, { title: string; description: string; icon: string }> = {
  'milho': {
    title: 'Milho',
    description: 'O milho é um grão amplamente cultivado, essencial para alimentação, ração animal e produtos industriais.',
    icon: '/assets/corn-icon.svg',
  },
  'soja': {
    title: 'Soja',
    description: 'A soja é uma importante fonte de proteína e óleo, utilizada na alimentação e na indústria.',
    icon: '/assets/soybean-icon.svg',
  },
  'trigo': {
    title: 'Trigo',
    description: 'O trigo é um alimento básico, fornecendo nutrição para bilhões de pessoas no mundo.',
    icon: '/assets/wheat-icon.svg',
  },
  'arroz': {
    title: 'Arroz',
    description: 'O arroz é a principal fonte de alimento para mais da metade da população mundial.',
    icon: '/assets/rice-icon.svg',
  },
};

export default function CommodityPage() {
  const params = useParams();
  const id = (params?.id as string)?.toLowerCase();
  const data = commodityData[id] || { title: 'Commoditie', description: 'Dados não encontrados.', icon: '/assets/commodities-logo.svg' };

  const [analise, setAnalise] = React.useState<string | null>(null);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [analiseTimestamp, setAnaliseTimestamp] = React.useState<string | null>(null);

  // State for candlestick data
  const [candleData, setCandleData] = React.useState<Candle[]>([]);
  const [candleLoading, setCandleLoading] = React.useState(false);
  const [candleError, setCandleError] = React.useState<string | null>(null);

  React.useEffect(() => {
    async function fetchAnalise() {
      setLoading(true);
      setError(null);
      try {
        if (id === 'soja') {
          // Fetch Soja analysis from GraphQL API
          const response = await fetch('https://unhoqitkhjfd3oivkzhgctybgm.appsync-api.sa-east-1.amazonaws.com/graphql', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'x-api-key': 'da2-wj45i7zllbdrhogzcp6bvmv7mu',
            },
            body: JSON.stringify({
              query: `query { getUltimaAnaliseSoja(id: "analise-soja") { id timestamp analise } }`,
            })
          });
          if (!response.ok) throw new Error('Erro ao buscar análise');
          const json = await response.json();
          let analiseText = json?.data?.getUltimaAnaliseSoja?.analise || null;
          const analiseTime = json?.data?.getUltimaAnaliseSoja?.timestamp || null;
          if (analiseText) {
            analiseText = analiseText.replaceAll(String.raw`\n`, '\n');
          }
          setAnalise(analiseText);
          setAnaliseTimestamp(analiseTime);
        } else {
          // Default: fetch from REST API (existing logic)
          const response = await fetch(`/api/commodities/${id}/analise`);
          if (!response.ok) throw new Error('Erro ao buscar análise');
          const json = await response.json();
          let analiseText = json?.data?.getUltimaAnalise?.analise || null;
          const analiseTime = json?.data?.getUltimaAnalise?.timestamp || null;
          if (analiseText) {
            analiseText = analiseText.replaceAll(String.raw`\n`, '\n');
          }
          setAnalise(analiseText);
          setAnaliseTimestamp(analiseTime);
        }
      } catch {
        setError('Não foi possível carregar a análise.');
        setAnaliseTimestamp(null);
      } finally {
        setLoading(false);
      }
    }
    if (id) fetchAnalise();

    if (id === 'soja') {
      setCandleLoading(true);
      setCandleError(null);
      fetch(
        'https://api.twelvedata.com/time_series?symbol=S_1&interval=15min&outputsize=96&apikey=9160f2dd883d4fe2b73fa8bd73dc5332'
      )
        .then((res) => res.json())
        .then((json) => {
          if (json.status === 'error') {
            setCandleError(json.message || 'Erro ao buscar dados de candles.');
            setCandleData([]);
          } else {
            // Format data for ApexCharts
            const candles = (json.values || []).map((item: { datetime: string; open: string; high: string; low: string; close: string; }) => ({
              x: new Date(item.datetime),
              y: [
                Number.parseFloat(item.open),
                Number.parseFloat(item.high),
                Number.parseFloat(item.low),
                Number.parseFloat(item.close),
              ],
            })).reverse(); // API returns newest first
            setCandleData(candles);
          }
          setCandleLoading(false);
        })
        .catch((_error) => {
          setCandleError('Erro ao buscar dados de candles.');
          setCandleLoading(false);
        });
    }
  }, [id]);

  return (
    <Stack spacing={3}>
      <Stack direction="row" alignItems="center" spacing={2}>
        {data.icon && (
          <Box component="img" src={data.icon} alt={data.title} sx={{ width: 64, height: 64 }} />
        )}
        <Typography variant="h4">{data.title}</Typography>
      </Stack>
      <Typography variant="body1">{data.description}</Typography>
      <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 3 }}>
        {/* Left column: Análise de IA */}
        <Box sx={{ width: { xs: '100%', md: '50%' }, minWidth: 0, p: 1 }}>
          <Card>
            <CardContent sx={{ maxHeight: 400, overflow: 'auto' }}>
              <Typography variant="h6" gutterBottom>
                Análise de IA
                {analiseTimestamp && (
                  <Typography component="span" variant="caption" color="text.secondary" sx={{ ml: 2 }}>
                    {analiseTimestamp}
                  </Typography>
                )}
              </Typography>
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
              {id === 'soja' ? (
                candleLoading ? (
                  <CircularProgress />
                ) : candleError ? (
                  <Typography color="error">{candleError}</Typography>
                ) : candleData.length > 0 ? (
                  <ReactApexChart
                    type="candlestick"
                    series={[{ data: candleData }]}
                    options={{
                      chart: { id: 'soja-candles', height: 350, type: 'candlestick' },
                      xaxis: { type: 'datetime' },
                      yaxis: { tooltip: { enabled: true } },
                      title: { text: 'Soja (S_1) - Últimas 24h (15min)', align: 'left' },
                    }}
                    height={350}
                  />
                ) : (
                  <Typography variant="body2" color="text.secondary">Sem dados de candles.</Typography>
                )
              ) : (
                <Typography variant="body2" color="text.secondary">(Gráfico de candles será exibido aqui...)</Typography>
              )}
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
