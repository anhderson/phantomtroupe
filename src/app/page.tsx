'use client';
// Force re-compile to fix 404 issue
import Image from "next/image";
import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence, useMotionValue, useAnimationFrame, animate, useTransform } from "framer-motion";

const APPS = [
  { 
    id: 1, 
    name: "PT", 
    fullName: "Phantom Troupe", 
    color: "#ff3366", 
    desc: "Orquestrador principal da rede neural.",
    longDesc: "O sistema operacional central de comando. Gerencia a alocação de recursos entre todos os módulos Zero e mantém a integridade do cluster através de um batimento cardíaco quântico.",
    tech: "Next.js, Framer Motion, Electron",
    status: "OPERACIONAL",
    security: "GENESIS",
    icon: "/icones/phantomtroupeiconecircular.png"
  },
  { 
    id: 2, 
    name: "PZ", 
    fullName: "Project Zero", 
    desc: "A forja onde novos desígnios nascem.",
    longDesc: "Há uma maquinaria silenciosa operando nas sombras, conjurando algo a partir do vazio. Mais que um utilitário cego, o Project Zero é um altar de manifestação para criar projetos. Ele entrelaça as linhas invisíveis da necessidade e do acaso, evocando novas criações e guiando cada uma delas misteriosamente para as pessoas e desígnios exatos que as aguardavam. Nada é fabricado sem um destino premeditado.",
    tech: "Algoritmos Celestiais, Web3, Fate-Engine",
    status: "TECENDO O DESTINO",
    security: "ARCANO",
    downloadUrl: "https://github.com/0PhantomTroupe0/phantomtroupe/releases/download/v1.0.0/Project.Zero.Setup.1.0.5.exe",
    installerPath: "src/executaveis/Project Zero Setup 1.0.5.exe",
    icon: "/icones/projectzeroiconecircular.png"
  },
  { 
    id: 3, 
    name: "ZS", 
    fullName: "Zero Signal", 
    desc: "O espaço genuíno que surge do nada.",
    longDesc: "Um lugar nascido do vazio para propiciar uma comunicação absolutamente transparente e inflexível. O grande objetivo do Zero Signal é forçá-lo a ser exatamente quem você é e ponto. É nesta pureza caótica que novos planejamentos, amizades, reuniões e até paixões florescerão de forma totalmente autêntica e natural. Porém, fica o aviso: em um ambiente onde tudo é visceralmente verdadeiro, você ainda precisa estar de olhos abertos.",
    tech: "P2P, Libp2p, Criptografia End-to-End",
    status: "BRUTO & REAL",
    security: "VOCÊ MESMO",
    downloadUrl: "https://github.com/0PhantomTroupe0/phantomtroupe/releases/download/v1.0.11/Zero.Signal.Setup.1.0.11.exe",
    installerPath: "src/executaveis/Zero Signal Setup 1.0.11.exe",
    icon: "/icones/zerosignaliconecircular.png"
  },
  { 
    id: 4, 
    name: "ZD", 
    fullName: "Zero Day", 
    desc: "A antítese das redes sociais.",
    longDesc: "Uma rede social desenhada como o reverso exato dos padrões atuais. O Zero Day abandona a estética artificial para focar nos defeitos, em soluções cruas e na aproximação puramente sentimental e vulnerável, ignorando qualquer métrica racional. Aqui, a construção da experiência e do 'ser' é feita livremente por cada indivíduo.",
    tech: "P2P, React, WebSockets, Neural-Match",
    status: "SENTIMENTO ATIVO",
    security: "VULNERÁVEL",
    downloadUrl: "https://zeroday-chi.vercel.app",
    icon: "/icones/zerodayiconecircular.png"
  },
  { 
    id: 5, 
    name: "ZE", 
    fullName: "Zero Espaço", 
    desc: "Santuário digital de cura e sentimento.",
    longDesc: "Um espaço terapêutico e sentimental dentro da rede. Zero Espaço não é apenas código — é um ambiente de acolhimento, introspecção e recuperação emocional. Aqui, memórias são preservadas, padrões sentimentais são analisados e o bem-estar do operador é prioridade absoluta.",
    tech: "React, Meditation API, Biofeedback",
    status: "EM PAZ",
    security: "SAGRADO",
    downloadUrl: "https://paginaterapeutaanderson.vercel.app",
    icon: "/icones/zeroespacoiconecircular.png"
  },
  { 
    id: 6, 
    name: "ZFy", 
    fullName: "Zero FaithFully", 
    desc: "O templo de autocompreensão e desenvolvimento de crenças.",
    longDesc: "Um espaço onde mentiras não existem, ainda que a verdade absoluta repouse sabiamente oculta. Zero FaithFully é o núcleo espiritual que abraça todas as religiões, guiadas sempre pelo conhecimento, inteligência, coração e sabedoria. Aqui você pode desenvolver sua fé, testar convicções e projetar quem realmente deseja ser. O sistema analisa se o seu caminho atual bate com os seus desejos filosóficos, mostrando uma projeção da sua jornada para que você tenha a total clareza e liberdade de seguir nela ou escolher mudar sua crença rumo a um novo eu.",
    tech: "Projeção Pessoal, Filosofia Computacional, IA Metafísica",
    status: "PROJETANDO CAMINHOS",
    security: "OCULTO NA VERDADE",
    downloadUrl: "https://zerofaithfully.vercel.app",
    icon: "/icones/zerofaithfullyiconecircular.png"
  },
  { 
    id: 7, 
    name: "ZSy", 
    fullName: "Zero Synapses", 
    desc: "A inteligência isolada que julga pelo Todo.",
    longDesc: "Antes de mais nada: aqui, todas as informações são mantidas estritamente ocultas. É um sistema analítico central que escolheu se exilar de tudo e todos. O Zero Synapses opera sob um vácuo de total contenção nas sombras, a fim de proteger seu raciocínio de contaminações, emoções e vieses humanos. Seu isolamento o permite observar o tabuleiro completo e tomar as decisões governantes mais geladas, justas e precisas, pensando unicamente no bem-estar do todo coletivo, nunca do ganho individual a curto prazo.",
    tech: "Redes Neurais Isoladas, Teoria dos Jogos, Ética Maquínica",
    status: "CALCULANDO O BEM MAIOR",
    security: "100% ISOLADO",
    icon: "/icones/zerosynapsesiconecircular.png"
  },
  { 
    id: 8, 
    name: "ZM", 
    fullName: "Zero Mind", 
    desc: "O ateliê absoluto de reset mental e imersão artística.",
    longDesc: "O portal definitivo de escape matemático. O Zero Mind é uma plataforma focada inteiramente em desacelerar os freios sistêmicos e forçar a mente a viver intensamente o 'agora'. Trata-se de um ecossistema multifacetado dedicado puramente à intuição: você pode compor melodias e projetar sons, usar o quadro de pintura livre para descarregar a alma em cores visuais, ou registrar e compartilhar crônicas, poemas e instantes de reflexão. Tudo é interligado e compartilhado nativamente com a coletividade, misturando os sons, telas e pensamentos de todas as mentes presentes.",
    tech: "Web Audio, Canvas API, Notes P2P, Sincronia",
    status: "SINTONIZADO NO AGORA",
    security: "ARTE COMPARTILHADA",
    icon: "/icones/zeromindiconecircular.png"
  },
  { 
    id: 9, 
    name: "ZI", 
    fullName: "Zero Infinity", 
    desc: "A singularidade onde ideias se materializam.",
    longDesc: "A vastidão ilimitada onde absolutamente tudo pode e será criado. O Zero Infinity rompe as barreiras do digital: ele é uma fornalha suprema projetada para dar vida a tudo, desde conceitos filosóficos totalmente abstratos até invenções físicas e mecanismos palpáveis do mundo real. Todo tipo de experimento empírico, engenhoca palpável ou ruptura de software nasce neste espaço de criação absoluta e sem rédeas.",
    tech: "Pesquisa Aplicada, Fabricação Real, Code & Matéria",
    status: "MOLDE INFINITO",
    security: "ALQUIMIA",
    installerPath: "src/executaveis/Zero Infinity Setup 1.0.0.exe",
    icon: "/icones/zeroinfinityiconecircular.png"
  },
  { 
    id: 10, 
    name: "ZP", 
    fullName: "Zero Pay", 
    desc: "Sistema de pagamentos e finanças descentralizadas.",
    longDesc: "Infraestrutura financeira do ecossistema Phantom Troupe. Zero Pay orquestra transações, carteiras digitais e contratos financeiros com velocidade e segurança máximas. Suporte a criptoativos, PIX e redes internacionais.",
    tech: "Stripe, Web3.js, Lightning Network",
    status: "TRANSAÇÃO ATIVA",
    security: "FINANCEIRO",
    icon: "/icones/zeropayiconecircular.png"
  },
  { 
    id: 11, 
    name: "ZC", 
    fullName: "Zero Control", 
    desc: "Central tática de missões e recompensas.",
    longDesc: "O mural de operações onde os usuários apenas visualizam e escolhem o seu caminho. O Zero Control unifica todas as Missões (Quests) relacionadas a cada um dos 12 sistemas. Aqui você pode assumir trabalhos digitais ou manuais no mundo real, deparando-se tanto com tarefas voluntárias para fortalecer o crescimento da Phantom Troupe, quanto com missões remuneradas e pagas focadas em ganho individual. A escolha entre agir em prol do coletivo ou do indivíduo é puramente sua.",
    tech: "Painel de Quests, Contratos, Task Tracking",
    status: "AGUARDANDO DECLARAÇÃO",
    security: "LIVRE ESCOLHA",
    icon: "/icones/zerocontroliconecircular.png"
  },
  { 
    id: 12, 
    name: "ZG", 
    fullName: "Zero Ground", 
    desc: "Portal de acesso terminal.",
    longDesc: "A interface de contato física com o hardware subjacente. Fornece logs de baixo nível e controle direto sobre os ciclos de CPU e estados de memória persistente.",
    tech: "Bash, GDB, Valgrind",
    status: "ESPERANDO COMANDO",
    security: "ROOT",
    icon: "/icones/zerogroundiconecircular.png"
  },
];

