import { NextResponse } from 'next/server';

const MAX_AGE_MS = 3 * 24 * 60 * 60 * 1000; // Máximo de 3 dias (72 horas)

const NEWS_FEEDS = [
  {
    id: 1,
    cat: 'POLÍTICA GLOBAL MUNDIAL',
    url: 'https://news.google.com/rss/search?q=(geopolitica+OR+diplomacia+OR+ONU+OR+internacional+OR+guerra+OR+acordo)+(site:bbc.com+OR+site:dw.com+OR+site:reuters.com+OR+site:elpais.com+OR+site:theguardian.com+OR+site:g1.globo.com+OR+site:estadao.com.br)+when:3d&hl=pt-BR&gl=BR&ceid=BR:pt-419',
    fallbackUrl: 'https://news.google.com/rss/search?q=politica+internacional+mundo+geopolitica+when:3d&hl=pt-BR&gl=BR&ceid=BR:pt-419',
  },
  {
    id: 2,
    cat: 'DINHEIRO E CUSTO DE VIDA',
    url: 'https://news.google.com/rss/search?q=(economia+OR+inflacao+OR+juros+OR+mercados)+(site:bbc.com+OR+site:reuters.com+OR+site:valor.globo.com+OR+site:g1.globo.com+OR+site:estadao.com.br)+when:3d&hl=pt-BR&gl=BR&ceid=BR:pt-419',
    fallbackUrl: 'https://news.google.com/rss/search?q=economia+inflacao+custo+de+vida+brasil+when:3d&hl=pt-BR&gl=BR&ceid=BR:pt-419',
  },
  {
    id: 3,
    cat: 'EMPREGO E OPORTUNIDADES',
    url: 'https://news.google.com/rss/search?q=vagas+emprego+oportunidades+trabalho+brasil+when:3d&hl=pt-BR&gl=BR&ceid=BR:pt-419',
    fallbackUrl: 'https://news.google.com/rss/search?q=emprego+trabalho+carreira+when:3d&hl=pt-BR&gl=BR&ceid=BR:pt-419',
  },
  {
    id: 4,
    cat: 'SEGURANÇA',
    url: 'https://news.google.com/rss/search?q=seguranca+publica+defesa+justica+brasil+mundo+when:3d&hl=pt-BR&gl=BR&ceid=BR:pt-419',
    fallbackUrl: 'https://news.google.com/rss/search?q=seguranca+publica+when:3d&hl=pt-BR&gl=BR&ceid=BR:pt-419',
  },
  {
    id: 5,
    cat: 'SAÚDE',
    url: 'https://news.google.com/rss/search?q=(saude+OR+medicina+OR+OMS+OR+ciencia)+(site:bbc.com+OR+site:dw.com+OR+site:g1.globo.com+OR+site:estadao.com.br)+when:3d&hl=pt-BR&gl=BR&ceid=BR:pt-419',
    fallbackUrl: 'https://news.google.com/rss/search?q=saude+medicina+tratamento+when:3d&hl=pt-BR&gl=BR&ceid=BR:pt-419',
  },
  {
    id: 6,
    cat: 'TECNOLOGIA ÚTIL',
    url: 'https://news.google.com/rss/search?q=(tecnologia+OR+inteligencia+artificial+OR+ciencia)+(site:bbc.com+OR+site:dw.com+OR+site:reuters.com+OR+site:g1.globo.com+OR+site:olhardigital.com.br)+when:3d&hl=pt-BR&gl=BR&ceid=BR:pt-419',
    fallbackUrl: 'https://news.google.com/rss/search?q=tecnologia+inteligencia+artificial+inovacao+when:3d&hl=pt-BR&gl=BR&ceid=BR:pt-419',
  },
  {
    id: 7,
    cat: 'NOTÍCIAS E POLÍTICA',
    url: 'https://news.google.com/rss/search?q=(politica+OR+congresso+OR+governo)+(site:bbc.com+OR+site:g1.globo.com+OR+site:estadao.com.br+OR+site:folha.uol.com.br+OR+site:agenciabrasil.ebc.com.br)+when:3d&hl=pt-BR&gl=BR&ceid=BR:pt-419',
    fallbackUrl: 'https://news.google.com/rss/search?q=politica+brasil+governo+when:3d&hl=pt-BR&gl=BR&ceid=BR:pt-419',
  },
  {
    id: 8,
    cat: 'CONSUMO E AVALIAÇÕES',
    url: 'https://news.google.com/rss/search?q=consumidor+mercado+sustentabilidade+economia+when:3d&hl=pt-BR&gl=BR&ceid=BR:pt-419',
    fallbackUrl: 'https://news.google.com/rss/search?q=consumidor+mercado+produtos+when:3d&hl=pt-BR&gl=BR&ceid=BR:pt-419',
  },
  {
    id: 9,
    cat: 'ENTRETENIMENTO E CULTURA',
    url: 'https://news.google.com/rss/search?q=cultura+cinema+musica+arte+esporte+mundo+when:3d&hl=pt-BR&gl=BR&ceid=BR:pt-419',
    fallbackUrl: 'https://news.google.com/rss/search?q=cultura+entretenimento+cinema+musica+when:3d&hl=pt-BR&gl=BR&ceid=BR:pt-419',
  },
  {
    id: 10,
    cat: 'RELACIONAMENTOS E COMPORTAMENTO',
    url: 'https://news.google.com/rss/search?q=comportamento+psicologia+saude+mental+sociedade+when:3d&hl=pt-BR&gl=BR&ceid=BR:pt-419',
    fallbackUrl: 'https://news.google.com/rss/search?q=comportamento+saude+mental+sociedade+when:3d&hl=pt-BR&gl=BR&ceid=BR:pt-419',
  },
  {
    id: 11,
    cat: 'ESPIRITUALIDADE E SENTIDO DE VIDA',
    url: 'https://news.google.com/rss/search?q=filosofia+espiritualidade+autoconhecimento+ciencia+humanidade+when:3d&hl=pt-BR&gl=BR&ceid=BR:pt-419',
    fallbackUrl: 'https://news.google.com/rss/search?q=filosofia+espiritualidade+proposito+when:3d&hl=pt-BR&gl=BR&ceid=BR:pt-419',
  },
];

