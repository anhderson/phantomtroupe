import { NextResponse } from 'next/server';

const NEWS_FEEDS = [
  {
    id: 1,
    cat: 'DINHEIRO E CUSTO DE VIDA',
    url: 'https://news.google.com/rss/search?q=economia+inflacao+custo+de+vida+brasil+when:1d&hl=pt-BR&gl=BR&ceid=BR:pt-419',
    fallbackUrl: 'https://news.google.com/rss/search?q=economia+inflacao+custo+de+vida+brasil&hl=pt-BR&gl=BR&ceid=BR:pt-419',
  },
  {
    id: 2,
    cat: 'EMPREGO E OPORTUNIDADES',
    url: 'https://news.google.com/rss/search?q=vagas+emprego+oportunidades+brasil+when:1d&hl=pt-BR&gl=BR&ceid=BR:pt-419',
    fallbackUrl: 'https://news.google.com/rss/search?q=vagas+emprego+oportunidades+brasil&hl=pt-BR&gl=BR&ceid=BR:pt-419',
  },
  {
    id: 3,
    cat: 'SEGURANÇA',
    url: 'https://news.google.com/rss/search?q=seguranca+publica+brasil+when:1d&hl=pt-BR&gl=BR&ceid=BR:pt-419',
    fallbackUrl: 'https://news.google.com/rss/search?q=seguranca+publica+brasil&hl=pt-BR&gl=BR&ceid=BR:pt-419',
  },
  {
    id: 4,
    cat: 'SAÚDE',
    url: 'https://news.google.com/rss/search?q=saude+medicina+tratamento+brasil+when:1d&hl=pt-BR&gl=BR&ceid=BR:pt-419',
    fallbackUrl: 'https://news.google.com/rss/search?q=saude+medicina+tratamento+brasil&hl=pt-BR&gl=BR&ceid=BR:pt-419',
  },
  {
    id: 5,
    cat: 'TECNOLOGIA ÚTIL',
    url: 'https://news.google.com/rss/search?q=tecnologia+inteligencia+artificial+inovacao+when:1d&hl=pt-BR&gl=BR&ceid=BR:pt-419',
    fallbackUrl: 'https://news.google.com/rss/search?q=tecnologia+inteligencia+artificial+inovacao&hl=pt-BR&gl=BR&ceid=BR:pt-419',
  },
  {
    id: 6,
    cat: 'NOTÍCIAS E POLÍTICA',
    url: 'https://news.google.com/rss/search?q=politica+brasil+governo+when:1d&hl=pt-BR&gl=BR&ceid=BR:pt-419',
    fallbackUrl: 'https://news.google.com/rss/search?q=politica+brasil+governo&hl=pt-BR&gl=BR&ceid=BR:pt-419',
  },
  {
    id: 7,
    cat: 'CONSUMO E AVALIAÇÕES',
    url: 'https://news.google.com/rss/search?q=consumidor+mercado+produtos+brasil+when:1d&hl=pt-BR&gl=BR&ceid=BR:pt-419',
    fallbackUrl: 'https://news.google.com/rss/search?q=consumidor+mercado+produtos+brasil&hl=pt-BR&gl=BR&ceid=BR:pt-419',
  },
  {
    id: 8,
    cat: 'ENTRETENIMENTO E CULTURA',
    url: 'https://news.google.com/rss/search?q=cultura+entretenimento+cinema+musica+esporte+brasil+when:1d&hl=pt-BR&gl=BR&ceid=BR:pt-419',
    fallbackUrl: 'https://news.google.com/rss/search?q=cultura+entretenimento+cinema+musica+esporte+brasil&hl=pt-BR&gl=BR&ceid=BR:pt-419',
  },
  {
    id: 9,
    cat: 'RELACIONAMENTOS E COMPORTAMENTO',
    url: 'https://news.google.com/rss/search?q=comportamento+psicologia+saude+mental+relacionamentos+when:7d&hl=pt-BR&gl=BR&ceid=BR:pt-419',
    fallbackUrl: 'https://news.google.com/rss/search?q=comportamento+psicologia+saude+mental&hl=pt-BR&gl=BR&ceid=BR:pt-419',
  },
  {
    id: 10,
    cat: 'ESPIRITUALIDADE E SENTIDO DE VIDA',
    url: 'https://news.google.com/rss/search?q=espiritualidade+filosofia+autoconhecimento+proposito+when:7d&hl=pt-BR&gl=BR&ceid=BR:pt-419',
    fallbackUrl: 'https://news.google.com/rss/search?q=espiritualidade+filosofia+autoconhecimento&hl=pt-BR&gl=BR&ceid=BR:pt-419',
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

function parseFirstRssItem(xml: string): { title: string; link: string } | null {
  const itemMatch = xml.match(/<item>([\s\S]*?)<\/item>/);
  if (!itemMatch) return null;
  const itemXml = itemMatch[1];
  const titleMatch = itemXml.match(/<title>([\s\S]*?)<\/title>/);
  const linkMatch = itemXml.match(/<link>([\s\S]*?)<\/link>/);
  if (!titleMatch || !linkMatch) return null;
  const title = decodeXmlEntities(titleMatch[1]);
  const link = decodeXmlEntities(linkMatch[1]);
  if (!title || !link) return null;
  return { title, link };
}

export async function GET() {
  try {
    const items = await Promise.all(
      NEWS_FEEDS.map(async (feed) => {
        try {
          const res = await fetch(feed.url, { next: { revalidate: 3600 } });
          const xml = await res.text();
          let parsed = parseFirstRssItem(xml);

          if (!parsed && feed.fallbackUrl) {
            const fallbackRes = await fetch(feed.fallbackUrl, { next: { revalidate: 3600 } });
            const fallbackXml = await fallbackRes.text();
            parsed = parseFirstRssItem(fallbackXml);
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
      items: validItems,
    });
  } catch {
    return NextResponse.json({ error: 'Failed to fetch daily news', items: [] }, { status: 500 });
  }
}