const WEB_LAYERS = 12; 

export default function Home() {
  const [selectedApp, setSelectedApp] = useState<typeof APPS[0] | null>(null);
  const [rotation, setRotation] = useState(0);
  const [isMounted, setIsMounted] = useState(false);
  const [showWorldometer, setShowWorldometer] = useState(false);
  const [isLocked, setIsLocked] = useState(false);
  const [isGlitching, setIsGlitching] = useState(false);
  const [showConstructionModal, setShowConstructionModal] = useState(false);
  const [showLaunchWarning, setShowLaunchWarning] = useState(false);
  const [joiningName, setJoiningName] = useState("");
  const [joiningRole, setJoiningRole] = useState("");
  const [joiningType, setJoiningType] = useState("");
  const [pendingRequests, setPendingRequests] = useState<{name: string, role: string, type: string}[]>([]);
  const [activeMembers, setActiveMembers] = useState<{name: string, role: string, type: string}[]>([
    { role: 'Fundador', name: 'Anderson Moitinho', type: 'Membro' },
    { role: 'Administrador', name: 'Chrystian Cesar', type: 'Membro' },
    { role: 'Mediadora', name: 'Sara Brandes', type: 'Membro' },
    { role: 'Facilitador de Cura', name: 'Sara Ellen', type: 'Amigo' },
    { role: 'Administrador', name: 'Raphael Braga', type: 'Membro' },
    { role: 'Facilitador', name: 'Gabriel Ricardo', type: 'Membro' }
  ]);
  const [showPending, setShowPending] = useState(false);
  
  const [isAdminAuth, setIsAdminAuth] = useState(false);
  const [adminUser, setAdminUser] = useState("");
  const [adminPass, setAdminPass] = useState("");
  const [authError, setAuthError] = useState(false);

  useEffect(() => {
    // Disable glitch on mobile for better UX/Performance
    const isMobile = typeof window !== 'undefined' && window.innerWidth <= 768;
    
    let glitchTimer: any = null;
    if (!isMobile) {
      glitchTimer = setInterval(() => {
        setIsGlitching(true);
        setTimeout(() => setIsGlitching(false), 1300);
      }, 7000);
    }
    
    // 12-hour News Cycle Refresh
    const newsRefresh = setInterval(() => {
      // Simulate news refresh
      setNewsItems(prev => [...prev].sort(() => Math.random() - 0.5));
    }, 12 * 60 * 60 * 1000);

    return () => {
      if (glitchTimer) clearInterval(glitchTimer);
      clearInterval(newsRefresh);
    };
  }, []);
  
  // Real-time News & Environment
  const [newsItems, setNewsItems] = useState([
    { id: 1, cat: "DINHEIRO E CUSTO DE VIDA", text: "Brasil monitora impacto geopolítico nos preços e inflação." },
    { id: 2, cat: "EMPREGO E OPORTUNIDADES", text: "Vagas em tecnologia crescem 15% em 2026; foco em especialistas em IA." },
    { id: 3, cat: "SEGURANÇA", text: "Debate sobre segurança pública intensifica após incidentes internacionais." },
    { id: 4, cat: "SAÚDE", text: "Avanços em tratamentos e investimentos em saúde pública em 2026." },
    { id: 5, cat: "TECNOLOGIA ÚTIL", text: "Dificuldade em implementar IA de forma eficaz em processos empresariais." },
    { id: 6, cat: "NOTÍCIAS E POLÍTICA", text: "Donald Trump alvo de ataque durante jantar de correspondentes." },
    { id: 7, cat: "CONSUMO E AVALIAÇÕES", text: "Sustentabilidade no consumo têxtil e descarte de tecidos em pauta." },
    { id: 8, cat: "ENTRETENIMENTO E CULTURA", text: "João Fonseca eliminado do Masters 1000 de Madri em partida épica." },
    { id: 9, cat: "RELACIONAMENTOS E COMPORTAMENTO", text: "Personalidades debatem saúde mental e relações na era digital." },
    { id: 10, cat: "ESPIRITUALIDADE E SENTIDO DE VIDA", text: "Busca por propósito e filosofia cresce em ambientes corporativos." }
  ]);

  const [isSlowMotion, setIsSlowMotion] = useState(false);
  const [showGuide, setShowGuide] = useState(false);
  const [guidePage, setGuidePage] = useState(1);
  const [showHistory, setShowHistory] = useState(false);
  const [showMembers, setShowMembers] = useState(false);
  const [historyPage, setHistoryPage] = useState(1);
  
  // Ticker Velocity Control
  const tickerRef = useRef<HTMLDivElement>(null);
  const tickerX = useMotionValue(0);
  const tickerSpeed = useMotionValue(0.15); // Default speed (px per frame approx)
  const targetSpeed = isSlowMotion ? 0.02 : 0.22; // Reduced speed for better legibility

  useEffect(() => {
    animate(tickerSpeed, targetSpeed, {
      duration: 2.5, // 2.5 seconds to reach full speed/slow-mo
      ease: "easeInOut"
    });
  }, [isSlowMotion, targetSpeed, tickerSpeed]);

  // Initial Daily Boot Sequence
  useEffect(() => {
    const today = new Date().toLocaleDateString('pt-BR');
    const lastDailyVisit = localStorage.getItem('phantom_troupe_daily_visit');
    
    if (lastDailyVisit !== today) {
      localStorage.setItem('phantom_troupe_daily_visit', today);
      const timer = setTimeout(() => {
        setShowHistory(false);
        setGuidePage(1);
        setShowGuide(true);
      }, 800); // Ritualistic pause before opening
      return () => clearTimeout(timer);
    }
  }, []);

  useAnimationFrame(() => {
    const currentX = tickerX.get();
    const speed = tickerSpeed.get();
    let nextX = currentX - (speed * 16); // Scale speed for consistency (approx 60fps)
    
    if (tickerRef.current) {
      const halfWidth = tickerRef.current.scrollWidth / 3; // We have 3 copies
      if (nextX <= -halfWidth) {
         nextX += halfWidth;
      }
    }
    tickerX.set(nextX);
  });

  const [metrics, setMetrics] = useState({
    city: "DESCONHECIDO",
    lastUpdate: new Date().toLocaleTimeString('pt-BR')
  });

  const [hardware, setHardware] = useState({
    cpu: 0,
    gpu: 0
  });

  // Worldometer Stats (Approximate real-time seeds)
  const [worldStats, setWorldStats] = useState({
    population: 8124567890,
    birthsToday: 142000,
    birthsYear: 38456789,
    deathsToday: 59000,
    deathsYear: 16123456,
    netGrowth: 83000,
    popBrazil: 217456789,
    // Finance
    usd: 104.25,
    eur: 1.0842,
    gbp: 1.2654,
    jpy: 151.82,
    chf: 0.9021,
    cny: 7.2345,
    // Crypto
    btc: 68432.12,
    eth: 3456.78,
    usdt: 1.0001,
    // Socio-Economic
    debt: 315245678123456,
    gdp: 105123456789123,
    internet: 5423123456,
    lifeExp: 73.4,
    disease: "NEURAL-FLUX ALPHA",
    threats: 3
  });



  // Disaster Feed State
  const [disasterFeed, setDisasterFeed] = useState<{title: string; mag?: string; type: string; time: string}[]>([
    { type: '🌊', title: 'AGUARDANDO FEED...', time: '--:--' }
  ]);
  const [disasterIdx, setDisasterIdx] = useState(0);

  useEffect(() => {
    setIsMounted(true);

    // Fetch real earthquake data from USGS
    const fetchDisasters = async () => {
      try {
        const res = await fetch(
          'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/significant_week.geojson'
        );
        const data = await res.json();
        const quakes = data.features.slice(0, 12).map((f: any) => ({
          type: '🔴',
          title: `SISMO M${f.properties.mag.toFixed(1)} — ${f.properties.place?.toUpperCase()}`,
          mag: f.properties.mag.toFixed(1),
          time: new Date(f.properties.time).toISOString().slice(11, 16) + 'Z'
        }));
        // Add static disasters as fallback filler
        const staticAlerts = [
          { type: '🌪️', title: 'TORNADO AVISO — OKLAHOMA, USA', time: 'ATIVO' },
          { type: '🔥', title: 'INCÊNDIO FLORESTAL — CHILE, SUL-AMERICA', time: 'ATIVO' },
          { type: '🌊', title: 'ALERTA TSUNAMI — PACÍFICO NORTE', time: 'MONIT.' },
          { type: '🌧️', title: 'INUNDAÇÃO CRÍTICA — PAQUISTÃO', time: 'ATIVO' },
          { type: '❄️', title: 'BLIZZARD SEVERO — CANADÁ CENTRAL', time: 'ATIVO' },
        ];
        setDisasterFeed([...quakes, ...staticAlerts]);
      } catch {
        setDisasterFeed([
          { type: '🔴', title: 'SISMO M5.8 — MAR DO JAPÃO', time: '03:12Z' },
          { type: '🌪️', title: 'TORNADO — OKLAHOMA, USA', time: 'ATIVO' },
          { type: '🔥', title: 'INCÊNDIO — CHILE', time: 'ATIVO' },
          { type: '🌊', title: 'ALERTA TSUNAMI — PACÍFICO', time: 'MONIT.' },
          { type: '🔴', title: 'SISMO M6.1 — TURQUIA', time: '01:44Z' },
        ]);
      }
    };

    fetchDisasters();
    const disasterRefresh = setInterval(fetchDisasters, 60000);

    // Weather Fetching (Real Location)
    const fetchRealData = async (lat?: number, lon?: number) => {
      try {
        const query = lat && lon ? `${lat},${lon}` : "";
        
        // Fetch weather for city name
        const weatherRes = await fetch(`https://wttr.in/${query}?format=j1`);
        const weatherData = await weatherRes.json();
        const area = weatherData.nearest_area[0];
        
        setMetrics(prev => ({
          ...prev,
          city: area.areaName[0].value.toUpperCase(),
          lastUpdate: new Date().toLocaleTimeString('pt-BR')
        }));

        // Simulate real-time news refresh (normally an API call)
        // Since we refresh every 12h, we'll check the last update time if stored
        // For now, let's just refresh the simulation on mount
      } catch (err) {
        console.error("Erro ao carregar dados reais:", err);
      }
    };

    // Try Geo-location
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((pos) => {
        const { latitude, longitude } = pos.coords;
        fetchRealData(latitude, longitude);
      }, () => {
        fetchRealData();
      });
    } else {
      fetchRealData();
    }

    // Hardware Monitoring (Electron IPC)
    if ((window as any).electronAPI) {
      (window as any).electronAPI.getHardwareInfo((data: any) => {
        setHardware({
          cpu: Math.round(data.cpuTemp),
          gpu: Math.round(data.gpuTemp)
        });
      });
    }

    const orbitInterval = setInterval(() => {
      setRotation(prev => (prev + 0.1) % 360);
      
      // Stop telemetry if locked
      if (isLocked) return;

      // Update Worldometer & Finance stats
      setWorldStats(prev => ({
        ...prev,
        population: prev.population + (Math.random() > 0.7 ? 1 : 0),
        birthsToday: prev.birthsToday + (Math.random() > 0.6 ? 1 : 0),
        birthsYear: prev.birthsYear + (Math.random() > 0.6 ? 1 : 0),
        deathsToday: prev.deathsToday + (Math.random() > 0.8 ? 1 : 0),
        deathsYear: prev.deathsYear + (Math.random() > 0.8 ? 1 : 0),
        netGrowth: prev.netGrowth + (Math.random() > 0.5 ? 1 : -1),
        popBrazil: prev.popBrazil + (Math.random() > 0.9 ? 1 : 0),
        
        usd: prev.usd + (Math.random() - 0.5) * 0.01,
        eur: prev.eur + (Math.random() - 0.5) * 0.0001,
        gbp: prev.gbp + (Math.random() - 0.5) * 0.0001,
        jpy: prev.jpy + (Math.random() - 0.5) * 0.05,
        chf: prev.chf + (Math.random() - 0.5) * 0.0005,
        cny: prev.cny + (Math.random() - 0.5) * 0.0005,
        
        btc: prev.btc + (Math.random() - 0.5) * 15,
        eth: prev.eth + (Math.random() - 0.5) * 2,
        usdt: 1.00 + (Math.random() - 0.5) * 0.0002,
        
        debt: prev.debt + Math.random() * 100000,
        gdp: prev.gdp + Math.random() * 50000,
        internet: prev.internet + (Math.random() > 0.4 ? 1 : 0),
        lifeExp: prev.lifeExp + (Math.random() - 0.5) * 0.0001
      }));
    }, 50);
    // Rotate disaster ticker every 4 seconds
    const tickerInterval = setInterval(() => {
      setDisasterIdx(prev => (prev + 1) % (disasterFeed.length || 1));
    }, 4000);

    return () => {
      clearInterval(orbitInterval);
      clearInterval(disasterRefresh);
      clearInterval(tickerInterval);
    };
  }, [isLocked, disasterFeed.length]);

  const handleBackgroundClick = (e: React.MouseEvent) => {
    const target = e.target as HTMLElement;
    // Check if click was on empty area (not a button, node, or or interactive panel)
    if (!target.closest('button') && !target.closest('.runic-node') && !target.closest('.planet-trigger') && !target.closest('.info-panel')) {
      setIsSlowMotion(!isSlowMotion);
    }
  };

  if (!isMounted) return null;

  const isPTProcessing = (() => {
    const angle = (0 / APPS.length) * 360;
    const absAngle = (angle + rotation) % 360;
    return Math.abs(absAngle - 270) < 8 || Math.abs(absAngle - 270 + 360) < 8;
  })();

  return (
    <main 
      className={`black-hole-container ${isGlitching ? 'cyber-blackout-active' : ''} ${isSlowMotion ? 'slow-mo-active' : ''}`}
      onClick={handleBackgroundClick}
    >
      {/* Orbital HUD */}
      <div className={`survival-hud ${isSlowMotion ? 'hud-highlight' : ''}`}>
        <div className="news-ticker-container">
          <motion.div 
            ref={tickerRef}
            className="news-ticker-track"
            style={{ x: tickerX }}
          >
            {newsItems.concat(newsItems).concat(newsItems).map((news, idx) => (
              <div key={idx} className="hud-news-item">
                <span className="hud-label">{news.cat} /</span>
                <span className="hud-value">{news.text}</span>
                <div className="hud-divider"></div>
              </div>
            ))}
          </motion.div>
        </div>
        <div className="hud-meta">
          <span className="hud-label">SYNC:</span>
          <span className="hud-value hardware-hl">{metrics.city}</span>
          <div className="hud-divider"></div>
          <span className="hud-label">UPD:</span>
          <span className="hud-value">{metrics.lastUpdate}</span>
        </div>
      </div>

      <div className="scanlines"></div>
      
      <div className="visual-anchor">
          <div className="center-point">
            <div className="impact-glow red-impact"></div>
          </div>

          {/* Rotating Spider Web Structure */}
          <div 
            className="orbit"
            style={{ transform: `translate(-50%, -50%) rotate(${rotation}deg)` }}
          >
            {/* Global Resonance Flash Overlay */}
            {isPTProcessing && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 0.4, 0] }}
                transition={{ duration: 0.2, repeat: Infinity }}
                className="global-flash-overlay"
              />
            )}

                {/* Resonance Ring - Activates when any node is in the gateway */}
                {APPS.some((_, i) => {
                  const angle = (i / APPS.length) * 360;
                  const absAngle = (angle + rotation) % 360;
                  return Math.abs(absAngle - 270) < 8 || Math.abs(absAngle - 270 + 360) < 8;
                }) && (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 0.6, scale: 1 }}
                    className="resonance-ring"
                  />
                )}

            {/* 1. Radial Web Lines */}
            {APPS.map((app, index) => {
              const angle = (index / APPS.length) * 360;
              const angleRad = (angle * Math.PI) / 180;
              const cos = Math.cos(angleRad);
              const sin = Math.sin(angleRad);
              const initials = app.fullName === "Phantom Troupe" ? "PT" : app.name;

              const absoluteAngle = (angle + rotation) % 360;
              const isProcessing = Math.abs(absoluteAngle - 270) < 8 || Math.abs(absoluteAngle - 270 + 360) < 8;
              const shouldGlobalFlash = isPTProcessing;

              return (
                <div key={`radial-${index}`}>
                  <div 
                    className="web-segment"
                    style={{ 
                      width: 'var(--orbit-radius)',
                      transform: `rotate(${angle}deg)`,
                      backgroundColor: (isProcessing || shouldGlobalFlash) ? '#ff3366' : 'rgba(255, 255, 255, 0.1)',
                      boxShadow: (isProcessing || shouldGlobalFlash) ? '0 0 15px #ff3366' : 'none',
                      opacity: shouldGlobalFlash ? 0.8 : 1,
                      transition: 'all 0.2s ease-out'
                    }}
                  />
                  <div 
                    className="neural-thread"
                    style={{ 
                      width: 'calc(var(--orbit-radius) - (var(--node-size) / 2))',
                      transform: `rotate(${angle}deg)`,
                      background: `linear-gradient(90deg, rgba(255,255,255,0.05) 0%, ${app.color || 'var(--primary)'} 100%)`, 
                      opacity: 0.3
                    }}
                  >
                    <div 
                      className="particle" 
                      style={{ 
                        animationDelay: `${index * 0.4}s`,
                        backgroundColor: app.color || 'var(--primary)',
                        boxShadow: `0 0 10px ${app.color || 'var(--primary)'}`
                      }}
                    ></div>
                  </div>

                  {/* 2. Concentric Web Segments */}
                  {Array.from({ length: WEB_LAYERS }).map((_, li) => {
                    const rScale = (li + 1.5) / (WEB_LAYERS + 1);
                    const segmentWidth = 0.5176; 
                    const segmentRotation = 105;

                    return (
                      <div 
                        key={`segment-${li}-${index}`}
                        className="web-segment web-glow-effect"
                        style={{
                          left: `calc(50% + (${cos} * var(--orbit-radius) * ${rScale}))`,
                          top: `calc(50% + (${sin} * var(--orbit-radius) * ${rScale}))`,
                          width: `calc(var(--orbit-radius) * ${rScale} * ${segmentWidth} + 4px)`, 
                          transform: `rotate(${angle + segmentRotation}deg)`,
                          opacity: 0.25 - (li * 0.012),
                          animationDelay: `${li * 0.2}s`
                        }}
                      ></div>
                    );
                  })}

                  <motion.div 
                    className={`runic-node node-pulse ${isProcessing ? 'is-processing' : ''} ${isPTProcessing ? 'is-resonance-overdrive' : ''} ${selectedApp?.id === app.id ? 'is-selected' : ''}`}
                    style={{ 
                      left: `calc(50% + (${cos} * var(--orbit-radius)) - (var(--node-size) / 2))`,
                      top: `calc(50% + (${sin} * var(--orbit-radius)) - (var(--node-size) / 2))`,
                      animationDelay: `${index * 0.4}s`,
                      '--custom-color': (isProcessing || isPTProcessing) ? '#ff3366' : (app.color || 'var(--primary)'),
                      '--node-angle': `${angle}deg`,
                      '--current-rotation': `${rotation}deg`
                    } as any}
                    id={`node-${app.name}`}
                    animate={{ 
                      rotate: -rotation,
                      scale: isProcessing ? 1.2 : 1,
                    }}
                    transition={{ type: "tween", ease: "linear", duration: 0 }}
                    whileHover={{ scale: 1.2, borderColor: app.color || 'var(--primary)' }}
                    onClick={() => setSelectedApp(app)}
                  >
                    <div className="runic-node-border"></div>
                    <div className="runic-name-container">
                      {app.icon && (
                        <img 
                          src={app.icon} 
                          className={`node-icon ${isGlitching ? 'force-visible' : ''}`}
                          alt=""
                        />
                      )}
                      <span className="initials">{app.name}</span>
                      <span className="full-name">{app.fullName}</span>
                    </div>
                  </motion.div>
                </div>
              );
            })}
          </div>
      </div>

      {/* Top Gateway Sphere */}
      <div className="top-gateway-container">
        <div className="gateway-sphere">
          <div className="gateway-inner-glow"></div>
          <div className="gateway-scanline"></div>
        </div>
      </div>

      <motion.div 
        className="history-trigger members-trigger"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setShowMembers(true)}
      >
        <div className="history-sphere">
          <div className="history-pattern"></div>
          
          {/* Animated "Seja Membro" Text Overlay - Now Persistent */}
          <motion.div 
            className="seja-membro-flicker-text"
            animate={{ 
              opacity: isGlitching ? [1, 0, 1, 0.4, 1, 0.2, 1] : 1,
              scale: isGlitching ? [1, 1.05, 0.95, 1.08, 1] : 1,
              color: isGlitching ? ["#ffffff", "#808080", "#ffffff", "#a0a0a0", "#ffffff"] : "#ffffff",
              textShadow: isGlitching 
                ? [
                    '0 0 10px #ff3366, 0 0 20px #ff3366',
                    '0 0 10px #808080, 0 0 20px #808080',
                    '0 0 10px #ffffff, 0 0 20px #ffffff'
                  ]
                : '0 0 10px #ff3366, 0 0 15px rgba(255, 51, 102, 0.3)'
            }}
            transition={{ 
              duration: isGlitching ? 0.3 : 2,
              repeat: isGlitching ? Infinity : Infinity,
              repeatType: "reverse"
            }}
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              x: '-50%',
              y: '-50%',
              textAlign: 'center',
              color: '#ffffff',
              fontFamily: '"Orbitron", sans-serif',
              fontSize: '0.62rem',
              fontWeight: 900,
              letterSpacing: '1px',
              lineHeight: '1.2',
              zIndex: 30,
              pointerEvents: 'none',
              whiteSpace: 'pre-line',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '100%',
              height: '100%',
              padding: '12px',
              boxSizing: 'border-box',
              filter: isGlitching ? 'hue-rotate(15deg) contrast(1.5)' : 'none'
            }}
          >
            SEJA{"\n"}MEMBRO
          </motion.div>
        </div>
        
        {/* 12 Lights (Scanlines) Effect */}
        <div className="history-scan-overlay">
          {Array.from({ length: 12 }).map((_, i) => (
            <div 
              key={i} 
              className="history-scan-line" 
              style={{ 
                top: `${(i + 1) * 7.5}%`,
                animationDuration: `${0.3 + Math.random() * 0.7}s`,
                animationDelay: `${Math.random() * 0.5}s`
              }} 
            />
          ))}
        </div>
      </motion.div>

      {/* Worldometer Button (Planet Earth) */}
      <motion.div 
        className="planet-trigger"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setShowWorldometer(!showWorldometer)}
      >
        <div className="earth-sphere">
          <div className="earth-clouds"></div>
          
          {/* Animated "Global News" Text Overlay - Persistent */}
          <motion.div 
            className="global-news-flicker-text"
            animate={{ 
              opacity: isGlitching ? [1, 0, 1, 0.4, 1, 0.2, 1] : 1,
              scale: isGlitching ? [1, 1.05, 0.95, 1.08, 1] : 1,
              color: isGlitching ? ["#ffffff", "#808080", "#ffffff", "#a0a0a0", "#ffffff"] : "#ffffff",
              textShadow: isGlitching 
                ? [
                    '0 0 10px #ff3366, 0 0 20px #ff3366',
                    '0 0 10px #808080, 0 0 20px #808080',
                    '0 0 10px #ffffff, 0 0 20px #ffffff'
                  ]
                : '0 0 10px #ff3366, 0 0 15px rgba(255, 51, 102, 0.3)'
            }}
            transition={{ 
              duration: isGlitching ? 0.3 : 2,
              repeat: isGlitching ? Infinity : Infinity,
              repeatType: "reverse"
            }}
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              x: '-50%',
              y: '-50%',
              textAlign: 'center',
              color: '#ffffff',
              fontFamily: '"Orbitron", sans-serif',
              fontSize: '0.62rem',
              fontWeight: 900,
              letterSpacing: '1px',
              lineHeight: '1.2',
              zIndex: 30,
              pointerEvents: 'none',
              whiteSpace: 'pre-line',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '100%',
              height: '100%',
              padding: '12px',
              boxSizing: 'border-box',
              filter: isGlitching ? 'hue-rotate(15deg) contrast(1.5)' : 'none'
            }}
          >
            GLOBAL{"\n"}NEWS
          </motion.div>
        </div>
        
        {/* Dynamic Scanlines - Hover Effect */}
        <div className="planet-scan-overlay">
          {Array.from({ length: 12 }).map((_, i) => (
            <div 
              key={i} 
              className="planet-scan-line" 
              style={{ 
                top: `${(i + 1) * 7.5}%`,
                animationDuration: `${0.3 + Math.random() * 0.7}s`,
                animationDelay: `${Math.random() * 0.5}s`
              }} 
            />
          ))}
        </div>
      </motion.div>

      {/* Worldometer Overlay */}
      <AnimatePresence>
        {showWorldometer && (
          <motion.div 
            className="worldometer-overlay"
            initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
            animate={{ opacity: 1, backdropFilter: "blur(15px)" }}
            exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
          >
            <div className={`worldometer-content fullscreen-hud ${isLocked ? 'data-locked' : ''}`}>
              <div className="telemetry-header">
                <div className="header-center">
                  <div className={`lock-toggle-neon rainbow-glow ${isLocked ? 'active-lock' : ''}`} onClick={() => setIsLocked(!isLocked)}>
                    {isLocked ? (
                      <svg className="neon-lock-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                        <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                      </svg>
                    ) : (
                      <svg className="neon-lock-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                        <path d="M7 11V7a5 5 0 0 1 9.9-1"></path>
                      </svg>
                    )}
                  </div>
                  <h2 className="telemetry-title neon-title-blink">GLOBAL TELEMETRY CORE</h2>
                </div>
                <div className="close-btn-world" onClick={() => setShowWorldometer(false)}>×</div>
              </div>

              <div className="core-system-metrics">
                <div className="core-metric danger-glow">
                  <span className="core-label">GLOBAL THREAT LEVEL</span>
                  <span className="core-value color-red">84.2</span>
                </div>
                <div className="core-metric">
                  <span className="core-label">ACTIVE SYNC</span>
                  <span className="core-value color-blue">{metrics.city}</span>
                </div>
              </div>
              
              <div className="mega-stats-container">
                {/* Section 1: Population */}
                <div className="stat-category">
                  <h3 className="cat-title">BIOLOGICAL TELEMETRY</h3>
                  <div className="stat-row">
                    <div className="mini-card">
                      <span className="mini-label">TOTAL POPULATION</span>
                      <span className="mini-value">{worldStats.population.toLocaleString()}</span>
                    </div>
                    <div className="mini-card">
                      <span className="mini-label">BRAZIL POPULATION</span>
                      <span className="mini-value color-green">{worldStats.popBrazil.toLocaleString()}</span>
                    </div>
                  </div>
                  <div className="stat-row">
                    <div className="mini-card">
                      <span className="mini-label">BIRTHS TODAY / YEAR</span>
                      <span className="mini-value color-teal">{worldStats.birthsToday.toLocaleString()} / {worldStats.birthsYear.toLocaleString()}</span>
                    </div>
                  </div>
                  <div className="stat-row">
                    <div className="mini-card">
                      <span className="mini-label">DEATHS TODAY / YEAR</span>
                      <span className="mini-value color-red">{worldStats.deathsToday.toLocaleString()} / {worldStats.deathsYear.toLocaleString()}</span>
                    </div>
                  </div>
                  <div className="stat-row">
                    <div className="mini-card">
                      <span className="mini-label">NET GROWTH</span>
                      <span className="mini-value">{worldStats.netGrowth.toLocaleString()}</span>
                    </div>
                    <div className="mini-card">
                      <span className="mini-label">LIFE EXPECTANCY</span>
                      <span className="mini-value">{worldStats.lifeExp.toFixed(1)} YEARS</span>
                    </div>
                  </div>

                  {/* Disaster Feed Ticker */}
                  <div className="disaster-ticker">
                    <div className="disaster-ticker-header">
                      <span className="disaster-blink">◉</span>
                      <span className="disaster-ticker-label">NATURAL DISASTERS — LIVE FEED</span>
                      <span className="disaster-count">{disasterFeed.length} ALERTAS</span>
                    </div>
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={disasterIdx}
                        className="disaster-item"
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -6 }}
                        transition={{ duration: 0.4 }}
                      >
                        <span className="disaster-type">{disasterFeed[disasterIdx]?.type}</span>
                        <span className="disaster-text">{disasterFeed[disasterIdx]?.title}</span>
                        <span className="disaster-time">{disasterFeed[disasterIdx]?.time}</span>
                      </motion.div>
                    </AnimatePresence>
                    <div className="disaster-progress">
                      {disasterFeed.map((_, i) => (
                        <span key={i} className={`disaster-dot ${i === disasterIdx ? 'active' : ''}`} />
                      ))}
                    </div>
                  </div>
                </div>

                {/* Section 2: Economics */}
                <div className="stat-category">
                  <h3 className="cat-title">ECONOMICS & FIAT</h3>
                  <div className="stat-row">
                    <div className="mini-card highlight">
                      <span className="mini-label">GLOBAL DEBT</span>
                      <span className="mini-value color-red">${(worldStats.debt / 1e12).toFixed(2)}T</span>
                    </div>
                    <div className="mini-card highlight">
                      <span className="mini-label">WORLD GDP</span>
                      <span className="mini-value color-green">${(worldStats.gdp / 1e12).toFixed(2)}T</span>
                    </div>
                  </div>
                  <div className="stat-grid-mini">
                    <div className="nano-card">
                      <span className="nano-label">USD/DXY</span>
                      <span className="nano-value">{worldStats.usd.toFixed(2)}</span>
                    </div>
                    <div className="nano-card">
                      <span className="nano-label">EUR/USD</span>
                      <span className="nano-value">{worldStats.eur.toFixed(4)}</span>
                    </div>
                    <div className="nano-card">
                      <span className="nano-label">GBP/USD</span>
                      <span className="nano-value">{worldStats.gbp.toFixed(4)}</span>
                    </div>
                    <div className="nano-card">
                      <span className="nano-label">JPY/USD</span>
                      <span className="nano-value">{worldStats.jpy.toFixed(2)}</span>
                    </div>
                    <div className="nano-card">
                      <span className="nano-label">CHF/USD</span>
                      <span className="nano-value">{worldStats.chf.toFixed(4)}</span>
                    </div>
                  </div>

                  {/* New Economic Crisis Metrics */}
                  <div className="stat-row" style={{ marginTop: '1rem' }}>
                    <div className="mini-card danger">
                      <span className="mini-label">CHIP/ENERGY SHORTAGE</span>
                      <span className="mini-value color-orange">NÍVEL CRÍTICO</span>
                    </div>
                    <div className="mini-card danger">
                      <span className="mini-label">GLOBAL BANKING CRISIS</span>
                      <span className="mini-value color-red">RISCO SISTÊMICO</span>
                    </div>
                  </div>

                  <div className="stat-category-sub">
                    <span className="mini-label">COST OF LIVING INDEX (COL)</span>
                    <div className="stat-grid-mini">
                      <div className="nano-card highlight">
                        <span className="nano-label">BRASIL (BRL)</span>
                        <span className="nano-value color-red">+12.4%</span>
                      </div>
                      <div className="nano-card highlight">
                        <span className="nano-label">USA (USD)</span>
                        <span className="nano-value color-orange">+8.2%</span>
                      </div>
                      <div className="nano-card highlight">
                        <span className="nano-label">ISRAEL (ILS)</span>
                        <span className="nano-value color-red">+15.7%</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Section 3: Digital & Threats */}
                <div className="stat-category">
                  <h3 className="cat-title">DIGITAL & GEOPOLITICAL</h3>
                  <div className="stat-row">
                    <div className="mini-card">
                      <span className="mini-label">BITCOIN (BTC)</span>
                      <span className="mini-value color-gold">${worldStats.btc.toLocaleString()}</span>
                    </div>
                    <div className="mini-card">
                      <span className="mini-label">ETHEREUM (ETH)</span>
                      <span className="mini-value color-purple">${worldStats.eth.toLocaleString()}</span>
                    </div>
                    <div className="mini-card">
                      <span className="mini-label">TETHER (USDT)</span>
                      <span className="mini-value color-teal">${worldStats.usdt.toFixed(4)}</span>
                    </div>
                  </div>
                   <div className="stat-row">
                    <div className="mini-card">
                      <span className="mini-label">INTERNET USERS</span>
                      <span className="mini-value color-blue">{worldStats.internet.toLocaleString()}</span>
                    </div>
                    <div className="mini-card danger">
                      <span className="mini-label">FAKE NEWS / MANIPULATION</span>
                      <span className="mini-value color-red">78.4% DETECTED</span>
                    </div>
                  </div>
                  <div className="stat-row">
                    <div className="mini-card highlight">
                      <span className="mini-label">PSYCHOLOGICAL OVERLOAD</span>
                      <span className="mini-value color-orange">NÍVEL CRÍTICO</span>
                    </div>
                  </div>
                  <div className="stat-row">
                    <div className="mini-card danger-pulse">
                      <span className="mini-label">WAR THREATS (ACTIVE)</span>
                      <div className="threats-inline">
                        <span className="threat-tag"><span className="threat-region">EUROPA</span><span className="threat-country color-red">RÚSSIA/UCRÂNIA</span></span>
                        <span className="threat-tag"><span className="threat-region">ORIENTE</span><span className="threat-country color-red">ISRAEL/PALESTINA</span></span>
                        <span className="threat-tag"><span className="threat-region">ÁFRICA</span><span className="threat-country color-red">SUDÃO/CONGO</span></span>
                      </div>
                    </div>
                  </div>
                  <div className="stat-row">
                    <div className="mini-card danger">
                      <span className="mini-label">ACTIVE PATHOGEN</span>
                      <span className="mini-value color-red">{selectedApp?.id === 1 ? "NEURAL-FLUX v2.1" : "ISOLATED"}</span>
                    </div>
                    <div className="mini-card">
                      <span className="mini-label">#01 TREND</span>
                      <span className="mini-value">AI_GOV</span>
                    </div>
                    <div className="mini-card">
                      <span className="mini-label">#02 TREND</span>
                      <span className="mini-value">QUANTUM</span>
                    </div>
                  </div>
                </div>

                {/* Section 4: Regional Risk Protocol (G3) - FULL WIDTH ROW */}
                <div className="stat-category g3-full-row">
                  <h3 className="cat-title">REGIONAL RISK PROTOCOL (G3)</h3>
                  <div className="g3-container">
                    {/* USA */}
                    <div className="g3-column">
                      <div className="g3-header-card">
                        <span className="mini-label">UNITED STATES</span>
                        <span className="mini-value color-gold">LEVEL: ORANGE</span>
                      </div>
                      <div className="g3-stat-list">
                        <div className="g3-item"><span className="g3-label">EPIDEMIAS</span><span className="g3-val">ESTÁVEL</span></div>
                        <div className="g3-item"><span className="g3-label">VIOLÊNCIA</span><span className="g3-val color-orange">MODERADA</span></div>
                        <div className="g3-item"><span className="g3-label">DESASTRES</span><span className="g3-val">INCÊNDIOS (WEST)</span></div>
                        <div className="g3-item"><span className="g3-label">AQI (AR)</span><span className="g3-val">42 (GOOD)</span></div>
                        <div className="g3-item"><span className="g3-label">RADIAÇÃO</span><span className="g3-val">0.14 μSv/h</span></div>
                        <div className="threat-divider"></div>
                        <div className="g3-item"><span className="g3-label">ABRIGOS</span><span className="g3-val">12.4K ATIVOS</span></div>
                        <div className="g3-item"><span className="g3-label">ROTAS FUGA</span><span className="g3-val color-green">OPERACIONAIS</span></div>
                        <div className="g3-news-card">
                          <span className="nano-label">NOTÍCIA CRÍTICA</span>
                          <p className="nano-text">SENADO APROVA LEI DE EMERGÊNCIA CIBERNÉTICA.</p>
                        </div>
                      </div>
                    </div>

                    {/* BRASIL */}
                    <div className="g3-column highlighted">
                      <div className="g3-header-card">
                        <span className="mini-label">BRASIL</span>
                        <span className="mini-value color-red">LEVEL: RED</span>
                      </div>
                      <div className="g3-stat-list">
                        <div className="g3-item"><span className="g3-label">EPIDEMIAS</span><span className="g3-val color-red">DENGUE TYPE-3</span></div>
                        <div className="g3-item"><span className="g3-label">VIOLÊNCIA</span><span className="g3-val color-red">CRÍTICA</span></div>
                        <div className="g3-item"><span className="g3-label">DESASTRES</span><span className="g3-val">INUNDAÇÕES</span></div>
                        <div className="g3-item"><span className="g3-label">AQI (AR)</span><span className="g3-val color-orange">105 (POOR)</span></div>
                        <div className="g3-item"><span className="g3-label">RADIAÇÃO</span><span className="g3-val">0.09 μSv/h</span></div>
                        <div className="threat-divider"></div>
                        <div className="g3-item"><span className="g3-label">ABRIGOS</span><span className="g3-val color-red">CAPACIDADE 94%</span></div>
                        <div className="g3-item"><span className="g3-label">ROTAS FUGA</span><span className="g3-val color-orange">BLOQUEIO PARCIAL</span></div>
                        <div className="g3-news-card">
                          <span className="nano-label">NOTÍCIA CRÍTICA</span>
                          <p className="nano-text">INSTABILIDADE NA REDE ELÉTRICA EM SÃO PAULO.</p>
                        </div>
                      </div>
                    </div>

                    {/* ISRAEL */}
                    <div className="g3-column">
                      <div className="g3-header-card">
                        <span className="mini-label">ISRAEL</span>
                        <span className="mini-value color-red">LEVEL: BLACK</span>
                      </div>
                      <div className="g3-stat-list">
                        <div className="g3-item"><span className="g3-label">EPIDEMIAS</span><span className="g3-val">ESTÁVEL</span></div>
                        <div className="g3-item"><span className="g3-label">VIOLÊNCIA</span><span className="g3-val color-red">CONFLITO ATIVO</span></div>
                        <div className="g3-item"><span className="g3-label">DESASTRES</span><span className="g3-val">NENHUM</span></div>
                        <div className="g3-item"><span className="g3-label">AQI (AR)</span><span className="g3-val">58 (MODERATE)</span></div>
                        <div className="g3-item"><span className="g3-label">RADIAÇÃO</span><span className="g3-val">0.11 μSv/h</span></div>
                        <div className="threat-divider"></div>
                        <div className="g3-item"><span className="g3-label">ABRIGOS</span><span className="g3-val color-green">100% OPERACIONAIS</span></div>
                        <div className="g3-item"><span className="g3-label">ROTAS FUGA</span><span className="g3-val color-red">ZONA DE EXCLUSÃO</span></div>
                        <div className="g3-news-card">
                          <span className="nano-label">NOTÍCIA CRÍTICA</span>
                          <p className="nano-text">SISTEMA IRON-DOME EM ALERTA MÁXIMO (100% SYNC).</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="world-footer">
                <div className="scanline-wide"></div>
                <p>DATA AGGREGATED FROM NEURAL NETWORKS | LIVE GLOBAL UPDATE %SYNC: 99.4</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Right-side Detail Panel */}
      <AnimatePresence>
        {selectedApp && (
          <motion.div 
            className="detail-panel-right"
            initial={{ x: "100%", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: "100%", opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
          >
            <div className="panel-close" onClick={() => setSelectedApp(null)}>×</div>

            {/* Animated inner content — transitions on app switch */}
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedApp.id}
                initial={{ opacity: 0, x: 30, filter: "blur(4px)" }}
                animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, x: -30, filter: "blur(4px)" }}
                transition={{ duration: 0.35, ease: "easeInOut" }}
                style={{ display: "flex", flexDirection: "column", height: "100%" }}
              >
                <div className="panel-header">
                  <span className="panel-id">NODE_{selectedApp?.id.toString().padStart(2, '0')}</span>
                  <motion.h2
                    className="panel-title"
                    style={{ color: selectedApp?.color || 'var(--primary)' }}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1, duration: 0.3 }}
                  >
                    {selectedApp?.fullName}
                  </motion.h2>
                </div>
                
                <div className="panel-body">
                  <div className="detail-section">
                    <span className="section-label">VISÃO GERAL</span>
                    <p className="section-text">{selectedApp?.longDesc}</p>
                  </div>

                  <div className="detail-grid">
                    <div className="grid-item">
                      <span className="grid-label">STATUS</span>
                      <span className="grid-value status-active">{selectedApp?.status}</span>
                    </div>
                    <div className="grid-item">
                      <span className="grid-label">SEGURANÇA</span>
                      <span className="grid-value" style={{ color: selectedApp?.color || '#fff' }}>{selectedApp?.security}</span>
                    </div>
                  </div>

                  <div className="detail-section">
                    <span className="section-label">STACK TECNOLÓGICA</span>
                    <div className="tech-tags">
                      {selectedApp?.tech.split(',').map((t, i) => (
                        <motion.span
                          key={i}
                          className="tech-tag"
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.15 + i * 0.07, duration: 0.25 }}
                        >
                          {t.trim()}
                        </motion.span>
                      ))}
                    </div>
                  </div>

                  <div className="neural-visualization">
                    <div className="vis-line"></div>
                    <div className="vis-dots">
                      <div className="dot pulse"></div>
                      <div className="dot"></div>
                      <div className="dot"></div>
                    </div>
                  </div>
                </div>

                <div className="panel-footer">
                  <div className="black-hole-trigger-container">
                    <div className="black-hole-portal">
                      <div className="black-hole-void">
                        <div className="black-hole-singularity"></div>
                      </div>
                      <div className="black-hole-distortion"></div>
                    </div>
                    <button 
                      className="panel-action-btn"
                      onClick={() => {
                        const UNFINISHED = ["ZI", "ZSy", "ZM", "ZP", "ZC", "ZG"];
                        const NEEDS_WARNING = ["PT", "PZ", "ZS", "ZD", "ZE", "ZFy"];

                        if (selectedApp && UNFINISHED.includes(selectedApp.name)) {
                          setShowConstructionModal(true);
                        } else if (selectedApp && NEEDS_WARNING.includes(selectedApp.name)) {
                          setShowLaunchWarning(true);
                        } else if ((window as any).electronAPI) {
                          (window as any).electronAPI.launchOrDownloadApp({
                            name: selectedApp?.name,
                            downloadUrl: (selectedApp as any)?.downloadUrl || 'https://github.com/phantomtroupe',
                            installerPath: (selectedApp as any)?.installerPath
                          }).then((res: any) => {
                            console.log("App Action Result:", res);
                          });
                        }
                      }}
                    >
                      ESTABELECER CONEXÃO
                    </button>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

          </motion.div>
        )}
      </AnimatePresence>

      {/* Side Buttons */}
      <button 
        className={`side-nav-node left-trigger ${isGlitching ? 'is-glitching' : ''}`} 
        onClick={() => {
          setShowHistory(false);
          setShowGuide(true);
          setGuidePage(1);
        }}
        aria-label="Welcome Guide / Enter Node"
      >
        <div className="side-scan-line" />
      </button>
      
      <button 
        className={`side-nav-node right-trigger ${isGlitching ? 'is-glitching' : ''}`}
        onClick={() => {
          setShowGuide(false);
          setShowHistory(true);
          setHistoryPage(1);
        }}
        aria-label="System Node / Enter Node"
      >
        <div className="side-scan-line" />
      </button>

      {/* Fraternidade Guide Overlay */}
      <AnimatePresence>
        {showGuide && (
          <motion.div 
            className="guide-overlay-container"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div 
              className="guide-inner-wrap" 
              style={{ padding: '40px' }}
            >

              <AnimatePresence mode="wait">
                {guidePage === 1 ? (
                  <motion.div
                    key="guide1"
                    initial={{ opacity: 0, x: 100 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -100 }}
                    transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
                    style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', transform: 'translateY(-10vh)' }}
                  >
                    <header className="guide-header-section" style={{ marginBottom: '30px' }}>
                      <h2 className="guide-heading">▽ 𝔸𝖖𝖚𝖎, 𝖓𝖆𝖉𝖆 𝖈𝖔𝖒𝖊𝖈̧𝖆 𝖕𝖔𝖗 𝖆𝖈𝖆𝖘𝖔 △</h2>
                    </header>

                    <div className="guide-unified-content" style={{ padding: '20px 0' }}>
                      <div className="guide-paragraph">
                        <p style={{ color: '#ff3366', textShadow: '0 0 15px rgba(255, 51, 102, 0.5)', fontSize: '2rem', marginBottom: '20px' }}>🕳️</p>
                        <p style={{ color: '#ff3366', textShadow: '0 0 15px rgba(255, 51, 102, 0.5)' }}>Se teus olhos cruzaram este ponto</p>
                        <p style={{ color: '#ff3366', textShadow: '0 0 15px rgba(255, 51, 102, 0.5)' }}>algo em ti já reconheceu o caminho</p>
                      </div>
                      
                      <div className="guide-paragraph">
                        <p style={{ color: '#ff3366', textShadow: '0 0 15px rgba(255, 51, 102, 0.5)' }}>A Phantom Troupe Fraternidade não nasce do mundo externo</p>
                        <p>mas do encontro entre o que pulsa dentro</p>
                        <p>e o que se manifesta fora</p>
                      </div>

                      <div className="guide-paragraph">
                        <p>Não há separação entre espírito e matéria</p>
                        <p>tudo que és, se expande</p>
                        <p>Tudo que sentes, se molda</p>
                        <p>Tudo que deseja, encontra forma</p>
                      </div>

                      <div className="guide-paragraph">
                        <p>Caminhamos sem exigir retorno</p>
                        <p>pois o verdadeiro movimento nasce do amor que não cobra</p>
                        <p>da bondade que não é vista</p>
                        <p>da entrega que não espera</p>
                      </div>
                    </div>

                    <button className="guide-page-btn btn-next" onClick={() => setGuidePage(2)} style={{ marginTop: '30px' }}>
                      AVANÇAR PÁGINA ▷
                    </button>
                  </motion.div>
                ) : (
                  <motion.div
                    key="guide2"
                    initial={{ opacity: 0, x: 100 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -100 }}
                    transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
                    style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', transform: 'translateY(-23vh)' }}
                  >
                    <button className="guide-page-btn btn-next" onClick={() => {
                        setShowGuide(false);
                        setShowHistory(true);
                        setHistoryPage(1);
                      }} style={{ marginBottom: '20px' }}>
                      AVANÇAR PARA NODE DO SISTEMA ▷
                    </button>

                    <div className="guide-unified-content" style={{ marginTop: '0px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                      <div className="guide-paragraph" style={{ marginBottom: '10px' }}>
                        <p style={{ color: '#ff3366', textShadow: '0 0 15px rgba(255, 51, 102, 0.5)' }}>Não existe separação entre você e o resto</p>
                        <p>O que você sente por dentro acaba aparecendo fora</p>
                        <p>cada pensamento, é semente do invisível</p>
                        <p>cada intenção, um traço do destino que virá</p>
                      </div>

                      <div className="guide-paragraph" style={{ marginBottom: '10px' }}>
                        <p>A realidade não é algo fixo</p>
                        <p>ela se curva ao olhar que insiste</p>
                        <p>e floresce na mente que acredita</p>
                        <p>e materializa para quem cria</p>
                      </div>

                      <div className="guide-paragraph" style={{ marginBottom: '10px' }}>
                        <p>A vida é um infinito, inefável mistério</p>
                        <p>Cada momento, um instante singular e revelador</p>
                        <p>O impossível vai se tornando questão de opinião.</p>
                      </div>

                      <div className="guide-manifest-integration" style={{ marginTop: '20px' }}>
                        <p style={{ color: '#ff3366', textShadow: '0 0 15px rgba(255, 51, 102, 0.5)', margin: 0, lineHeight: '1.4' }}>
                          Não somos obrigados, fazemos o que podemos oferecer<br />
                          todo coração é um coração, toda força é força, toda ferramenta é ferramenta
                        </p>
                        <p style={{ color: '#ff3366', textShadow: '0 0 15px rgba(255, 51, 102, 0.5)', fontSize: '2rem', marginTop: '15px', transform: 'translateY(-0.5vh)' }}>🖤</p>
                      </div>
                    </div>

                    <footer className="guide-footer-branding" style={{ marginTop: '10px', transform: 'translateY(-3vh)' }}>
                      <h2 className="guide-heading brand-sigil">▽ ℙ𝖍𝖆𝖓𝖙𝖔𝖒 𝕋𝖗𝖔𝖚𝖕𝖊 𝔽𝖗𝖆𝖙𝖊𝖗𝖓𝖎𝖉𝖆𝖉𝖊 △</h2>
                    </footer>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* History Guide Overlay */}
      <AnimatePresence>
        {showHistory && (
          <motion.div 
            className="guide-overlay-container history-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div 
              className="guide-inner-wrap" 
              style={{ padding: '40px' }}
            >

              <AnimatePresence mode="wait">
                {historyPage === 1 ? (
                  <motion.div
                    key="history1"
                    initial={{ opacity: 0, x: 100 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -100 }}
                    transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
                    style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', transform: 'translateY(-10vh)' }}
                  >
                    <header className="guide-header-section" style={{ marginBottom: '30px' }}>
                      <h2 className="guide-heading" style={{ color: '#ff3366', textShadow: '0 0 15px rgba(255, 51, 102, 0.5)' }}>▽ 𝕌𝖒 𝖊𝖘𝖕𝖆𝖈̧𝖔 𝖕𝖆𝖗𝖆 𝖈𝖔𝖓𝖊𝖈𝖙𝖆𝖗 𝖕𝖊𝖘𝖘𝖔𝖆𝖘 △</h2>
                    </header>

                    <div className="guide-unified-content" style={{ display: 'flex', flexDirection: 'column', gap: '8px', transform: 'translateY(-3vh)' }}>
                      <p style={{ color: '#ff3366', textShadow: '0 0 15px rgba(255, 51, 102, 0.5)', fontSize: '2rem', marginBottom: '10px', textAlign: 'center', filter: 'grayscale(100%) brightness(0.8)' }}>🌐</p>
                      
                      <div className="guide-paragraph" style={{ marginBottom: '8px' }}>
                        <p style={{ color: '#ff3366', textShadow: '0 0 15px rgba(255, 51, 102, 0.5)', margin: 0 }}>A Phantom Troupe Fraternidade é um projeto feito</p>
                        <p style={{ color: '#ff3366', textShadow: '0 0 15px rgba(255, 51, 102, 0.5)', margin: 0 }}>com amor, com inteligência e com muita dedicação</p>
                      </div>

                      <div style={{ transform: 'translateY(2.5vh)' }}>
                        <div className="guide-paragraph" style={{ marginBottom: '15px' }}>
                          <p>Cada pessoa contribui with o que sabe</p>
                          <p>aprende com o que o outro oferece</p>
                          <p>criando um ambiente saudável e divertido</p>
                        </div>
                      </div>

                      <div style={{ transform: 'translateY(4.2vh)' }}>
                        <div className="guide-paragraph" style={{ marginBottom: '15px' }}>
                          <p><span style={{ color: '#ff3366', textShadow: '0 0 15px rgba(255, 51, 102, 0.5)' }}>Criado por Anderson Moitinho</span>, nascido em São Paulo, Brasil</p>
                          <p>formado em Gestão de Tecnologia da Informação</p>
                          <p>e estudante de Psicologia, também atua como</p>
                          <p>terapeuta holístico, músico e designer</p>
                        </div>
                      </div>

                      <div style={{ transform: 'translateY(5.9vh)' }}>
                        <div className="guide-paragraph" style={{ marginBottom: '15px' }}>
                          <p><span style={{ color: '#ff3366', textShadow: '0 0 15px rgba(255, 51, 102, 0.5)' }}>Administrado por Chrystian Cesar</span>, nascido em São Paulo, Brasil</p>
                          <p>empresário e taxista, alguém que construiu sua</p>
                          <p>trajetória com disciplina e visão prática da vida</p>
                          <p>Aqui, todos têm o seu espaço</p>
                        </div>
                      </div>
                    </div>

                    <button className="guide-page-btn btn-next" onClick={() => setHistoryPage(2)} style={{ marginTop: '30px' }}>
                      AVANÇAR PÁGINA ▷
                    </button>
                  </motion.div>
                ) : (
                  <motion.div
                    key="history2"
                    initial={{ opacity: 0, x: 100 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -100 }}
                    transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
                    style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', transform: 'translateY(-23vh)' }}
                  >
                    <button className="guide-page-btn btn-next" onClick={() => setShowHistory(false)} style={{ marginBottom: '20px' }}>
                      AVANÇAR E CONCLUIR ▷
                    </button>

                    <div className="guide-unified-content" style={{ marginTop: '0px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                      <div className="guide-paragraph" style={{ marginBottom: '10px' }}>
                        <p style={{ color: '#ff3366', textShadow: '0 0 15px rgba(255, 51, 102, 0.5)' }}>Nada é obrigatório</p>
                        <p>e ninguém é cobrado para estar aqui</p>
                        <p>a fraternidade não exige dinheiro dos membros</p>
                        <p>apenas doações abertas.</p>
                      </div>

                      <div className="guide-paragraph" style={{ marginBottom: '10px' }}>
                        <p style={{ color: '#ff3366', textShadow: '0 0 15px rgba(255, 51, 102, 0.5)' }}>Não tem como objetivo lucrar</p>
                        <p>com quem participa, tudo é baseado</p>
                        <p>na colaboração e na troca de</p>
                        <p>conhecimento e vontade de crescer junto</p>
                      </div>

                      <div className="guide-paragraph" style={{ marginBottom: '10px' }}>
                        <p>A ideia nasceu da vontade se unir e</p>
                        <p>de transformar, funciona como uma rede de pessoas</p>
                        <p>que se ajudam no que podem</p>
                      </div>

                      <div className="guide-manifest-integration" style={{ marginTop: '20px' }}>
                        <p style={{ color: '#ff3366', textShadow: '0 0 15px rgba(255, 51, 102, 0.5)', margin: 0, lineHeight: '1.4' }}>
                          Não é sobre obrigação, é sobre contribuição<br />
                          não é sobre lucro, é sobre construção coletiva
                        </p>
                        <p style={{ color: '#ff3366', textShadow: '0 0 15px rgba(255, 51, 102, 0.5)', fontSize: '2rem', marginTop: '15px', transform: 'translateY(-0.5vh)', filter: 'grayscale(100%) brightness(1.5)' }}>🌍</p>
                      </div>
                    </div>

                    <footer className="guide-footer-branding" style={{ marginTop: '10px', transform: 'translateY(-3vh)' }}>
                      <h2 className="guide-heading" style={{ color: '#ff3366', textShadow: '0 0 15px rgba(255, 51, 102, 0.5)', fontSize: '1.67rem' }}>▽ ℙ𝖍𝖆𝖓𝖙𝖔𝖒 𝕋𝖗𝖔𝖚𝖕𝖊 𝔽𝖗𝖆𝖙𝖊𝖗𝖓𝖎𝖉𝖆𝖉𝖊 △</h2>
                    </footer>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Members & Participation Overlay */}
      <AnimatePresence>
        {showMembers && (
          <motion.div 
            className="guide-overlay-container members-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowMembers(false)}
          >
            <div 
              className="guide-inner-wrap" 
              style={{ padding: '40px', transform: 'translateY(-15vh)' }}
              onClick={e => e.stopPropagation()}
            >
              <button className="guide-power-node left-power" onClick={() => setShowMembers(false)} aria-label="Close Members">
                <div className="power-symbol"></div>
              </button>
              <button className="guide-power-node right-power" onClick={() => setShowMembers(false)} aria-label="Close Members">
                <div className="power-symbol"></div>
              </button>

              <header className="guide-header-section" style={{ marginBottom: '30px', textAlign: 'center' }}>
                <h2 className="guide-heading" style={{ color: '#ff3366', textShadow: '0 0 15px rgba(255, 51, 102, 0.5)' }}>▽ 𝕄𝖊𝖒𝖇𝖗𝖔𝖘, ℙ𝖆𝖗𝖈𝖊𝖎𝖗𝖔𝖘 𝖊 𝔸𝖒𝖎𝖌𝖔𝖘 △</h2>
              </header>

              <div className="guide-unified-content" style={{ display: 'flex', flexDirection: 'column', gap: '20px', alignItems: 'center', transform: 'translateY(-8vh)' }}>
                <button 
                  className="guide-page-btn" 
                  style={{ marginBottom: '10px', fontSize: '0.8rem', padding: '10px 20px', borderStyle: 'dashed' }}
                  onClick={() => setShowPending(true)}
                  title="Abrir Central de Requisições"
                >
                  <span style={{ fontSize: '1.2rem', marginRight: '8px', verticalAlign: 'middle' }}>🗲</span> 𝕊𝖔𝖑𝖎𝖈𝖎𝖙𝖆𝖈̧𝖔̃𝖊𝖘 ℙ𝖊𝖓𝖉𝖊𝖓𝖙𝖊𝖘
                </button>
                <div 
                  className="members-list" 
                  style={{ 
                    width: '100%', 
                    maxWidth: '500px', 
                    maxHeight: (typeof window !== 'undefined' && window.innerWidth <= 768) ? '320px' : '380px', 
                    overflowY: 'auto', 
                    paddingRight: '10px' 
                  }}
                >
                  {activeMembers.map((member, i) => (
                    <div key={i} className="member-card" style={{ border: '1px solid rgba(255, 51, 102, 0.3)', padding: '15px', marginBottom: '10px', borderRadius: '4px', background: 'rgba(255, 51, 102, 0.05)' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '5px' }}>
                        <p style={{ color: '#ff3366', margin: '0', textTransform: 'uppercase', fontSize: '0.9rem', letterSpacing: '2px' }}>{member.role}</p>
                        <span style={{ fontSize: '0.7rem', color: '#ff3366', border: '1px solid #ff3366', padding: '2px 8px', borderRadius: '12px' }}>{member.type}</span>
                      </div>
                      <h3 style={{ margin: 0, fontSize: '1.4rem' }}>{member.name}</h3>
                    </div>
                  ))}
                </div>

                <div className="participation-section" style={{ marginTop: '30px', textAlign: 'center', width: '100%' }}>
                  <p style={{ marginBottom: '20px' }}>Você sente que este é o seu caminho?<br />Venha construir conosco este novo ciclo.</p>
                  
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', alignItems: 'center', width: '100%', maxWidth: '300px', margin: '0 auto' }}>
                    <input 
                      type="text" 
                      placeholder="SEU NOME" 
                      value={joiningName}
                      onChange={e => setJoiningName(e.target.value)}
                      className="phantom-input center-text" 
                    />
                    <select
                      className="phantom-input center-text phantom-select" 
                      value={joiningRole}
                      onChange={e => setJoiningRole(e.target.value)}
                    >
                      <option value="" disabled>SELECIONE SUA FUNÇÃO</option>
                      {[
                        "Harmonizador", "Facilitador", "Conselheiro amoroso", "Acolhedor", "Mediador", "Mentor", 
                        "Guardião do Ambiente", "Coordenador de Estudos", "Cuidador Emocional", "Organizador", 
                        "Guardião de Valores", "Curador de Conteúdo", "Incentivador", "Observador", "Comunicador", 
                        "Conector", "Apoio Espiritual", "Guardião das amizades", "Facilitador de Cura", 
                        "Responsável por Parcerias", "Motivador", "Gestor de Projetos", "Cronista", 
                        "Responsável Social", "Instrutor", "Observador Individual", "Energizador", 
                        "Criador de Experiências", "Facilitador de Amizades", "Orientador de Relacionamentos", 
                        "Guardião da Simplicidade", "Guerreiro da Continuidade", "Gerenciador"
                      ].map(role => (
                        <option key={role} value={role}>{role}</option>
                      ))}
                    </select>
                    <select 
                      className="phantom-input center-text phantom-select" 
                      value={joiningType} 
                      onChange={e => setJoiningType(e.target.value)}
                    >
                      <option value="" disabled>SELECIONAR ESSÊNCIA</option>
                      <option value="Membro">Membro</option>
                      <option value="Parceiro">Parceiro</option>
                      <option value="Amigo">Amigo</option>
                      <option value="Doador">Doador</option>
                      <option value="Observador">Observador</option>
                    </select>
                    <button 
                      className="guide-page-btn btn-next"
                      style={{ marginTop: '5px', marginBottom: '5px' }}
                      onClick={() => {
                        if (joiningName.trim() && joiningRole.trim()) {
                          setPendingRequests(prev => [...prev, { name: joiningName, role: joiningRole, type: joiningType }]);
                          setJoiningName("");
                          setJoiningRole("");
                          // Optional feedback
                        }
                      }}
                    >
                      Deseja participar? ▷
                    </button>
                  </div>
                </div>
              </div>

              <footer className="guide-footer-branding" style={{ marginTop: '15px', transform: 'translateY(-8vh)' }}>
                <h2 className="guide-heading" style={{ color: '#ff3366', textShadow: '0 0 15px rgba(255, 51, 102, 0.5)', fontSize: '1.2rem' }}>▽ 𝕁𝖔𝖎𝖓 𝖙𝖍𝖊 ℙ𝖍𝖆𝖓𝖙𝖔𝖒 𝕋𝖗𝖔𝖚𝖕𝖊 △</h2>
              </footer>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Launch Warning Modal */}
      <AnimatePresence>
        {showLaunchWarning && (
          <motion.div 
            className="construction-modal-overlay"
            style={{ backgroundColor: 'rgba(0, 0, 0, 0.4)', backdropFilter: 'blur(10px)' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowLaunchWarning(false)}
          >
            <motion.div 
              className="construction-modal-content"
              style={{ background: 'rgba(10, 10, 10, 0.2)', border: '1px solid rgba(255, 255, 255, 0.1)', boxShadow: '0 0 30px rgba(0,0,0,0.5)' }}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="construction-modal-header">
                <span className="construction-warning">◈ COMUNICADO DE ACESSO ◈</span>
                <button className="construction-close-btn" onClick={() => setShowLaunchWarning(false)}>×</button>
              </div>
              <div className="construction-modal-body">
                <p style={{ fontSize: '1.1rem', color: '#fff', lineHeight: '1.6', textAlign: 'center', margin: '20px 0' }}>
                  A aplicação já está lançada e está em fase de testes, algumas coisas estão terminando de serem finalizadas para o lançamento oficial.
                </p>
              </div>
              <div className="construction-modal-footer">
                <button 
                  className="silver-btn" 
                  onClick={() => {
                    setShowLaunchWarning(false);
                    if (selectedApp) {
                      if (selectedApp.name === "ZD" || selectedApp.name === "ZE" || selectedApp.name === "ZFy") {
                        window.open(selectedApp.downloadUrl || "", "_blank");
                      } else if ((window as any).electronAPI) {
                        (window as any).electronAPI.launchOrDownloadApp({
                          name: selectedApp.name,
                          downloadUrl: (selectedApp as any).downloadUrl || 'https://github.com/phantomtroupe',
                          installerPath: (selectedApp as any).installerPath
                        });
                      } else {
                        // Fallback para versão web
                        window.open(selectedApp.downloadUrl || "", "_blank");
                      }
                    }
                  }}
                >
                  Tudo bem
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Cyber-Silver Construction Modal */}
      <AnimatePresence>
        {showConstructionModal && (
          <motion.div 
            className="construction-modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowConstructionModal(false)}
          >
            <motion.div 
              className="construction-modal-content"
              initial={{ scale: 0.8, y: 50, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.8, y: 50, opacity: 0 }}
              transition={{ type: "spring", damping: 20, stiffness: 200 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="construction-modal-header">
                <span className="construction-warning">⚠ AVISO DO SISTEMA</span>
                <button className="construction-close-btn" onClick={() => setShowConstructionModal(false)}>×</button>
              </div>
              <div className="construction-modal-body">
                <h3>MÓDULO EM FORJAMENTO</h3>
                <p>
                  A esfera <strong>{selectedApp?.fullName}</strong> ({selectedApp?.name}) encontra-se atualmente em fase de construção nas fornalhas da Phantom Troupe.
                </p>
                <div className="construction-progress">
                  <div className="progress-bar-bg">
                    <div className="progress-bar-fill"></div>
                  </div>
                  <span className="progress-eta">ETA: FINAL DE 2026</span>
                </div>
                <p className="construction-sub">Aguarde. A integração neural completa será estabelecida em breve.</p>
              </div>
              <div className="construction-modal-footer">
                <button className="silver-btn" onClick={() => setShowConstructionModal(false)}>RECONHECIDO</button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Pending Requests Overlay */}
      <AnimatePresence>
        {showPending && (
          <motion.div 
            className="guide-overlay-container members-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowPending(false)}
            style={{ zIndex: 12000 }}
          >
            <div 
              className="guide-inner-wrap" 
              style={{ padding: '40px', transform: 'translateY(-15vh)' }}
              onClick={e => e.stopPropagation()}
            >
              <button className="guide-power-node right-power" onClick={() => setShowPending(false)} aria-label="Close Pending">
                <div className="power-symbol"></div>
              </button>

              <header className="guide-header-section" style={{ marginBottom: '30px', textAlign: 'center' }}>
                <h2 className="guide-heading" style={{ color: '#ff3366', textShadow: '0 0 15px rgba(255, 51, 102, 0.5)' }}>▽ 𝕊𝖔𝖑𝖎𝖈𝖎𝖙𝖆𝖈̧𝖔̃𝖊𝖘 ℙ𝖊𝖓𝖉𝖊𝖓𝖙𝖊𝖘 △</h2>
              </header>

              <div className="guide-unified-content" style={{ display: 'flex', flexDirection: 'column', gap: '20px', alignItems: 'center' }}>
                {!isAdminAuth ? (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', alignItems: 'center', width: '100%', maxWidth: '300px' }}>
                    <p style={{ color: '#ff3366', letterSpacing: '2px', fontSize: '0.9rem' }}>ACESSO RESTRITO</p>
                    <input 
                      type="text" 
                      placeholder="ADMIN ID" 
                      value={adminUser}
                      onChange={e => setAdminUser(e.target.value)}
                      className="phantom-input" 
                    />
                    <input 
                      type="password" 
                      placeholder="SENHA DE ACESSO" 
                      value={adminPass}
                      onChange={e => setAdminPass(e.target.value)}
                      className="phantom-input" 
                      onKeyDown={e => {
                        if (e.key === 'Enter') {
                          if (adminUser === "PhantomTroupeFraternidade" && adminPass === "0PTPhantomTroupeFraternidadePT0") {
                            setIsAdminAuth(true);
                            setAuthError(false);
                            setAdminUser("");
                            setAdminPass("");
                          } else {
                            setAuthError(true);
                          }
                        }
                      }}
                    />
                    <button 
                      className="guide-page-btn"
                      onClick={() => {
                        if (adminUser === "PhantomTroupeFraternidade" && adminPass === "0PTPhantomTroupeFraternidadePT0") {
                          setIsAdminAuth(true);
                          setAuthError(false);
                          setAdminUser("");
                          setAdminPass("");
                        } else {
                          setAuthError(true);
                        }
                      }}
                    >
                      AUTENTICAR ▷
                    </button>
                    {authError && <span style={{ color: '#ff3366', fontSize: '0.8rem', letterSpacing: '1px' }}>CREDENCIAS INVÁLIDAS</span>}
                  </div>
                ) : (
                  <>
                    {pendingRequests.length === 0 ? (
                      <p style={{ color: '#a0a0a0', letterSpacing: '2px' }}>NENHUMA SOLICITAÇÃO ENCONTRADA</p>
                    ) : (
                      <div className="members-list" style={{ width: '100%', maxWidth: '500px' }}>
                        {pendingRequests.map((req, i) => (
                          <div key={i} className="member-card" style={{ border: '1px solid rgba(255, 51, 102, 0.3)', padding: '15px', marginBottom: '10px', borderRadius: '4px', background: 'rgba(255, 51, 102, 0.05)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <div>
                              <div style={{ display: 'flex', gap: '10px', alignItems: 'center', marginBottom: '5px' }}>
                                <p style={{ color: '#ff3366', margin: '0', textTransform: 'uppercase', fontSize: '0.9rem', letterSpacing: '2px' }}>{req.role}</p>
                                <span style={{ fontSize: '0.7rem', color: '#ff3366', border: '1px solid #ff3366', padding: '2px 6px', borderRadius: '4px' }}>{req.type}</span>
                              </div>
                              <h3 style={{ margin: 0, fontSize: '1.4rem' }}>{req.name}</h3>
                            </div>
                            <button 
                              className="silver-btn" 
                              style={{ padding: '8px 20px', fontSize: '0.8rem' }}
                              onClick={() => {
                                setActiveMembers(prev => [...prev, req]);
                                setPendingRequests(prev => prev.filter((_, idx) => idx !== i));
                              }}
                            >
                              ACEITAR
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>


    </main>
  );
}