function decodeXmlEntities(str: string): string {
  return str
    .replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, '$1')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;|&apos;/g, "'")
    .trim();
}

function parseRecentRssItem(xml: string): { title: string; link: string } | null {
  const itemRegex = /<item>([\s\S]*?)<\/item>/g;
  const now = Date.now();
  let match: RegExpExecArray | null;
  let firstCandidate: { title: string; link: string } | null = null;

  while ((match = itemRegex.exec(xml)) !== null) {
    const itemXml = match[1];
    const titleMatch = itemXml.match(/<title>([\s\S]*?)<\/title>/);
    const linkMatch = itemXml.match(/<link>([\s\S]*?)<\/link>/);
    const pubDateMatch = itemXml.match(/<pubDate>([\s\S]*?)<\/pubDate>/);

    if (!titleMatch || !linkMatch) continue;
    const title = decodeXmlEntities(titleMatch[1]);
    const link = decodeXmlEntities(linkMatch[1]);
    if (!title || !link) continue;

    if (!firstCandidate) {
      firstCandidate = { title, link };
    }

    if (pubDateMatch) {
      const pubTime = Date.parse(pubDateMatch[1].trim());
      if (!Number.isNaN(pubTime) && now - pubTime <= MAX_AGE_MS) {
        return { title, link };
      }
    } else {
      return { title, link };
    }
  }

  return firstCandidate;
}

export async function GET() {
  try {
    const items = await Promise.all(
      NEWS_FEEDS.map(async (feed) => {
        try {
          const res = await fetch(feed.url, { next: { revalidate: 1800 } });
          const xml = await res.text();
          let parsed = parseRecentRssItem(xml);

          if (!parsed && feed.fallbackUrl) {
            const fallbackRes = await fetch(feed.fallbackUrl, { next: { revalidate: 1800 } });
            const fallbackXml = await fallbackRes.text();
            parsed = parseRecentRssItem(fallbackXml);
          }

          if (parsed) {
            return {
              id: feed.id,
              cat: feed.cat,
              text: parsed.title,
              url: parsed.link,
            };
          }
        } catch {
          // Fallback below if individual feed fails
        }
        return null;
      })
    );

    const validItems = items.filter((item): item is NonNullable<typeof item> => item !== null);

    return NextResponse.json({
      updatedAt: new Date().toISOString(),
      maxAgeDays: 3,
      items: validItems,
    });
  } catch {
    return NextResponse.json({ error: 'Failed to fetch daily news', items: [] }, { status: 500 });
  }
}
