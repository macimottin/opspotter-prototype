'use client';

import * as React from 'react';
import { useParams } from 'next/navigation';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Box from '@mui/material/Box';
import { useEffect, useState } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import dynamic from 'next/dynamic';
import ReactMarkdown from 'react-markdown';

const cryptoData: Record<string, { title: string; description: string; icon: string }> = {
  'bitcoin': {
    title: 'Bitcoin',
    description: 'Bitcoin é a primeira e mais conhecida criptomoeda, utilizada como reserva de valor e meio de troca digital.',
    icon: '/assets/btc-logo.svg',
  },
  'ethereum': {
    title: 'Ethereum',
    description: 'Ethereum é uma plataforma descentralizada que permite a criação de contratos inteligentes e aplicativos distribuídos.',
    icon: '/assets/eth-logo.svg',
  },
};

interface AnaliseData {
  id: string;
  timestamp: string;
  analise: string;
}

// Type for candlestick data
interface Candle {
  x: Date;
  y: [number, number, number, number];
}

async function fetchAnalise(): Promise<AnaliseData | null> {
  const res = await fetch('https://unhoqitkhjfd3oivkzhgctybgm.appsync-api.sa-east-1.amazonaws.com/graphql', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': 'da2-wj45i7zllbdrhogzcp6bvmv7mu',
    },
    body: JSON.stringify({
      query: `query { getUltimaAnalise(id: "analise-bitcoin") { id timestamp analise } }`,
    })
  });
    const json = await res.json();
    return json?.data?.getUltimaAnalise || null;
}

// Dynamically import ReactApexChart to avoid SSR issues
const ReactApexChart = dynamic(() => import('react-apexcharts'), { ssr: false });

export default function CriptoPage() {
  const params = useParams();
  const id = (params?.id as string)?.toLowerCase();
  const data = cryptoData[id] || { title: 'Criptomoeda', description: 'Dados não encontrados.', icon: '/assets/cripto-logo.svg' };

  const [analise, setAnalise] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // State for candlestick data
  const [candleData, setCandleData] = useState<Candle[]>([]);
  const [candleLoading, setCandleLoading] = useState(false);
  const [candleError, setCandleError] = useState<string | null>(null);

  useEffect(() => {
    if (id === 'bitcoin') {
      setLoading(true);
      fetchAnalise().then((res) => {
        setAnalise(res?.analise || null);
        setLoading(false);
      });
      // Fetch candlestick data for BTC/BRL
      setCandleLoading(true);
      setCandleError(null);
      fetch(
        'https://api.twelvedata.com/time_series?symbol=BTC/BRL&interval=15min&outputsize=96&apikey=9160f2dd883d4fe2b73fa8bd73dc5332'
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
              </Typography>
              {loading ? (
                <CircularProgress />
              ) : analise ? (
                <Box sx={{ whiteSpace: 'pre-line', fontFamily: 'inherit', mt: 2 }}>
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
              ) : (
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
              {id === 'bitcoin' ? (
                candleLoading ? (
                  <CircularProgress />
                ) : candleError ? (
                  <Typography color="error">{candleError}</Typography>
                ) : candleData.length > 0 ? (
                  <ReactApexChart
                    type="candlestick"
                    series={[{ data: candleData }]}
                    options={{
                      chart: { id: 'btc-candles', height: 350, type: 'candlestick' },
                      xaxis: { type: 'datetime' },
                      yaxis: { tooltip: { enabled: true } },
                      title: { text: 'BTC/BRL - Últimas 24h (15min)', align: 'left' },
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
