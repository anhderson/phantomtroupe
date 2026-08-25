'use client';
// Force re-compile to fix 404 issue
import Image from "next/image";
import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence, useMotionValue, useAnimationFrame, animate, useTransform } from "framer-motion";

const APPS = [
  { 
    id: 1, 
    name: "PT", 
    fullName: "Phantom Troupe - Fraternidade ONG", 
    subName: "Fraternidade ONG",
    color: "#FF007F", 
    desc: "Orquestrador principal da rede neural.",
    longDesc: 'O Phantom Troupe é o coração de todo o ecossistema.\n\nAntes dos aplicativos, dos projetos, das plataformas e das ideias, existem pessoas.\n\nPessoas reais, com histórias reais.\n\nO Phantom Troupe nasce como uma fraternidade e comunidade para pessoas que, por diferentes motivos, sentem que estão fora dos círculos tradicionais de convivência.\n\nPessoas que enfrentam dificuldades na vida.\n\nPessoas com deficiência.\n\nPessoas solitárias.\n\nPessoas carentes de vínculos.\n\nPessoas com dificuldades emocionais ou sociais.\n\nPessoas que simplesmente nunca encontraram um grupo onde pudessem ser elas mesmas.\n\nAqui, ninguém precisa chegar pronto.\n\nNinguém precisa ter uma história impressionante.\n\nNinguém precisa provar que merece pertencer.\n\nA proposta é simples: criar vínculos humanos e permitir que pessoas se fortaleçam mutuamente.\n\nO Phantom Troupe funciona como a comunidade central do Universo Zero.\n\nÉ onde ideias nascem.\n\nOnde projetos encontram pessoas.\n\nOnde participantes podem se tornar colaboradores.\n\nOnde alguém que entrou procurando acolhimento pode, no futuro, ajudar a acolher outra pessoa.\n\nOnde alguém que começou perdido pode encontrar uma função, uma amizade ou uma nova direção.\n\nAtravés de grupos, comunidades, encontros digitais, projetos colaborativos e iniciativas sociais, o Phantom Troupe busca construir algo que muitas pessoas passam a vida procurando:\n\num sentimento de pertencimento.\n\nNão porque todos são iguais.\n\nMas porque ninguém precisa atravessar tudo sozinho.\n\nPhantom Troupe — Pessoas diferentes. Histórias diferentes. Um lugar para construir algo juntos.',
    tech: "JS, Java, Json, md, png, svg, html, css",
    status: "OPERACIONAL",
    security: "GENESIS",
    icon: "/icones/phantomtroupeiconecircular.png"
  },
  { 
    id: 2, 
    name: "PZ", 
    fullName: "Project Zero - EU SOU", 
    subName: "EU SOU",
    desc: "A forja onde novos desígnios nascem.",
    longDesc: 'Criar também é uma forma de existir.\n\nNem todas as pessoas conseguem explicar aquilo que sentem.\n\nÀs vezes, uma música explica melhor.\n\nÀs vezes, um texto.\n\nUm desenho.\n\nUma poesia.\n\nUma fotografia.\n\nUma ideia inacabada.\n\nO Project Zero nasce como um espaço para expressão, criatividade e desenvolvimento coletivo.\n\nUm lugar onde pessoas podem compartilhar aquilo que criam e descobrir aquilo que outras pessoas têm para ensinar.\n\nAqui, não importa apenas o resultado final.\n\nO processo também importa.\n\nO Project Zero reúne artistas, estudantes, profissionais, iniciantes, curiosos e pessoas que simplesmente desejam experimentar algo novo.\n\nAlguém pode ensinar música.\n\nOutra pessoa pode compartilhar poesia.\n\nOutra pode aprender desenho.\n\nOutra pode encontrar coragem para publicar, pela primeira vez, algo que sempre guardou apenas para si.\n\nA proposta é criar uma comunidade onde aprender, ensinar e compartilhar aconteçam de maneira mais leve e humana.\n\nSem a necessidade de ser especialista para começar.\n\nSem a obrigação de ser perfeito para mostrar.\n\nSem transformar toda criação em competição.\n\nO Project Zero acredita que criatividade não deve existir apenas para receber aprovação.\n\nEla também pode servir para conectar pessoas.\n\nPara compreender sentimentos.\n\nPara preservar histórias.\n\nPara descobrir talentos.\n\nE, principalmente, para permitir que alguém diga:\n\n"Isso também faz parte de quem eu sou."\n\nProject Zero — Eu Sou. Eu crio. Eu compartilho.',
    tech: "JS, Java, Json, md, png, svg, html, css",
    status: "TECENDO O DESTINO",
    security: "ARCANO",
    downloadUrl: "https://github.com/0PhantomTroupe0/phantomtroupe/releases/download/v1.0.0/Project.Zero.Setup.1.0.5.exe",
    installerPath: "src/executaveis/Project Zero Setup 1.0.5.exe",
    icon: "/icones/projectzeroiconecircular.png"
  },
  { 
    id: 3, 
    name: "ZS", 
    fullName: "Zero Signal - SUSSURRANDO", 
    subName: "SUSSURRANDO",
    desc: "O espaço genuíno que surge do nada.",
    longDesc: 'Às vezes, tudo o que alguém precisa é de companhia.\n\nNem toda conexão precisa começar com uma grande conversa.\n\nÀs vezes, duas pessoas só querem passar algum tempo juntas.\n\nConversar sobre coisas aleatórias.\n\nDesenhar ao mesmo tempo.\n\nJogar.\n\nAssistir alguma coisa.\n\nCompartilhar uma música.\n\nOu simplesmente ter alguém presente do outro lado.\n\nO Zero Signal, também chamado de Sussurrando, nasce para essas conexões menores e mais espontâneas.\n\nUm ambiente pensado para conhecer pessoas sem a pressão de impressionar ninguém.\n\nSem a obrigação de transformar toda conversa em relacionamento.\n\nSem a necessidade de fingir uma personalidade para ser aceito.\n\nA proposta é simples: criar oportunidades para que pessoas possam se encontrar, conversar e compartilhar momentos.\n\nO Zero Signal valoriza o respeito, a leveza e a aceitação.\n\nPorque, para muitas pessoas, o primeiro passo para uma amizade não é encontrar alguém extraordinário.\n\nÉ simplesmente encontrar alguém disposto a ficar.\n\nMesmo que seja apenas por uma conversa.\n\nZero Signal — Algumas conexões começam apenas com um sinal.',
    tech: "JS, Java, Json, md, png, svg, html, css",
    status: "BRUTO & REAL",
    security: "VOCÊ MESMO",
    downloadUrl: "https://github.com/0PhantomTroupe0/phantomtroupe/releases/download/v1.0.11/Zero.Signal.Setup.1.0.11.exe",
    mobileDownloadUrl: "https://github.com/0PhantomTroupe0/phantomtroupe/releases/download/v1.0.22/ZeroSignal_v1.0.22.apk",
    installerPath: "src/executaveis/Zero Signal Setup 1.0.11.exe",
    icon: "/icones/zerosignaliconecircular.png"
  },
  { 
    id: 4, 
    name: "ZD", 
    fullName: "Zero Day - SERENIZANDO", 
    subName: "SERENIZANDO",
    desc: "A antítese das redes sociais.",
    longDesc: 'Um lugar onde você não precisa parecer perfeito.\n\nAs redes sociais ensinaram muitas pessoas a mostrar apenas uma versão editada da própria vida.\n\nO momento bonito.\n\nA conquista.\n\nO sorriso.\n\nA resposta certa.\n\nMas a vida real também possui dúvidas, fracassos, confusões, medos e processos que ainda não terminaram.\n\nO Zero Day surge em uma direção diferente.\n\nUma rede social onde não existe a necessidade de transformar a própria existência em uma vitrine.\n\nOnde uma ideia pode estar incompleta.\n\nOnde um pensamento pode mudar.\n\nOnde uma experiência não precisa ser bonita para ser verdadeira.\n\nO Zero Day valoriza a expressão humana antes da aparência.\n\nA vulnerabilidade antes da performance.\n\nO processo antes da perfeição.\n\nIsso não significa transformar o sofrimento em espetáculo.\n\nSignifica reconhecer que pessoas reais possuem dias bons e ruins, certezas e dúvidas, avanços e retrocessos.\n\nA proposta é criar um ambiente mais sereno, onde as pessoas possam compartilhar ideias, experiências e sentimentos sem carregar constantemente a pressão de corresponder a expectativas externas.\n\nUm lugar para respirar.\n\nPara desacelerar.\n\nE lembrar que estar em construção não significa estar quebrado.\n\nZero Day — Você não precisa estar pronto para existir.',
    tech: "JS, Java, Json, md, png, svg, html, css",
    status: "SENTIMENTO ATIVO",
    security: "VULNERÁVEL",
    downloadUrl: "https://zeroday-chi.vercel.app",
    icon: "/icones/zerodayiconecircular.png"
  },
  { 
    id: 5, 
    name: "ZE", 
    fullName: "Zero Espaço - SENTIMENTALIZANDO", 
    subName: "SENTIMENTALIZANDO",
    desc: "Santuário digital de cura e sentimento.",
    longDesc: 'Um espaço para sentir sem precisar se defender.\n\nExistem sentimentos que as pessoas escondem porque têm medo da reação dos outros.\n\nMedo de parecer fraco.\n\nExagerado.\n\nConfuso.\n\nSensível demais.\n\nO Zero Espaço nasce como um ambiente dedicado à expressão emocional, reflexão e acolhimento comunitário.\n\nUm lugar onde experiências, pensamentos e sentimentos podem ser registrados e compartilhados com mais consciência e segurança.\n\nA proposta não é dizer às pessoas como elas devem sentir.\n\nÉ ajudá-las a criar espaço para compreender aquilo que já estão sentindo.\n\nNo Zero Espaço, o usuário pode acompanhar processos pessoais, identificar padrões, organizar memórias e refletir sobre comportamentos e experiências.\n\nMas existe também a dimensão coletiva.\n\nPessoas podem encontrar outras pessoas.\n\nDescobrir que não são as únicas passando por determinada situação.\n\nConstruir vínculos baseados em empatia.\n\nEncontrar acolhimento.\n\nE, ao mesmo tempo, aprender a oferecer acolhimento.\n\nO Sentimentalizando acredita que sentimentos não precisam ser ignorados para que alguém siga em frente.\n\nMuitas vezes, é justamente quando conseguimos olhar para eles que começamos a entender qual caminho queremos seguir.\n\nZero Espaço — Sentir também é uma forma de se conhecer.',
    tech: "JS, Java, Json, md, png, svg, html, css",
    status: "EM PAZ",
    security: "SAGRADO",
    downloadUrl: "https://paginaterapeutaanderson.vercel.app",
    icon: "/icones/zeroespacoiconecircular.png"
  },
  { 
    id: 6, 
    name: "ZFy", 
    fullName: "Zero Faithfully - ESPIRITUALIZANDO", 
    subName: "ESPIRITUALIZANDO",
    desc: "O templo de autocompreensão e desenvolvimento de crenças.",
    longDesc: 'Conhecer antes de acreditar.\n\nO mundo possui inúmeras crenças, religiões, filosofias e formas de interpretar a existência.\n\nMuitas vezes, porém, as pessoas aprendem sobre essas diferenças através do medo, do preconceito ou da desinformação.\n\nO Zero FaithFully nasce como um espaço aberto ao conhecimento e à exploração consciente.\n\nUma plataforma para leitura, compartilhamento e divulgação gratuita de conteúdos relacionados à espiritualidade, religiões, filosofia, história, conflitos, culturas e autoconhecimento.\n\nO objetivo não é determinar qual caminho uma pessoa deve seguir.\n\nÉ oferecer conhecimento para que cada pessoa possa refletir melhor sobre os próprios caminhos.\n\nAqui, diferentes perspectivas podem coexistir.\n\nPorque compreender uma ideia não significa necessariamente concordar com ela.\n\nConhecer uma religião não obriga alguém a segui-la.\n\nEstudar uma filosofia não exige abandonar outra.\n\nO Zero FaithFully acredita que conhecimento pode diminuir distâncias.\n\nQue perguntas podem ser mais importantes do que respostas prontas.\n\nE que espiritualidade também pode ser um espaço de reflexão, sensibilidade e evolução pessoal.\n\nZero FaithFully — Diferentes caminhos. Uma busca consciente.',
    tech: "JS, Java, Json, md, png, svg, html, css",
    status: "PROJETANDO CAMINHOS",
    security: "OCULTO NA VERDADE",
    downloadUrl: "https://zerofaithfully.vercel.app",
    icon: "/icones/zerofaithfullyiconecircular.png"
  },
  { 
    id: 7, 
    name: "ZSy", 
    fullName: "Zero Synapses - LUZ E SOMBRA", 
    subName: "LUZ E SOMBRA",
    desc: "A inteligência isolada que julga pelo Todo.",
    longDesc: 'Para quem quer se conectar, mas nem sempre sabe como.\n\nExistem pessoas que desejam fazer parte de algo, mas não conseguem se encaixar nos modelos tradicionais de convivência.\n\nPessoas reservadas.\n\nAntissociais.\n\nObservadoras.\n\nPessoas que preferem trabalhar nos bastidores.\n\nQue conseguem se comunicar melhor através de tarefas do que através de conversas.\n\nQue possuem habilidades, ideias e capacidade, mas não sabem onde encontrar um espaço para utilizar tudo isso.\n\nO Zero Synapses nasce para essas pessoas.\n\nSua proposta é criar caminhos de participação para quem normalmente ficaria de fora.\n\nNão obrigando ninguém a se tornar extremamente sociável.\n\nMas criando formas alternativas de conexão.\n\nAlguém pode começar participando apenas de uma tarefa.\n\nDepois ajudar em um projeto.\n\nDepois conhecer outras pessoas.\n\nDepois descobrir uma habilidade.\n\nE, talvez, encontrar uma área onde realmente se sinta útil.\n\nO Zero Synapses conecta pessoas aos bastidores e à construção do próprio Universo Zero.\n\nDesenvolvimento.\n\nAdministração.\n\nPlanejamento.\n\nTecnologia.\n\nModeração.\n\nCriação.\n\nPesquisa.\n\nOrganização.\n\nProjetos sociais.\n\nCada pessoa pode contribuir de acordo com suas possibilidades e características.\n\nPorque socializar não precisa significar ser igual a todo mundo.\n\nAlgumas amizades começam em uma conversa.\n\nOutras começam trabalhando juntos.\n\nZero Synapses — Você pode ser reservado e, ainda assim, fazer parte de algo grande.',
    tech: "JS, Java, Json, md, png, svg, html, css",
    status: "CALCULANDO O BEM MAIOR",
    security: "100% ISOLADO",
    icon: "/icones/zerosynapsesiconecircular.png"
  },
  { 
    id: 8, 
    name: "ZM", 
    fullName: "Zero Mind", 
    subName: "Zero Mind",
    desc: "O ateliê absoluto de reset mental e imersão artística.",
    longDesc: "O Zero Mind é um ambiente projetado para estimular a expressão criativa e a imersão total no momento presente. Funcionando como um portal de escape das pressões racionais e estruturais do dia a dia, ele convida o usuário a desacelerar padrões automáticos e explorar a mente de forma mais livre, intuitiva e sensível.\n\nA plataforma oferece um ecossistema multifacetado voltado à criação espontânea. Nele, é possível compor melodias, desenvolver sons, utilizar um quadro de pintura livre para transformar emoções em formas visuais, além de registrar pensamentos, crônicas, poemas e reflexões pessoais. Cada recurso foi pensado para permitir que ideias fluam sem barreiras, priorizando autenticidade e experiência sobre técnica ou validação externa.\n\nUm dos diferenciais do Zero Mind é a integração entre todas essas expressões. Sons, imagens e palavras se conectam em um fluxo coletivo, onde criações individuais passam a dialogar entre si, formando uma rede viva de percepções e sentimentos. O resultado é um ambiente dinâmico e colaborativo, que amplia a criatividade e promove uma conexão mais profunda entre as mentes que compartilham esse espaço.",
    tech: "JS, Java, Json, md, png, svg, html, css",
    status: "SINTONIZADO NO AGORA",
    security: "ARTE COMPARTILHADA",
    icon: "/icones/zeromindiconecircular.png"
  },
  { 
    id: 9, 
    name: "ZI", 
    fullName: "Zero Infinity", 
    subName: "Zero Infinity",
    desc: "A singularidade onde ideias se materializam.",
    longDesc: "O Zero Infinity é o ambiente de criação mais expansivo do ecossistema, projetado para transformar ideias em possibilidades concretas sem limitações rígidas. Ele funciona como um espaço onde conceitos abstratos, projetos digitais e iniciativas físicas podem ser desenvolvidos de forma integrada, conectando imaginação, experimentação e execução.\n\nMais do que um laboratório criativo, o Zero Infinity incentiva a exploração livre de ideias, desde reflexões filosóficas até o desenvolvimento de soluções práticas, protótipos e sistemas reais. Aqui, cada projeto pode evoluir de forma progressiva, passando da concepção inicial para testes, validações e aplicações no mundo concreto.\n\nO ambiente é estruturado para apoiar diferentes tipos de criação, permitindo experimentos empíricos, desenvolvimento tecnológico e inovação contínua. Ao mesmo tempo, mantém um fluxo aberto e dinâmico, onde novas ideias surgem, se conectam e se expandem sem barreiras desnecessárias.\n\nNa prática, o Zero Infinity representa o ponto onde a criatividade encontra execução, oferecendo liberdade para criar sem limites, mas com base suficiente para transformar qualquer conceito em algo aplicável, funcional e em constante evolução.",
    tech: "JS, Java, Json, md, png, svg, html, css",
    status: "MOLDE INFINITO",
    security: "ALQUIMIA",
    installerPath: "src/executaveis/Zero Infinity Setup 1.0.0.exe",
    icon: "/icones/zeroinfinityiconecircular.png"
  },
  { 
    id: 10, 
    name: "ZP", 
    fullName: "Zero Pay", 
    subName: "Zero Pay",
    desc: "Sistema de pagamentos e finanças descentralizadas.",
    longDesc: "O Zero Pay é a infraestrutura financeira que sustenta todo o ecossistema Phantom Troupe, garantindo que transações ocorram com eficiência, segurança e fluidez. Ele foi projetado para centralizar e organizar operações financeiras, oferecendo suporte completo para diferentes formas de pagamento e movimentação de recursos.\n\nA plataforma integra carteiras digitais, processamento de transações e gestão de contratos financeiros em um único ambiente, permitindo que usuários e projetos operem com praticidade e controle. Com suporte a criptoativos, PIX e redes internacionais, o Zero Pay amplia o alcance das operações, facilitando conexões financeiras tanto locais quanto globais.\n\nAlém da velocidade nas transações, o sistema prioriza segurança e confiabilidade, utilizando mecanismos robustos para proteção de dados e validação de operações. Isso garante não apenas agilidade, mas também estabilidade em todas as movimentações dentro da rede.\n\nNa prática, o Zero Pay atua como a base econômica do ecossistema, conectando pessoas, projetos e oportunidades por meio de uma estrutura financeira moderna, integrada e preparada para acompanhar o crescimento contínuo da plataforma.",
    tech: "JS, Java, Json, md, png, svg, html, css",
    status: "TRANSAÇÃO ATIVA",
    security: "FINANCEIRO",
    icon: "/icones/zeropayiconecircular.png"
  },
  { 
    id: 11, 
    name: "ZC", 
    fullName: "Zero Control", 
    subName: "Zero Control",
    desc: "Central tática de missões e recompensas.",
    longDesc: "O Zero Control é o painel central de operações do ecossistema, onde todas as oportunidades e direções disponíveis são organizadas de forma clara e acessível. Ele funciona como um mural unificado que reúne as Missões (Quests) relacionadas a cada um dos 12 sistemas, permitindo que o usuário visualize caminhos e escolha como deseja atuar dentro da rede.\n\nNesse ambiente, é possível assumir diferentes tipos de atividades, desde tarefas digitais até ações práticas no mundo real. As missões variam entre iniciativas voluntárias, voltadas ao fortalecimento e crescimento coletivo da Phantom Troupe, e oportunidades remuneradas, focadas em retorno individual e desenvolvimento pessoal.\n\nO sistema não impõe escolhas, apenas apresenta possibilidades. Cabe a cada usuário decidir como deseja se posicionar — contribuindo com o coletivo, buscando crescimento próprio ou equilibrando ambos os caminhos. O Zero Control, assim, organiza a ação dentro do ecossistema, oferecendo direção sem limitar a liberdade, e transformando decisões em movimentos concretos dentro da rede.",
    tech: "JS, Java, Json, md, png, svg, html, css",
    status: "AGUARDANDO DECLARAÇÃO",
    security: "LIVRE ESCOLHA",
    icon: "/icones/zerocontroliconecircular.png"
  },
  { 
    id: 12, 
    name: "ZG", 
    fullName: "Zero Ground", 
    subName: "Zero Ground",
    desc: "Portal de acesso terminal.",
    longDesc: "O Zero Ground é o módulo responsável por conectar o ecossistema digital ao mundo físico, transformando ideias e estruturas virtuais em iniciativas concretas. Ele atua como a base para criação e desenvolvimento de espaços reais, que vão desde organizações sociais e ONGs até empresas e operações estruturadas.\n\nMais do que um ponto de execução, o Zero Ground funciona como a interface direta com o “hardware” do mundo real, onde projetos ganham presença física, operação prática e impacto tangível. Ele organiza processos, acompanha atividades e registra informações essenciais, permitindo controle mais preciso sobre cada etapa de implementação.\n\nAlém disso, o sistema oferece uma visão detalhada das operações, com registros de baixo nível e monitoramento contínuo, garantindo que recursos, processos e estruturas estejam funcionando de forma estável e eficiente. Isso possibilita ajustes rápidos, maior previsibilidade e segurança na execução.\n\nNa prática, o Zero Ground é onde o ecossistema deixa de ser apenas conceito e passa a existir de forma concreta, conectando planejamento, tecnologia e ação real em um fluxo contínuo de construção e evolução.",
    tech: "JS, Java, Json, md, png, svg, html, css",
    status: "ESPERANDO COMANDO",
  },
];

const WEB_LAYERS = 12;

const resizeImage = (file: File): Promise<string> => {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new window.Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const MAX_WIDTH = 400;
        const MAX_HEIGHT = 400;
        let width = img.width;
        let height = img.height;

        if (width > height) {
          if (width > MAX_WIDTH) {
            height *= MAX_WIDTH / width;
            width = MAX_WIDTH;
          }
        } else {
          if (height > MAX_HEIGHT) {
            width *= MAX_HEIGHT / height;
            height = MAX_HEIGHT;
          }
        }
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.drawImage(img, 0, 0, width, height);
        }
        resolve(canvas.toDataURL('image/jpeg', 0.7));
      };
      img.src = e.target?.result as string;
    };
    reader.readAsDataURL(file);
  });
};

export default function Home() {
  const [selectedApp, setSelectedApp] = useState<typeof APPS[0] | null>(null);
  const [rotation, setRotation] = useState(0);
  const [isMounted, setIsMounted] = useState(false);
  const [showWorldometer, setShowWorldometer] = useState(false);
  const [showGeneralNews, setShowGeneralNews] = useState(false);
  const [generalNewsList, setGeneralNewsList] = useState<{id: string, date: string, title: string, content: string}[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('phantom_general_news');
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch (e) {
          console.error(e);
        }
      }
    }
    return [
      { id: '1', date: '24/08/2026', title: 'Boas-vindas ao Universo Zero', content: 'Início da nova jornada coletiva. Este espaço foi desenhado para conectar propósitos e criar de forma descentralizada.' },
      { id: '2', date: '23/08/2026', title: 'Integração dos 12 Módulos', content: 'Todos os 12 botões e projetos da constelação foram vinculados com sucesso ao núcleo central.' }
    ];
  });
  const [newNewsTitle, setNewNewsTitle] = useState("");
  const [newNewsContent, setNewNewsContent] = useState("");
  const [showAdminLoginInNews, setShowAdminLoginInNews] = useState(false);

  useEffect(() => {
    localStorage.setItem('phantom_general_news', JSON.stringify(generalNewsList));
  }, [generalNewsList]);

  const [isLocked, setIsLocked] = useState(false);
  const [isGlitching, setIsGlitching] = useState(false);
  const [showConstructionModal, setShowConstructionModal] = useState(false);
  const [showLaunchWarning, setShowLaunchWarning] = useState(false);
  const [joiningName, setJoiningName] = useState("");
  const [joiningRoles, setJoiningRoles] = useState<string[]>([]);
  const [joiningType, setJoiningType] = useState("");
  const [pendingRequests, setPendingRequests] = useState<{name: string, role: string, type: string}[]>([]);
  const [hasRequestedJoin, setHasRequestedJoin] = useState(false);
  
  // Donations State
  const [showDonations, setShowDonations] = useState(false);
  const [donorName, setDonorName] = useState("");
  const [donorContact, setDonorContact] = useState("");
  const [donationType, setDonationType] = useState("");
  const [donationTitle, setDonationTitle] = useState("");
  const [donationItems, setDonationItems] = useState("");
  const [donationTestimonial, setDonationTestimonial] = useState("");
  const [donationImage, setDonationImage] = useState<string | null>(null);
  const [copiedPix, setCopiedPix] = useState(false);
  const [pendingDonations, setPendingDonations] = useState<{
    name: string;
    contact: string;
    type: string;
    title: string;
    items: string;
    testimonial: string;
    image: string | null;
  }[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('phantom_pending_donations');
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          return parsed.map((item: any) => ({
            name: item.name || "",
            contact: item.contact || "",
            type: item.type || "",
            title: item.title || "Doação Registrada",
            items: item.items || item.details || "",
            testimonial: item.testimonial || "",
            image: item.image || null
          }));
        } catch (e) {
          console.error(e);
        }
      }
    }
    return [];
  });
  const [hasRequestedDonation, setHasRequestedDonation] = useState(false);

  const initialAndersonDonation = {
    id: 'anderson_1',
    date: '25/08/2026',
    name: 'Anderson Costa Moitinho',
    contact: '47863135800',
    type: 'Apoio Financeiro (PIX)',
    title: 'Doação PIX R$ 100,00',
    items: 'Doação financeira no valor de R$ 100,00 via PIX para fortalecimento dos projetos.',
    testimonial: 'Contribuição para o fortalecimento dos projetos e expansão da Phantom Troupe!',
    image: null
  };

  const [donationsList, setDonationsList] = useState<{
    id: string;
    date: string;
    name: string;
    contact: string;
    type: string;
    title: string;
    items: string;
    testimonial: string;
    image: string | null;
  }[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('phantom_donations');
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          const fakeNames = ['Aline Souza', 'Carlos Mendes', 'Mariana Costa'];
          const fakeTitles = ['Teclado Yamaha', 'Computadores Desktop', 'Apoio Mensal PIX'];
          let cleanList = parsed
            .filter((item: any) => 
              item.id !== '1' && 
              item.id !== '2' && 
              item.id !== '3' && 
              !fakeNames.includes(item.name) && 
              !fakeTitles.includes(item.title)
            )
            .map((item: any) => ({
              id: item.id || Date.now().toString(),
              date: item.date || new Date().toLocaleDateString('pt-BR'),
              name: item.name || "",
              contact: item.contact || "",
              type: item.type || "",
              title: item.title || "Doação Registrada",
              items: item.items || item.details || "",
              testimonial: item.testimonial || "",
              image: item.image || null
            }));

          const hasAnderson = cleanList.some((item: any) => item.name.includes('Anderson'));
          if (!hasAnderson) {
            cleanList = [initialAndersonDonation, ...cleanList];
          }
          localStorage.setItem('phantom_donations', JSON.stringify(cleanList));
          return cleanList;
        } catch (e) {
          console.error(e);
        }
      }
    }
    return [initialAndersonDonation];
  });

  const [newsTab, setNewsTab] = useState<'select' | 'news' | 'records'>('select');

  // Donations History (all attempts with their status)
  const [donationsHistory, setDonationsHistory] = useState<{
    name: string;
    contact: string;
    type: string;
    title: string;
    items: string;
    testimonial: string;
    image: string | null;
    status: 'approved' | 'rejected';
    date: string;
  }[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('phantom_donations_history');
      if (saved) {
        try { 
          const parsed = JSON.parse(saved);
          const hasAnderson = parsed.some((item: any) => item.name.includes('Anderson'));
          if (!hasAnderson) {
            return [{ ...initialAndersonDonation, status: 'approved' as const }, ...parsed];
          }
          return parsed;
        } catch (e) { console.error(e); }
      }
    }
    return [{ ...initialAndersonDonation, status: 'approved' as const }];
  });
  const [showDonationsHistory, setShowDonationsHistory] = useState(false);
  const [showPublishedDonations, setShowPublishedDonations] = useState(false);

  useEffect(() => {
    localStorage.setItem('phantom_pending_donations', JSON.stringify(pendingDonations));
  }, [pendingDonations]);

  useEffect(() => {
    localStorage.setItem('phantom_donations', JSON.stringify(donationsList));
  }, [donationsList]);

  useEffect(() => {
    localStorage.setItem('phantom_donations_history', JSON.stringify(donationsHistory));
  }, [donationsHistory]);

  const [activeMembers, setActiveMembers] = useState<{name: string, role: string, type: string}[]>([
    { role: 'Fundador', name: 'Anderson Moitinho', type: 'Membro' },
    { role: 'Administrador', name: 'Chrystian Cesar', type: 'Membro' },
    { role: 'Mediadora', name: 'Sara Brandes', type: 'Membro' },
    { role: 'Facilitador de Cura', name: 'Sara Ellen', type: 'Amigo' },
    { role: 'Administrador', name: 'Raphael Braga', type: 'Membro' },
    { role: 'Facilitador', name: 'Gabriel Ricardo', type: 'Membro' }
  ]);
  const [showPending, setShowPending] = useState(false);
  const [showUniversoZero, setShowUniversoZero] = useState(false);
  
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
      }, 21000);
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
  const tickerSpeed = useMotionValue(0.06); // Default speed (px per frame approx)
  const targetSpeed = isSlowMotion ? 0.01 : 0.06; // Reduced speed for better legibility

  useEffect(() => {
    animate(tickerSpeed, targetSpeed, {
      duration: 2.5, // 2.5 seconds to reach full speed/slow-mo
      ease: "easeInOut"
    });
  }, [isSlowMotion, targetSpeed, tickerSpeed]);

  // Initial Daily Boot Sequence
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;

    // Create an offscreen canvas to load the image
    const revealImg = new window.Image();
    let imgLoaded = false;

    // We'll draw the reveal image onto the canvas once loaded
    revealImg.onload = () => {
      imgLoaded = true;
      needsRedraw = true;
    };
    revealImg.src = '/reveal-bg.jpg';

    // We create a persistent mask canvas that starts fully transparent
    const maskCanvas = document.createElement('canvas');
    maskCanvas.width = width;
    maskCanvas.height = height;
    const maskCtx = maskCanvas.getContext('2d');

    let needsRedraw = false;
    let animFrameId: number;

    const drawCanvas = () => {
      if (!ctx || !imgLoaded) return;

      // Clear main canvas
      ctx.clearRect(0, 0, width, height);

      // Draw reveal image
      ctx.save();
      
      // Calculate background cover dimensions
      const imgRatio = revealImg.width / revealImg.height;
      const canvasRatio = width / height;
      let dx = 0, dy = 0, dw = width, dh = height;
      if (canvasRatio > imgRatio) {
        dh = width / imgRatio;
        dy = (height - dh) / 2;
      } else {
        dw = height * imgRatio;
        dx = (width - dw) / 2;
      }

      ctx.drawImage(revealImg, dx, dy, dw, dh);

      // Use globalCompositeOperation to only keep where the mask has been drawn
      ctx.globalCompositeOperation = 'destination-in';
      ctx.drawImage(maskCanvas, 0, 0);

      ctx.restore();
    };

    const tick = () => {
      if (needsRedraw) {
        drawCanvas();
        needsRedraw = false;
      }
      animFrameId = requestAnimationFrame(tick);
    };
    animFrameId = requestAnimationFrame(tick);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      maskCanvas.width = width;
      maskCanvas.height = height;
      needsRedraw = true;
    };

    window.addEventListener('resize', handleResize);

    // Keep track of the last mouse position to draw continuous paths
    let lastX: number | null = null;
    let lastY: number | null = null;

    // Mouse reveal logic
    const handleMouseMove = (e: MouseEvent) => {
      if (!maskCtx) return;
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      // Draw a soft spray/brush onto the mask canvas
      maskCtx.save();
      
      // We set the brush size and soft blur
      maskCtx.strokeStyle = 'rgba(0, 0, 0, 1)';
      maskCtx.fillStyle = 'rgba(0, 0, 0, 1)';
      maskCtx.lineWidth = 140; // Brush diameter
      maskCtx.lineCap = 'round';
      maskCtx.lineJoin = 'round';
      
      // Use shadow to create a soft spray-paint edge
      maskCtx.shadowBlur = 45;
      maskCtx.shadowColor = 'rgba(0, 0, 0, 1)';

      if (lastX !== null && lastY !== null) {
        // Draw line from last position to current position
        maskCtx.beginPath();
        maskCtx.moveTo(lastX, lastY);
        maskCtx.lineTo(x, y);
        maskCtx.stroke();
      } else {
        // Draw single dot if we just started
        maskCtx.beginPath();
        maskCtx.arc(x, y, 70, 0, Math.PI * 2);
        maskCtx.fill();
      }
      
      maskCtx.restore();

      lastX = x;
      lastY = y;

      needsRedraw = true;
    };

    const handleMouseLeave = () => {
      lastX = null;
      lastY = null;
    };

    // Listen to mouse events on document
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);

    const today = new Date().toLocaleDateString('pt-BR');
    const lastDailyVisit = localStorage.getItem('phantom_troupe_daily_visit');
    
    let timer: any = null;
    if (lastDailyVisit !== today) {
      localStorage.setItem('phantom_troupe_daily_visit', today);
      timer = setTimeout(() => {
        setShowHistory(false);
        setGuidePage(1);
        setShowGuide(true);
      }, 800); // Ritualistic pause before opening
    }

    return () => {
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(animFrameId);
      if (timer) clearTimeout(timer);
    };
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
    city: "DETECTANDO...",
    lastUpdate: new Date().toLocaleTimeString('pt-BR')
  });
  const [visitCount, setVisitCount] = useState<number | null>(null);
  const [showCounterLabel, setShowCounterLabel] = useState(true);
  const [fullscreenImage, setFullscreenImage] = useState<string | null>(null);
  const [isSwitching, setIsSwitching] = useState(false);

  const [currentTime, setCurrentTime] = useState(new Date());
  const [showTimeSelector, setShowTimeSelector] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState({ 
    name: "Cristo Redentor", 
    tz: "America/Sao_Paulo", 
    icon: "🇧🇷" 
  });

  const LOCATIONS = [
    { name: "Greenwich Observatory", tz: "Europe/London", icon: "🇬🇧" },
    { name: "Meca", tz: "Asia/Riyadh", icon: "🇸🇦" },
    { name: "Pentágono", tz: "America/New_York", icon: "🇺🇸" },
    { name: "Monte Fuji", tz: "Asia/Tokyo", icon: "🇯🇵" },
    { name: "Torre Eiffel", tz: "Europe/Paris", icon: "🇫🇷" },
    { name: "Rio Ganges", tz: "Asia/Kolkata", icon: "🇮🇳" },
    { name: "Cristo Redentor", tz: "America/Sao_Paulo", icon: "🇧🇷" },
    { name: "Pirâmides de Gizé", tz: "Africa/Cairo", icon: "🇪🇬" },
    { name: "Portão de Brandemburgo", tz: "Europe/Berlin", icon: "🇩🇪" },
    { name: "Praça Vermelha", tz: "Europe/Moscow", icon: "🇷🇺" },
    { name: "Jerusalém", tz: "Asia/Jerusalem", icon: "🇮🇱" },
    { name: "Cidade Proibida", tz: "Asia/Shanghai", icon: "🇨🇳" },
  ];

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const [hardware, setHardware] = useState({
    cpu: 0,
    gpu: 0
  });

  const [spaceNews, setSpaceNews] = useState<{title: string}[]>([
    { title: "CARREGANDO NOTÍCIA GEOPOLÍTICA..." },
    { title: "CARREGANDO NOTÍCIA GEOPOLÍTICA..." },
    { title: "CARREGANDO NOTÍCIA GEOPOLÍTICA..." }
  ]);

  const [telemetryData, setTelemetryData] = useState({
    spTemp: 22.0, spHum: 65, spAqi: 35,
    nyTemp: 18.0, nyHum: 50, nyAqi: 25,
    tkTemp: 25.0, tkHum: 75, tkAqi: 40,
    lnTemp: 15.0, lnHum: 80, lnAqi: 20,
    ilTemp: 28.0, ilHum: 55, ilAqi: 45,
    
    btc: 68000.0,
    eth: 3400.0,
    sol: 150.0,
    usdt: 1.0000,
    
    usd: 104.25,
    eur: 1.0842,
    gbp: 1.2654,
    jpy: 151.82,
    chf: 0.9021,
    usdBrl: 5.45,
    eurBrl: 5.95,
    
    gitStars: 0,
    gitForks: 0,
    gitIssues: 0,
    
    usaTemp: 18.0, usaHum: 50, usaWind: 12, usaAqi: 25,
    brazilTemp: 22.0, brazilHum: 65, brazilWind: 8, brazilAqi: 35,
    israelTemp: 28.0, israelHum: 55, israelWind: 10, israelAqi: 45,
    
    loading: true
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
          'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_hour.geojson'
        );
        const data = await res.json();
        const quakes = data.features.slice(0, 15).map((f: any) => ({
          type: f.properties.mag >= 4.5 ? '🚨' : '⚡',
          title: `SISMO M${f.properties.mag.toFixed(1)} — ${f.properties.place?.toUpperCase()}`,
          mag: f.properties.mag.toFixed(1),
          time: new Date(f.properties.time).toISOString().slice(11, 16) + 'Z'
        }));
        setDisasterFeed(quakes.length > 0 ? quakes : [{ type: '⚡', title: 'SEM ATIVIDADE SÍSMICA RECENTE', time: 'LIVE' }]);
      } catch {
        setDisasterFeed([
          { type: '⚡', title: 'SISMO M5.8 — REGIONAL PACÍFICO', time: '03:12Z' },
          { type: '⚡', title: 'SISMO M4.2 — COSTA OESTE, USA', time: '03:22Z' },
          { type: '⚡', title: 'SISMO M3.1 — CRATERA DE SÃO PAULO', time: '03:30Z' },
        ]);
      }
    };

    fetchDisasters();
    const disasterRefresh = setInterval(fetchDisasters, 60000);

    // Enhanced Location & City Detection
    const fetchRealData = async (lat?: number, lon?: number) => {
      try {
        let cityName = "DESCONHECIDO";
        
        if (lat && lon) {
          // Use Reverse Geocoding for coordinates (High Precision)
          const geoRes = await fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lon}&localityLanguage=pt`);
          const geoData = await geoRes.json();
          cityName = (geoData.city || geoData.locality || geoData.principalSubdivision || "DESCONHECIDO").toUpperCase();
        } else {
          // Fallback: IP Geolocation (Medium Precision)
          const ipRes = await fetch('https://ipapi.co/json/');
          const ipData = await ipRes.json();
          cityName = (ipData.city || "DESCONHECIDO").toUpperCase();
        }
        
        setMetrics(prev => ({
          ...prev,
          city: cityName,
          lastUpdate: new Date().toLocaleTimeString('pt-BR')
        }));
      } catch (err) {
        console.error("Erro ao carregar dados reais:", err);
        // Last resort fallback
        try {
          const weatherRes = await fetch(`https://wttr.in?format=j1`);
          const weatherData = await weatherRes.json();
          setMetrics(prev => ({
            ...prev,
            city: weatherData.nearest_area[0].areaName[0].value.toUpperCase(),
            lastUpdate: new Date().toLocaleTimeString('pt-BR')
          }));
        } catch {
          setMetrics(prev => ({ ...prev, city: "OFFLINE" }));
        }
      }
    };

    // Initialize Location and Counter
    const initData = async () => {
      // 1. Visit Counter Fallback Initialization
      let currentFallback = 1312;
      try {
        if (typeof window !== 'undefined') {
          const stored = localStorage.getItem('pt_fallback_visits');
          if (stored) {
            currentFallback = parseInt(stored, 10);
          } else {
            localStorage.setItem('pt_fallback_visits', '1312');
          }
        }
      } catch (e) {
        console.error("Erro ao ler localStorage:", e);
      }
      
      // Set the initial/fallback visit count so the counter is visible immediately
      setVisitCount(currentFallback);

      // Try fetching the real count from Supabase
      try {
        const supabaseUrl = 'https://rsrjkhqffvvqkofxhvhg.supabase.co';
        const supabaseKey = 'sb_publishable_FQfHtke8S9ApcO41-G8t5Q_Y5nDFBte';
        
        // Check if we already incremented this session to avoid double counts on HMR/re-mount
        const sessionKey = 'pt_visit_tracked_' + new Date().toDateString();
        if (!sessionStorage.getItem(sessionKey)) {
          await fetch(`${supabaseUrl}/rest/v1/rpc/increment_site_opens`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'apikey': supabaseKey,
              'Authorization': `Bearer ${supabaseKey}`
            }
          });
          sessionStorage.setItem(sessionKey, 'true');
        }

        const res = await fetch(`${supabaseUrl}/rest/v1/site_metrics?metric_name=eq.site_opens`, {
          headers: {
            'apikey': supabaseKey,
            'Authorization': `Bearer ${supabaseKey}`
          }
        });
        const data = await res.json();
        if (data && data.length > 0) {
          setVisitCount(data[0].value);
          try {
            localStorage.setItem('pt_fallback_visits', String(data[0].value));
          } catch (e) {}
        }
      } catch (e) { 
        console.error("Erro ao conectar ao Supabase, usando contador local:", e); 
        // Increment the local fallback once per day/session if Supabase is offline/blocked
        try {
          const sessionKey = 'pt_visit_tracked_' + new Date().toDateString();
          if (!sessionStorage.getItem(sessionKey)) {
            const newFallback = currentFallback + 1;
            localStorage.setItem('pt_fallback_visits', String(newFallback));
            setVisitCount(newFallback);
            sessionStorage.setItem(sessionKey, 'true');
          }
        } catch (err) {
          console.error("Erro ao salvar fallback local:", err);
        }
      }

      // 2. Geolocation
      if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(
          (pos) => fetchRealData(pos.coords.latitude, pos.coords.longitude),
          () => fetchRealData(),
          { timeout: 5000 }
        );
      } else {
        fetchRealData();
      }
    };

    initData();

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

  useEffect(() => {
    if (!showWorldometer) return;

    const fetchAllData = async () => {
      try {
        // 1. Crypto Prices (Binance)
        const [btcData, ethData, solData] = await Promise.all([
          fetch("https://api.binance.com/api/v3/ticker/price?symbol=BTCUSDT").then(r => r.json()).catch(() => ({ price: "68000" })),
          fetch("https://api.binance.com/api/v3/ticker/price?symbol=ETHUSDT").then(r => r.json()).catch(() => ({ price: "3400" })),
          fetch("https://api.binance.com/api/v3/ticker/price?symbol=SOLUSDT").then(r => r.json()).catch(() => ({ price: "150" }))
        ]);

        // 2. Forex rates (er-api)
        const forexRes = await fetch("https://open.er-api.com/v6/latest/USD").then(r => r.json()).catch(() => null);

        // 3. Environmental data (Open-Meteo)
        const meteoRes = await fetch("https://api.open-meteo.com/v1/forecast?latitude=-23.55,40.71,35.68,51.50,32.08&longitude=-46.63,-74.00,139.69,-0.12,34.78&current=temperature_2m,relative_humidity_2m,wind_speed_10m").then(r => r.json()).catch(() => null);
        const aqiRes = await fetch("https://air-quality-api.open-meteo.com/v1/air-quality?latitude=-23.55,40.71,35.68,51.50,32.08&longitude=-46.63,-74.00,139.69,-0.12,34.78&current=us_aqi").then(r => r.json()).catch(() => null);

        // 4. GitHub Repository Stats
        const gitRes = await fetch("https://api.github.com/repos/anhderson/phantomtroupe").then(r => r.json()).catch(() => null);

        // 5. Spaceflight News API (3 items)
        const newsRes = await fetch("https://api.spaceflightnewsapi.net/v4/articles/?limit=3").then(r => r.json()).catch(() => null);
        if (newsRes && Array.isArray(newsRes.results)) {
          setSpaceNews(newsRes.results.map((item: any) => ({ title: item.title })));
        }

        setTelemetryData(prev => {
          const next = { ...prev, loading: false };
          if (btcData && btcData.price) next.btc = parseFloat(btcData.price);
          if (ethData && ethData.price) next.eth = parseFloat(ethData.price);
          if (solData && solData.price) next.sol = parseFloat(solData.price);
          
          if (forexRes && forexRes.rates) {
            next.usd = forexRes.rates.USD || prev.usd;
            next.eur = forexRes.rates.EUR ? 1 / forexRes.rates.EUR : prev.eur;
            next.gbp = forexRes.rates.GBP ? 1 / forexRes.rates.GBP : prev.gbp;
            next.jpy = forexRes.rates.JPY || prev.jpy;
            next.chf = forexRes.rates.CHF || prev.chf;
            next.usdBrl = forexRes.rates.BRL || prev.usdBrl;
            next.eurBrl = forexRes.rates.EUR ? (forexRes.rates.BRL / forexRes.rates.EUR) : prev.eurBrl;
          }

          if (meteoRes && Array.isArray(meteoRes)) {
            next.brazilTemp = meteoRes[0]?.current?.temperature_2m ?? prev.brazilTemp;
            next.brazilHum = meteoRes[0]?.current?.relative_humidity_2m ?? prev.brazilHum;
            next.brazilWind = meteoRes[0]?.current?.wind_speed_10m ?? prev.brazilWind;

            next.usaTemp = meteoRes[1]?.current?.temperature_2m ?? prev.usaTemp;
            next.usaHum = meteoRes[1]?.current?.relative_humidity_2m ?? prev.usaHum;
            next.usaWind = meteoRes[1]?.current?.wind_speed_10m ?? prev.usaWind;

            next.tkTemp = meteoRes[2]?.current?.temperature_2m ?? prev.tkTemp;
            next.tkHum = meteoRes[2]?.current?.relative_humidity_2m ?? prev.tkHum;

            next.lnTemp = meteoRes[3]?.current?.temperature_2m ?? prev.lnTemp;
            next.lnHum = meteoRes[3]?.current?.relative_humidity_2m ?? prev.lnHum;

            next.israelTemp = meteoRes[4]?.current?.temperature_2m ?? prev.israelTemp;
            next.israelHum = meteoRes[4]?.current?.relative_humidity_2m ?? prev.israelHum;
            next.israelWind = meteoRes[4]?.current?.wind_speed_10m ?? prev.israelWind;
          }

          if (aqiRes && Array.isArray(aqiRes)) {
            next.brazilAqi = aqiRes[0]?.current?.us_aqi ?? prev.brazilAqi;
            next.usaAqi = aqiRes[1]?.current?.us_aqi ?? prev.usaAqi;
            next.tkAqi = aqiRes[2]?.current?.us_aqi ?? prev.tkAqi;
            next.lnAqi = aqiRes[3]?.current?.us_aqi ?? prev.lnAqi;
            next.israelAqi = aqiRes[4]?.current?.us_aqi ?? prev.israelAqi;
          }

          if (gitRes) {
            next.gitStars = gitRes.stargazers_count ?? prev.gitStars;
            next.gitForks = gitRes.forks_count ?? prev.gitForks;
            next.gitIssues = gitRes.open_issues_count ?? prev.gitIssues;
          }

          return next;
        });

      } catch (e) {
        console.error("Error fetching telemetry data:", e);
      }
    };

    fetchAllData();
    const interval = setInterval(fetchAllData, 20000);
    return () => clearInterval(interval);
  }, [showWorldometer]);

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
      {/* SVG ClipPaths definitions */}
      <svg width="0" height="0" style={{ position: 'absolute', pointerEvents: 'none' }}>
        <defs>
          <clipPath id="heart-clip" clipPathUnits="objectBoundingBox">
            <path d="M 0.5 0.9 C 0.1 0.5 -0.1 0.2 0.1 0.05 C 0.25 -0.1 0.45 0.05 0.5 0.2 C 0.55 0.05 0.75 -0.1 0.9 0.05 C 1.1 0.2 0.9 0.5 0.5 0.9 Z" />
          </clipPath>
        </defs>
      </svg>

      {/* Background Canvas Reveal Layer */}
      <canvas ref={canvasRef} className="reveal-canvas" />

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
          <span className="hud-label" style={{ color: '#ffffff' }}>SYNC:</span>
          <span className="hud-value hardware-hl">{metrics.city}</span>
          <div className="hud-divider"></div>
          <span 
            className="hud-label clock-trigger"
            onClick={() => setShowTimeSelector(true)}
          >
            {selectedLocation.icon} {selectedLocation.name.split(' ')[0]}:
          </span>
          <span 
            className="hud-value clock-value"
            onClick={() => setShowTimeSelector(true)}
            style={{ color: '#FF007F', textShadow: '0 0 10px rgba(255, 0, 127, 0.4)' }}
          >
            {currentTime.toLocaleTimeString('pt-BR', { timeZone: selectedLocation.tz })}
          </span>
        </div>
      </div>

      <div className="scanlines"></div>
      
      <div className="visual-anchor">
        {!showMembers && !showGeneralNews && (
          <>
            <div 
              className="center-point" 
              onClick={() => setShowUniversoZero(true)} 
              style={{ cursor: 'pointer' }}
              title="Universo Zero"
            >
              <div className="impact-glow pink-impact"></div>
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
                      backgroundColor: (isProcessing || shouldGlobalFlash) ? '#FF007F' : 'rgba(255, 0, 127, 0.15)',
                      boxShadow: (isProcessing || shouldGlobalFlash) ? '0 0 15px #FF007F' : 'none',
                      opacity: shouldGlobalFlash ? 0.8 : 1,
                      transition: 'all 0.2s ease-out'
                    }}
                  />
                  <div 
                    className="neural-thread"
                    style={{ 
                      width: 'calc(var(--orbit-radius) - (var(--node-size) / 2))',
                      transform: `rotate(${angle}deg)`,
                      background: `linear-gradient(90deg, rgba(255, 0, 127, 0.05) 0%, ${app.color || 'var(--primary)'} 100%)`, 
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
                      '--custom-color': (isProcessing || isPTProcessing) ? '#FF007F' : (app.color || 'var(--primary)'),
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
        </>
      )}
    </div>

      {/* Top Gateway Sphere */}
      <div className="top-gateway-container">
        <div className="gateway-sphere">
          <div className="gateway-inner-glow"></div>
          <div className="gateway-scanline"></div>
        </div>
      </div>

      {/* Global Connection Counter */}
      {visitCount !== null && (
        <div 
          className={`global-visit-counter ${showCounterLabel ? 'with-label' : 'compact'}`}
          onClick={() => setShowCounterLabel(!showCounterLabel)}
        >
          {showCounterLabel && <div className="counter-label">ACESSOS AO SITE</div>}
          <div className="counter-value">
            {visitCount.toLocaleString('pt-BR')}
          </div>
          <div className="counter-scanline"></div>
        </div>
      )}

      {/* Ajudas e Doações Button (Top Left - Symmetrical to Seja Membro) */}
      <motion.div 
        className="donations-trigger"
        whileHover={selectedApp ? {} : { scale: 1.1 }}
        whileTap={selectedApp ? {} : { scale: 0.9 }}
        animate={{ 
          opacity: selectedApp ? 0 : 1,
          pointerEvents: selectedApp ? 'none' : 'auto'
        }}
        transition={{ duration: 0.3 }}
        onClick={() => setShowDonations(true)}
      >
        <div className="history-sphere donation-heart-shape" style={{ width: '95px', height: '95px', position: 'relative' }}>
          <svg viewBox="0 0 1 1" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', filter: 'drop-shadow(0 0 10px rgba(255, 0, 127, 0.6))', zIndex: 1 }}>
            <path 
              d="M 0.5 0.9 C 0.1 0.5 -0.1 0.2 0.1 0.05 C 0.25 -0.1 0.45 0.05 0.5 0.2 C 0.55 0.05 0.75 -0.1 0.9 0.05 C 1.1 0.2 0.9 0.5 0.5 0.9 Z" 
              fill="rgba(255, 0, 127, 0.15)" 
              stroke="#FF007F" 
              strokeWidth="0.013" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            />
          </svg>
          
          <motion.div 
            className="seja-membro-flicker-text"
            animate={{ 
              opacity: isGlitching ? [1, 0, 1, 0.4, 1, 0.2, 1] : 1,
              scale: isGlitching ? [1, 1.05, 0.95, 1.08, 1] : 1,
              color: isGlitching ? ["#ffffff", "#808080", "#ffffff", "#a0a0a0", "#ffffff"] : "#ffffff",
              textShadow: isGlitching 
                ? [
                    '0 0 10px #FF007F, 0 0 20px #FF007F',
                    '0 0 10px #808080, 0 0 20px #808080',
                    '0 0 10px #ffffff, 0 0 20px #ffffff'
                  ]
                : '0 0 10px #FF007F, 0 0 15px rgba(255, 0, 127, 0.3)'
            }}
            transition={{ 
              duration: isGlitching ? 0.3 : 2,
              repeat: isGlitching ? Infinity : Infinity,
              repeatType: "reverse"
            }}
            style={{
              position: 'absolute',
              top: '43%',
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
            AJUDAS{"\n"}& DOAÇÕES
          </motion.div>
        </div>
        
        <div className="history-scan-overlay" style={{ clipPath: 'url(#heart-clip)' }}>
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

      {/* Seja Membro Button */}
      <motion.div 
        className="history-trigger members-trigger"
        whileHover={selectedApp ? {} : { scale: 1.1 }}
        whileTap={selectedApp ? {} : { scale: 0.9 }}
        animate={{ 
          opacity: selectedApp ? 0 : 1,
          pointerEvents: selectedApp ? 'none' : 'auto'
        }}
        transition={{ duration: 0.3 }}
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
                    '0 0 10px #FF007F, 0 0 20px #FF007F',
                    '0 0 10px #808080, 0 0 20px #808080',
                    '0 0 10px #ffffff, 0 0 20px #ffffff'
                  ]
                : '0 0 10px #FF007F, 0 0 15px rgba(255, 0, 127, 0.3)'
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
        whileHover={selectedApp ? {} : { scale: 1.1 }}
        whileTap={selectedApp ? {} : { scale: 0.9 }}
        animate={{ 
          opacity: selectedApp ? 0 : 1,
          pointerEvents: selectedApp ? 'none' : 'auto'
        }}
        transition={{ duration: 0.3 }}
        onClick={() => { setShowGeneralNews(!showGeneralNews); setNewsTab('select'); }}
      >
        <div className="earth-sphere">
          <div className="earth-clouds"></div>
          
          {/* Animated "Notícias Gerais" Text Overlay - Persistent */}
          <motion.div 
            className="global-news-flicker-text"
            animate={{ 
              opacity: isGlitching ? [1, 0, 1, 0.4, 1, 0.2, 1] : 1,
              scale: isGlitching ? [1, 1.05, 0.95, 1.08, 1] : 1,
              color: isGlitching ? ["#ffffff", "#808080", "#ffffff", "#a0a0a0", "#ffffff"] : "#ffffff",
              textShadow: isGlitching 
                ? [
                    '0 0 10px #FF007F, 0 0 20px #FF007F',
                    '0 0 10px #808080, 0 0 20px #808080',
                    '0 0 10px #ffffff, 0 0 20px #ffffff'
                  ]
                : '0 0 10px #FF007F, 0 0 15px rgba(255, 0, 127, 0.3)'
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
            NOTÍCIAS{"\n"}& REGISTROS
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

      {/* General News Overlay (Notícias Gerais) */}
      <AnimatePresence>
        {showGeneralNews && (
          <motion.div 
            className="guide-overlay-container members-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => { setShowGeneralNews(false); setShowAdminLoginInNews(false); }}
          >
            <div 
              className="guide-inner-wrap" 
              style={{ padding: '40px', transform: 'translateY(-10vh)', position: 'relative', display: 'flex', flexDirection: 'column', gap: '20px' }}
              onClick={e => e.stopPropagation()}
            >
              {/* Close Button */}
              <div 
                className="close-btn-membros" 
                onClick={() => { setShowGeneralNews(false); setShowAdminLoginInNews(false); }}
              >
                ×
              </div>

              <header className="guide-header-section" style={{ marginBottom: '20px', textAlign: 'center' }}>
                <h2 className="guide-heading" style={{ color: 'var(--primary)', textShadow: '0 0 15px rgba(255, 0, 127, 0.5)' }}>
                  {newsTab === 'select' && "▽ ℕ𝖔𝖙𝖎́𝖈𝖎𝖆𝖘 & ℝ𝖊𝖌𝖎𝖘𝖙𝖗𝖔𝖘 △"}
                  {newsTab === 'news' && "▽ Últimas Notícias △"}
                  {newsTab === 'records' && "▽ Mural de Doações & Ajudas △"}
                </h2>
              </header>

              {/* Aba 1: Seletor de Painéis */}
              {newsTab === 'select' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', alignItems: 'center', width: '100%', padding: '10px 0' }}>
                  <p style={{ color: '#333333', fontSize: '0.9rem', lineHeight: '1.5', textAlign: 'center', marginBottom: '10px', maxWidth: '450px' }}>
                    Selecione o painel que deseja visualizar no terminal da fraternidade:
                  </p>
                  <div style={{ display: 'flex', gap: '20px', width: '100%', maxWidth: '500px', justifyContent: 'center' }}>
                    <button 
                      className="guide-page-btn" 
                      style={{ flex: 1, padding: '20px', fontSize: '0.85rem', letterSpacing: '2px', display: 'flex', flexDirection: 'column', gap: '10px', alignItems: 'center', height: 'auto', background: 'rgba(225, 190, 231, 0.75)', border: '1px solid rgba(171, 71, 188, 0.6)', borderRadius: '6px', color: '#2c1a16' }}
                      onClick={() => setNewsTab('news')}
                    >
                      <span style={{ fontSize: '2rem' }}>📰</span>
                      NOTÍCIAS
                    </button>
                    <button 
                      className="guide-page-btn" 
                      style={{ flex: 1, padding: '20px', fontSize: '0.85rem', letterSpacing: '2px', display: 'flex', flexDirection: 'column', gap: '10px', alignItems: 'center', height: 'auto', background: 'rgba(225, 190, 231, 0.75)', border: '1px solid rgba(171, 71, 188, 0.6)', borderRadius: '6px', color: '#2c1a16' }}
                      onClick={() => setNewsTab('records')}
                    >
                      <span style={{ fontSize: '2rem' }}>💖</span>
                      REGISTROS (MURAL)
                    </button>
                  </div>
                  {/* Button to Global News (Telemetria) */}
                  <div style={{ display: 'flex', justifyContent: 'center', marginTop: '15px' }}>
                    <button 
                      className="guide-page-btn btn-next btn-grey"
                      style={{ marginTop: 0, padding: '8px 15px', fontSize: '0.75rem' }}
                      onClick={() => {
                        setShowGeneralNews(false);
                        setShowWorldometer(true);
                      }}
                    >
                      ACESSAR TELEMETRIA GLOBAL / GLOBAL NEWS ▷
                    </button>
                  </div>
                </div>
              )}

              {/* Aba 2: Lista de Notícias */}
              {newsTab === 'news' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', width: '100%' }}>
                  <div style={{ display: 'flex', justifyContent: 'flex-start', width: '100%' }}>
                    <button 
                      className="silver-btn" 
                      style={{ padding: '6px 15px', fontSize: '0.75rem', letterSpacing: '1px' }}
                      onClick={() => setNewsTab('select')}
                    >
                      ◀ VOLTAR AO MENU
                    </button>
                  </div>

                  <div className="members-list" style={{ width: '100%', maxHeight: '280px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '12px', paddingRight: '5px' }}>
                    {generalNewsList.length === 0 ? (
                      <p style={{ textAlign: 'center', color: '#666', fontStyle: 'italic', fontSize: '0.9rem' }}>Nenhuma notícia registrada ainda.</p>
                    ) : (
                      [...generalNewsList].reverse().map((news) => (
                        <div 
                          key={news.id} 
                          className="member-card"
                          style={{ 
                            padding: '15px', 
                            background: 'rgba(255, 255, 255, 0.75)', 
                            border: '1px solid rgba(255, 0, 127, 0.2)', 
                            borderRadius: '6px',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '6px'
                          }}
                        >
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <span style={{ fontSize: '0.75rem', fontWeight: 'bold', color: 'var(--primary)', letterSpacing: '1px' }}>{news.date}</span>
                            {isAdminAuth && (
                              <button 
                                style={{ background: 'transparent', border: 'none', color: '#ff0055', cursor: 'pointer', fontSize: '0.75rem', padding: 0 }}
                                onClick={() => {
                                  setGeneralNewsList(prev => prev.filter(item => item.id !== news.id));
                                }}
                              >
                                [Excluir]
                              </button>
                            )}
                          </div>
                          <h3 style={{ margin: '0', fontSize: '1.1rem', color: '#1a1a1a', textTransform: 'uppercase', letterSpacing: '1px' }}>{news.title}</h3>
                          <p style={{ margin: 0, fontSize: '0.9rem', lineHeight: '1.4', color: '#333333' }}>{news.content}</p>
                        </div>
                      ))
                    )}
                  </div>

                  {/* Admin Area */}
                  <div style={{ borderTop: '1px solid rgba(255, 101, 132, 0.2)', paddingTop: '15px', marginTop: '5px' }}>
                    {!isAdminAuth ? (
                      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        {!showAdminLoginInNews ? (
                          <button 
                            style={{ background: 'transparent', border: 'none', color: 'var(--primary)', cursor: 'pointer', fontSize: '0.8rem', letterSpacing: '1px', textDecoration: 'underline', fontWeight: 'bold' }}
                            onClick={() => setShowAdminLoginInNews(true)}
                          >
                            + ADICIONAR NOTÍCIA (ACESSO RESTRITO)
                          </button>
                        ) : (
                          <div style={{ display: 'flex', gap: '8px', alignItems: 'center', width: '100%', justifyContent: 'center' }}>
                            <input 
                              type="text" 
                              placeholder="ADMIN ID" 
                              value={adminUser}
                              onChange={e => setAdminUser(e.target.value)}
                              className="phantom-input center-text" 
                              style={{ padding: '6px 10px', fontSize: '0.8rem', width: '120px' }}
                            />
                            <input 
                              type="password" 
                              placeholder="SENHA" 
                              value={adminPass}
                              onChange={e => setAdminPass(e.target.value)}
                              className="phantom-input center-text" 
                              style={{ padding: '6px 10px', fontSize: '0.8rem', width: '120px' }}
                              onKeyDown={e => {
                                if (e.key === 'Enter') {
                                  if (adminUser === "PhantomTroupeFraternidade" && adminPass === "0PTPhantomTroupeFraternidadePT0") {
                                    setIsAdminAuth(true);
                                    setAdminUser("");
                                    setAdminPass("");
                                    setShowAdminLoginInNews(false);
                                  } else {
                                    alert("Credenciais inválidas!");
                                  }
                                }
                              }}
                            />
                            <button 
                              className="guide-page-btn"
                              style={{ padding: '6px 12px', fontSize: '0.8rem', marginTop: 0 }}
                              onClick={() => {
                                if (adminUser === "PhantomTroupeFraternidade" && adminPass === "0PTPhantomTroupeFraternidadePT0") {
                                  setIsAdminAuth(true);
                                  setAdminUser("");
                                  setAdminPass("");
                                  setShowAdminLoginInNews(false);
                                } else {
                                  alert("Credenciais inválidas!");
                                }
                              }}
                            >
                              ENTRAR
                            </button>
                            <button 
                              style={{ background: 'transparent', border: 'none', color: '#666', cursor: 'pointer', fontSize: '0.8rem' }}
                              onClick={() => setShowAdminLoginInNews(false)}
                            >
                              ×
                            </button>
                          </div>
                        )}
                      </div>
                    ) : (
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <span style={{ fontSize: '0.75rem', fontWeight: 'bold', color: 'var(--primary)', letterSpacing: '1px' }}>ADICIONAR NOVA NOTÍCIA</span>
                          <button 
                            style={{ background: 'transparent', border: 'none', color: '#ff0055', cursor: 'pointer', fontSize: '0.75rem', textDecoration: 'underline' }}
                            onClick={() => setIsAdminAuth(false)}
                          >
                            Sair do Painel
                          </button>
                        </div>
                        <input 
                          type="text" 
                          placeholder="TÍTULO DA NOTÍCIA" 
                          value={newNewsTitle}
                          onChange={e => setNewNewsTitle(e.target.value)}
                          className="phantom-input center-text" 
                          style={{ padding: '8px', fontSize: '0.85rem' }}
                        />
                        <textarea 
                          placeholder="CONTEÚDO DA NOTÍCIA (FORMATO LINEAR)..." 
                          value={newNewsContent}
                          onChange={e => setNewNewsContent(e.target.value)}
                          className="phantom-input" 
                          style={{ padding: '8px', fontSize: '0.85rem', minHeight: '60px', width: '100%', resize: 'vertical', fontFamily: 'inherit' }}
                        />
                        <button 
                          className="guide-page-btn btn-next"
                          style={{ padding: '8px 15px', marginTop: 0, width: '100%' }}
                          onClick={() => {
                            if (newNewsTitle.trim() && newNewsContent.trim()) {
                              const newNews = {
                                id: Date.now().toString(),
                                date: new Date().toLocaleDateString('pt-BR'),
                                title: newNewsTitle,
                                content: newNewsContent
                              };
                              setGeneralNewsList(prev => [...prev, newNews]);
                              setNewNewsTitle("");
                              setNewNewsContent("");
                            } else {
                              alert("Preencha todos os campos!");
                            }
                          }}
                        >
                          PUBLICAR NOTÍCIA ▷
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Aba 3: Mural de Registros públicos */}
              {newsTab === 'records' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', width: '100%' }}>
                  <div style={{ display: 'flex', justifyContent: 'flex-start', width: '100%' }}>
                    <button 
                      className="silver-btn" 
                      style={{ padding: '6px 15px', fontSize: '0.75rem', letterSpacing: '1px' }}
                      onClick={() => setNewsTab('select')}
                    >
                      ◀ VOLTAR AO MENU
                    </button>
                  </div>

                  <p style={{ margin: '0 0 10px 0', fontSize: '0.85rem', lineHeight: '1.4', color: '#333333', textAlign: 'center' }}>
                    Registros públicos de ajudas e doações propostas por nossa fraternidade. Gratidão a todos que colaboram com o ecossistema! ❤️
                  </p>

                  <div className="members-list" style={{ width: '100%', maxHeight: '280px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '12px', paddingRight: '5px' }}>
                    {donationsList.length === 0 ? (
                      <p style={{ textAlign: 'center', color: '#666', fontStyle: 'italic', fontSize: '0.9rem' }}>Nenhum registro no mural ainda.</p>
                    ) : (
                      [...donationsList].reverse().map((record) => (
                        <div 
                          key={record.id} 
                          className="member-card"
                          style={{ 
                            padding: '15px', 
                            background: 'rgba(255, 255, 255, 0.75)', 
                            border: '1px solid rgba(255, 0, 127, 0.2)', 
                            borderRadius: '6px',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '10px'
                          }}
                        >
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <span style={{ fontSize: '0.75rem', fontWeight: 'bold', color: 'var(--primary)', letterSpacing: '1px' }}>{record.date}</span>
                            <span style={{ fontSize: '0.65rem', color: '#ff007f', border: '1px solid #ff007f', padding: '1px 6px', borderRadius: '4px', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: 'bold' }}>{record.type}</span>
                          </div>
                          
                          <div style={{ display: 'flex', gap: '15px', alignItems: 'flex-start', flexWrap: 'wrap' }}>
                            {record.image && (
                              <div style={{ width: '90px', height: '90px', border: '1px solid rgba(255, 0, 127, 0.2)', borderRadius: '4px', overflow: 'hidden', background: '#fff', flexShrink: 0 }}>
                                <img src={record.image} alt={record.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                              </div>
                            )}
                            <div style={{ flex: 1, minWidth: '150px', display: 'flex', flexDirection: 'column', gap: '5px' }}>
                              <h3 style={{ margin: '0', fontSize: '1.05rem', color: '#1a1a1a', textTransform: 'uppercase', letterSpacing: '1px' }}>
                                {record.title || "Doação Registrada"}
                              </h3>
                              <p style={{ margin: 0, fontSize: '0.8rem', color: '#666' }}>
                                <strong>Doador:</strong> {record.name}
                              </p>
                              {record.items && (
                                <p style={{ margin: 0, fontSize: '0.85rem', lineHeight: '1.4', color: '#333333' }}>
                                  <strong>Doado:</strong> {record.items}
                                </p>
                              )}
                              {record.testimonial && (
                                <p style={{ margin: '5px 0 0 0', fontSize: '0.85rem', lineHeight: '1.4', color: '#555', fontStyle: 'italic', background: 'rgba(255, 101, 132, 0.05)', padding: '6px 10px', borderRadius: '4px', borderLeft: '2px solid #ff007f' }}>
                                  "{record.testimonial}"
                                </p>
                              )}
                            </div>
                          </div>

                          {isAdminAuth && (
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '5px', borderTop: '1px dashed rgba(0,0,0,0.05)', paddingTop: '5px' }}>
                              <span style={{ fontSize: '0.75rem', color: '#666' }}><strong>Contato:</strong> {record.contact}</span>
                              <button 
                                style={{ background: 'transparent', border: 'none', color: '#ff0055', cursor: 'pointer', fontSize: '0.75rem', padding: 0 }}
                                onClick={() => {
                                  setDonationsList(prev => prev.filter(item => item.id !== record.id));
                                }}
                              >
                                [Remover do Mural]
                              </button>
                            </div>
                          )}
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}

            </div>
          </motion.div>
        )}
      </AnimatePresence>

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
                {/* Section 1: Atmospheric Telemetry */}
                <div className="stat-category">
                  <h3 className="cat-title">ATMOSPHERIC TELEMETRY</h3>
                  <div className="stat-row">
                    <div className="mini-card">
                      <span className="mini-label">SÃO PAULO CLIMA</span>
                      <span className="mini-value color-blue">
                        {telemetryData.brazilTemp.toFixed(1)}°C / {telemetryData.brazilHum}% RH
                      </span>
                    </div>
                    <div className="mini-card">
                      <span className="mini-label">NEW YORK CLIMA</span>
                      <span className="mini-value color-blue">
                        {telemetryData.usaTemp.toFixed(1)}°C / {telemetryData.usaHum}% RH
                      </span>
                    </div>
                  </div>
                  <div className="stat-row">
                    <div className="mini-card">
                      <span className="mini-label">TOKYO CLIMA</span>
                      <span className="mini-value color-blue">
                        {telemetryData.tkTemp.toFixed(1)}°C / {telemetryData.tkHum}% RH
                      </span>
                    </div>
                    <div className="mini-card">
                      <span className="mini-label">LONDON CLIMA</span>
                      <span className="mini-value color-blue">
                        {telemetryData.lnTemp.toFixed(1)}°C / {telemetryData.lnHum}% RH
                      </span>
                    </div>
                  </div>
                  <div className="stat-row">
                    <div className="mini-card">
                      <span className="mini-label">SÃO PAULO AQI (AR)</span>
                      <span className={`mini-value ${telemetryData.brazilAqi < 50 ? 'color-green' : telemetryData.brazilAqi < 100 ? 'color-orange' : 'color-red'}`}>
                        {telemetryData.brazilAqi} ({telemetryData.brazilAqi < 50 ? "BOM" : telemetryData.brazilAqi < 100 ? "MODERADO" : "RUIM"})
                      </span>
                    </div>
                    <div className="mini-card">
                      <span className="mini-label">NEW YORK AQI (AR)</span>
                      <span className={`mini-value ${telemetryData.usaAqi < 50 ? 'color-green' : telemetryData.usaAqi < 100 ? 'color-orange' : 'color-red'}`}>
                        {telemetryData.usaAqi} ({telemetryData.usaAqi < 50 ? "BOM" : telemetryData.usaAqi < 100 ? "MODERADO" : "RUIM"})
                      </span>
                    </div>
                  </div>
                  <div className="stat-row">
                    <div className="mini-card">
                      <span className="mini-label">LONDON AQI (AR)</span>
                      <span className={`mini-value ${telemetryData.lnAqi < 50 ? 'color-green' : telemetryData.lnAqi < 100 ? 'color-orange' : 'color-red'}`}>
                        {telemetryData.lnAqi} ({telemetryData.lnAqi < 50 ? "BOM" : telemetryData.lnAqi < 100 ? "MODERADO" : "RUIM"})
                      </span>
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
                      <span className="mini-label">US DOLLAR (USD/BRL)</span>
                      <span className="mini-value color-blue">R$ {telemetryData.usdBrl.toFixed(2)}</span>
                    </div>
                    <div className="mini-card highlight">
                      <span className="mini-label">EURO (EUR/BRL)</span>
                      <span className="mini-value color-blue">R$ {telemetryData.eurBrl.toFixed(2)}</span>
                    </div>
                  </div>
                  <div className="stat-grid-mini">
                    <div className="nano-card">
                      <span className="nano-label">USD INDEX (DXY)</span>
                      <span className="nano-value color-purple">{telemetryData.usd.toFixed(2)}</span>
                    </div>
                    <div className="nano-card">
                      <span className="nano-label">EUR/USD</span>
                      <span className="nano-value color-purple">{telemetryData.eur.toFixed(4)}</span>
                    </div>
                    <div className="nano-card">
                      <span className="nano-label">GBP/USD</span>
                      <span className="nano-value color-purple">{telemetryData.gbp.toFixed(4)}</span>
                    </div>
                    <div className="nano-card">
                      <span className="nano-label">JPY/USD</span>
                      <span className="nano-value color-purple">{telemetryData.jpy.toFixed(2)}</span>
                    </div>
                    <div className="nano-card">
                      <span className="nano-label">CHF/USD</span>
                      <span className="nano-value color-purple">{telemetryData.chf.toFixed(4)}</span>
                    </div>
                  </div>
                </div>

                {/* Section 3: Digital & Geopolitical */}
                <div className="stat-category">
                  <h3 className="cat-title">DIGITAL & GEOPOLITICAL</h3>
                  <div className="stat-row">
                    <div className="mini-card">
                      <span className="mini-label">BITCOIN (BTC)</span>
                      <span className="mini-value color-gold">${telemetryData.btc.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                    </div>
                    <div className="mini-card">
                      <span className="mini-label">ETHEREUM (ETH)</span>
                      <span className="mini-value color-purple">${telemetryData.eth.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                    </div>
                    <div className="mini-card">
                      <span className="mini-label">SOLANA (SOL)</span>
                      <span className="mini-value color-blue">${telemetryData.sol.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                    </div>
                  </div>
                  <div className="stat-row">
                    <div className="mini-card">
                      <span className="mini-label">GITHUB STARS</span>
                      <span className="mini-value color-blue">{telemetryData.gitStars}</span>
                    </div>
                    <div className="mini-card">
                      <span className="mini-label">GITHUB FORKS</span>
                      <span className="mini-value color-purple">{telemetryData.gitForks}</span>
                    </div>
                  </div>
                  <div className="stat-row">
                    <div className="mini-card">
                      <span className="mini-label">GITHUB OPEN ISSUES</span>
                      <span className="mini-value color-red">{telemetryData.gitIssues}</span>
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
                        <span className="mini-label">UNITED STATES (NY)</span>
                        <span className={`mini-value ${telemetryData.usaAqi < 50 ? 'color-green' : telemetryData.usaAqi < 100 ? 'color-orange' : 'color-red'}`}>
                          {telemetryData.usaAqi < 50 ? "LEVEL: NORMAL" : telemetryData.usaAqi < 100 ? "LEVEL: WARNING" : "LEVEL: CRITICAL"}
                        </span>
                      </div>
                      <div className="g3-stat-list">
                        <div className="g3-item"><span className="g3-label">TEMP</span><span className="g3-val">{telemetryData.usaTemp.toFixed(1)}°C</span></div>
                        <div className="g3-item"><span className="g3-label">UMIDADE</span><span className="g3-val">{telemetryData.usaHum}% RH</span></div>
                        <div className="g3-item"><span className="g3-label">VENTO</span><span className="g3-val">{telemetryData.usaWind.toFixed(1)} KM/H</span></div>
                        <div className="g3-item"><span className="g3-label">AQI (AR)</span><span className={`g3-val ${telemetryData.usaAqi < 50 ? 'color-green' : telemetryData.usaAqi < 100 ? 'color-orange' : 'color-red'}`}>{telemetryData.usaAqi}</span></div>
                        <div className="g3-news-card">
                          <span className="nano-label">NOTÍCIA CRÍTICA</span>
                          <p className="nano-text">{spaceNews[0]?.title ? spaceNews[0].title.toUpperCase() : "AGUARDANDO ATUALIZAÇÃO CIBERNÉTICA..."}</p>
                        </div>
                      </div>
                    </div>

                    {/* BRASIL */}
                    <div className="g3-column highlighted">
                      <div className="g3-header-card">
                        <span className="mini-label">BRASIL (SP)</span>
                        <span className={`mini-value ${telemetryData.brazilAqi < 50 ? 'color-green' : telemetryData.brazilAqi < 100 ? 'color-orange' : 'color-red'}`}>
                          {telemetryData.brazilAqi < 50 ? "LEVEL: NORMAL" : telemetryData.brazilAqi < 100 ? "LEVEL: WARNING" : "LEVEL: CRITICAL"}
                        </span>
                      </div>
                      <div className="g3-stat-list">
                        <div className="g3-item"><span className="g3-label">TEMP</span><span className="g3-val">{telemetryData.brazilTemp.toFixed(1)}°C</span></div>
                        <div className="g3-item"><span className="g3-label">UMIDADE</span><span className="g3-val">{telemetryData.brazilHum}% RH</span></div>
                        <div className="g3-item"><span className="g3-label">VENTO</span><span className="g3-val">{telemetryData.brazilWind.toFixed(1)} KM/H</span></div>
                        <div className="g3-item"><span className="g3-label">AQI (AR)</span><span className={`g3-val ${telemetryData.brazilAqi < 50 ? 'color-green' : telemetryData.brazilAqi < 100 ? 'color-orange' : 'color-red'}`}>{telemetryData.brazilAqi}</span></div>
                        <div className="g3-news-card">
                          <span className="nano-label">NOTÍCIA CRÍTICA</span>
                          <p className="nano-text">{spaceNews[1]?.title ? spaceNews[1].title.toUpperCase() : "AGUARDANDO ATUALIZAÇÃO CIBERNÉTICA..."}</p>
                        </div>
                      </div>
                    </div>

                    {/* ISRAEL */}
                    <div className="g3-column">
                      <div className="g3-header-card">
                        <span className="mini-label">ISRAEL (TEL AVIV)</span>
                        <span className={`mini-value ${telemetryData.israelAqi < 50 ? 'color-green' : telemetryData.israelAqi < 100 ? 'color-orange' : 'color-red'}`}>
                          {telemetryData.israelAqi < 50 ? "LEVEL: NORMAL" : telemetryData.israelAqi < 100 ? "LEVEL: WARNING" : "LEVEL: CRITICAL"}
                        </span>
                      </div>
                      <div className="g3-stat-list">
                        <div className="g3-item"><span className="g3-label">TEMP</span><span className="g3-val">{telemetryData.israelTemp.toFixed(1)}°C</span></div>
                        <div className="g3-item"><span className="g3-label">UMIDADE</span><span className="g3-val">{telemetryData.israelHum}% RH</span></div>
                        <div className="g3-item"><span className="g3-label">VENTO</span><span className="g3-val">{telemetryData.israelWind.toFixed(1)} KM/H</span></div>
                        <div className="g3-item"><span className="g3-label">AQI (AR)</span><span className={`g3-val ${telemetryData.israelAqi < 50 ? 'color-green' : telemetryData.israelAqi < 100 ? 'color-orange' : 'color-red'}`}>{telemetryData.israelAqi}</span></div>
                        <div className="g3-news-card">
                          <span className="nano-label">NOTÍCIA CRÍTICA</span>
                          <p className="nano-text">{spaceNews[2]?.title ? spaceNews[2].title.toUpperCase() : "AGUARDANDO ATUALIZAÇÃO CIBERNÉTICA..."}</p>
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
          <>
            {/* Left Panel: Photos */}
            <motion.div 
              className={`detail-panel-left ${isSwitching ? 'panel-flicker' : ''}`}
              initial={{ x: "-100%", opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: "-100%", opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
            >
              <div className="panel-header">
                <span className="panel-id">NODE_{selectedApp?.id.toString().padStart(2, '0')}_SCREENS</span>
                <motion.h2
                  className="panel-title"
                  style={{ color: '#ffffff' }}
                >
                  VISUALIZAÇÃO
                </motion.h2>
              </div>

              <div className="panel-body">
                <AnimatePresence mode="wait">
                  <motion.div 
                    key={selectedApp.id}
                    className="screens-container"
                    initial={{ opacity: 0, x: -20, filter: "brightness(2) blur(10px)" }}
                    animate={{ opacity: 1, x: 0, filter: "brightness(1) blur(0px)" }}
                    exit={{ opacity: 0, x: 20, filter: "brightness(0) blur(10px)" }}
                    transition={{ duration: 0.4, ease: "easeInOut" }}
                  >
                    {["PZ", "ZS", "ZD", "ZE", "ZFy"].includes(selectedApp.name) ? (
                      [1, 2, 3].map((num) => {
                        const baseName = selectedApp.fullName.split(/[-—]/)[0].trim();
                        const normalized = baseName.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
                        const folder = normalized.toLowerCase().replace(/\s/g, '');
                        const pascalName = normalized.split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join('');
                        const fileName = num === 1 ? `${pascalName}Image.png` : `${pascalName}Image${num}.png`;
                        const src = `/screens/${folder}/${fileName}`;
                        
                        return (
                          <motion.div 
                            key={num}
                            className="screen-item"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 + num * 0.05 }}
                            onClick={() => setFullscreenImage(src)}
                          >
                            <img 
                              src={src} 
                              alt={`${selectedApp.fullName} Screenshot ${num}`} 
                              className="screen-img"
                            />
                          </motion.div>
                        );
                      })
                    ) : (
                      <div className="no-screens-production">
                        <div className="construction-icon">🚧</div>
                        <p>Este projeto terá imagens em breve, pois ainda está em produção.</p>
                        <p className="highlight">Previsão: Dezembro de 2026</p>
                      </div>
                    )}
                    
                    {["PZ", "ZS", "ZD", "ZE", "ZFy"].includes(selectedApp.name) && (
                      <div className="no-screens">
                        FIM DOS REGISTROS VISUAIS
                      </div>
                    )}
                  </motion.div>
                </AnimatePresence>
              </div>
            </motion.div>

            {/* Right Panel: Info */}
            <motion.div 
              className={`detail-panel-right ${isSwitching ? 'panel-flicker' : ''}`}
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
                    <div className="vis-circle-neon" style={{ margin: '0 auto 10px' }}></div>
                    <span className="panel-id">PROJETO_{selectedApp?.id.toString().padStart(2, '0')}</span>
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
                      <span className="section-label">GRUPO PARA ACESSO</span>
                      <div style={{ marginTop: '10px' }}>
                        <a 
                          href="https://wa.me/5543996172699" 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="panel-action-btn"
                          style={{ 
                            display: 'block', 
                            textAlign: 'center', 
                            textDecoration: 'none',
                            padding: '12px 18px'
                          }}
                        >
                          {selectedApp?.subName ? selectedApp.subName.toUpperCase() : (selectedApp?.fullName || '').toUpperCase()} ▷
                        </a>
                      </div>
                    </div>

                    <div className="detail-section">
                      <span className="section-label">VISÃO GERAL</span>
                      <p className="section-text">
                        {selectedApp?.longDesc.split('.').filter(s => s.trim()).map((sentence, idx) => (
                          <span key={idx}>
                            {sentence.trim()}.
                            <br /><br />
                          </span>
                        ))}
                      </p>
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
          </>
        )}
      </AnimatePresence>

      {/* Side Buttons */}
      <button 
        className={`side-nav-node left-trigger ${isGlitching ? 'is-glitching' : ''}`} 
        onClick={() => {
          setShowGuide(true);
        }}
        aria-label="Welcome Guide / Enter Node"
      >
        <div className="side-scan-line" />
      </button>
      
      <button 
        className={`side-nav-node right-trigger ${isGlitching ? 'is-glitching' : ''}`}
        onClick={() => {
          setShowGuide(true);
        }}
        aria-label="System Node / Enter Node"
      >
        <div className="side-scan-line" />
      </button>

      {/* Fraternidade Guide Overlay */}
      <AnimatePresence>
        {showGuide && (
          <motion.div 
            className="cute-welcome-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowGuide(false)}
          >
            <motion.div 
              className="cute-welcome-banner"
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 180 }}
              onClick={e => e.stopPropagation()}
            >
              {/* Cute close button */}
              <div className="cute-close-btn" onClick={() => setShowGuide(false)}>×</div>
              
              <div className="cute-welcome-projects-grid">
                {APPS.map((app) => (
                  <img
                    key={app.id}
                    src={app.icon}
                    alt={app.fullName}
                    title={app.fullName}
                    className="cute-welcome-project-icon"
                  />
                ))}
              </div>
              
              <h2 className="cute-title">Bem-vindo(a) à Phantom Troupe!</h2>
              
              <div className="cute-text-content">
                <p style={{ fontWeight: 'bold', fontSize: '1.2rem', color: '#ff3366', marginBottom: '15px' }}>Que bom ter você aqui! ❤️</p>
                <p style={{ marginBottom: '15px' }}>Este é um ecossistema descentralizado criado para acolher, conectar e impulsionar pessoas. A Phantom Troupe é dividida em quatro grandes pilares:</p>
                
                <div style={{ textAlign: 'left', marginTop: '20px', display: 'flex', flexDirection: 'column', gap: '15px', padding: '0 10px' }}>
                  <div>
                    <h4 style={{ color: '#ff3366', fontWeight: 'bold', marginBottom: '4px', display: 'flex', alignItems: 'center', gap: '6px' }}>🤝 1. Acolhimento e Comunidade</h4>
                    <p style={{ margin: 0, fontSize: '0.95rem', lineHeight: '1.4' }}>Um espaço seguro para quem se sente fora dos círculos tradicionais, permitindo criar vínculos reais e encontrar apoio mútuo.</p>
                  </div>
                  
                  <div>
                    <h4 style={{ color: '#ff3366', fontWeight: 'bold', marginBottom: '4px', display: 'flex', alignItems: 'center', gap: '6px' }}>🎨 2. Expressão e Arte</h4>
                    <p style={{ margin: 0, fontSize: '0.95rem', lineHeight: '1.4' }}>Compartilhe sua arte, música, desenho, poesia ou crônicas. O processo criativo aqui é livre de julgamentos e competições.</p>
                  </div>
                  
                  <div>
                    <h4 style={{ color: '#ff3366', fontWeight: 'bold', marginBottom: '4px', display: 'flex', alignItems: 'center', gap: '6px' }}>💬 3. Conexão Espontânea</h4>
                    <p style={{ margin: 0, fontSize: '0.95rem', lineHeight: '1.4' }}>Conecte-se de forma leve, seja em conversas tranquilas, ouvindo músicas juntos, jogando ou apenas dividindo momentos simples.</p>
                  </div>
                  
                  <div>
                    <h4 style={{ color: '#ff3366', fontWeight: 'bold', marginBottom: '4px', display: 'flex', alignItems: 'center', gap: '6px' }}>🚀 4. Missões e Impacto Real</h4>
                    <p style={{ margin: 0, fontSize: '0.95rem', lineHeight: '1.4' }}>Participe da construção do próprio ecossistema através de tarefas de desenvolvimento, design, moderação ou projetos sociais no mundo físico.</p>
                  </div>
                </div>

                <p style={{ marginTop: '20px', fontWeight: 'bold', color: '#5d4037' }}>Chegue como você é. Cada pequena contribuição e cada história importam! ✨</p>
              </div>

              <button 
                className="cute-action-btn"
                onClick={() => setShowGuide(false)}
              >
                Começar ▷
              </button>
            </motion.div>
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
            onClick={() => { setShowMembers(false); setHasRequestedJoin(false); }}
          >
            <div 
              className="guide-inner-wrap" 
              style={{ padding: '40px', transform: 'translateY(-10vh)', position: 'relative' }}
              onClick={e => e.stopPropagation()}
            >
              {/* Modern Cyberpunk Close Button in the panel */}
              <div 
                className="close-btn-membros" 
                onClick={() => { setShowMembers(false); setHasRequestedJoin(false); }}
              >
                ×
              </div>

              <header className="guide-header-section" style={{ marginBottom: '20px', textAlign: 'center' }}>
                <h2 className="guide-heading" style={{ color: 'var(--primary)', textShadow: '0 0 15px rgba(255, 0, 127, 0.5)' }}>▽ 𝕄𝖊𝖒𝖇𝖗𝖔𝖘, ℙ𝖆𝖗𝖈𝖊𝖎𝖗𝖔𝖘 𝖊 𝔸𝖒𝖎𝖌𝖔𝖘 △</h2>
              </header>

              <div className="guide-unified-content" style={{ maxWidth: '600px', width: '100%', display: 'flex', flexDirection: 'column', gap: '30px', transform: 'translateY(-2vh)' }}>
                {/* 1. Seja Membro Form (at the top) */}
                <div className="participation-section" style={{ width: '100%', padding: '25px', background: 'rgba(255, 255, 255, 0.5)', border: '1px solid rgba(255, 101, 132, 0.3)', borderRadius: '6px' }}>
                  {hasRequestedJoin ? (
                    <div className="join-success-msg" style={{ padding: '20px', textAlign: 'center', background: 'rgba(255, 255, 255, 0.8)', border: '1px dashed #ff6584', borderRadius: '4px' }}>
                      <h4 style={{ fontFamily: 'Orbitron, sans-serif', color: '#ff007f', fontSize: '1.1rem', margin: '0 0 10px 0', letterSpacing: '1px' }}>✓ SOLICITAÇÃO REGISTRADA</h4>
                      <p style={{ margin: 0, fontSize: '0.85rem', color: '#333333', lineHeight: '1.4' }}>
                        Sua solicitação de participação no projeto foi enviada com sucesso!
                      </p>
                    </div>
                  ) : (
                    <>
                      <h3 style={{ fontFamily: 'Orbitron, sans-serif', fontSize: '1.1rem', color: 'var(--primary)', letterSpacing: '2px', textTransform: 'uppercase', borderBottom: '1px solid rgba(255, 101, 132, 0.2)', paddingBottom: '10px', marginBottom: '20px', textAlign: 'center' }}>
                        SEJA MEMBRO
                      </h3>
                      <p style={{ marginBottom: '25px', textAlign: 'center', fontSize: '0.9rem', lineHeight: '1.5', color: '#333333' }}>
                        Você sente que este é o seu caminho?<br />Venha construir conosco este novo ciclo.
                      </p>
                      
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', alignItems: 'center', width: '100%' }}>
                        <input 
                          type="text" 
                          placeholder="SEU NOME" 
                          value={joiningName}
                          onChange={e => setJoiningName(e.target.value)}
                          className="phantom-input center-text" 
                        />
                        {joiningRoles.length > 0 && (
                          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', justifyContent: 'center', margin: '4px 0 8px 0', width: '100%' }}>
                            <span style={{ fontSize: '0.7rem', color: '#ff6584', fontFamily: 'Orbitron, sans-serif', width: '100%', textAlign: 'center', letterSpacing: '1px' }}>
                              FUNÇÕES SELECIONADAS ({joiningRoles.length}/2):
                            </span>
                            {joiningRoles.map((role) => (
                              <span 
                                key={role} 
                                onClick={() => setJoiningRoles(prev => prev.filter(r => r !== role))}
                                style={{ 
                                  background: '#ff6584', 
                                  color: '#fff', 
                                  fontSize: '0.75rem', 
                                  padding: '4px 10px', 
                                  borderRadius: '15px', 
                                  cursor: 'pointer', 
                                  display: 'flex', 
                                  alignItems: 'center', 
                                  gap: '6px',
                                  fontFamily: 'Orbitron, sans-serif',
                                  boxShadow: '0 2px 5px rgba(255, 101, 132, 0.4)'
                                }}
                                title="Clique para remover"
                              >
                                ✓ {role} <span style={{ fontWeight: 'bold', marginLeft: '2px' }}>×</span>
                              </span>
                            ))}
                          </div>
                        )}

                        <select
                          className="phantom-input center-text phantom-select" 
                          value=""
                          onChange={e => {
                            const val = e.target.value;
                            if (!val) return;
                            if (joiningRoles.includes(val)) {
                              setJoiningRoles(prev => prev.filter(r => r !== val));
                            } else {
                              if (joiningRoles.length >= 2) {
                                alert("Você pode selecionar no máximo 2 funções!");
                              } else {
                                setJoiningRoles(prev => [...prev, val]);
                              }
                            }
                          }}
                        >
                          <option value="" disabled>SELECIONE SUA FUNÇÃO (MÁXIMO 2)</option>
                          <optgroup label="🎨 Artes Visuais">
                            {["Pintor","Ilustrador","Desenhista","Artista Visual","Muralista","Grafiteiro","Escultor","Fotógrafo","Colagista","Gravurista","Retratista","Colorista","Arte-Educador","Curador Artístico","Diretor de Arte"].map(r => <option key={r} value={r} style={{ background: '#e8f5e9', color: '#2e7d32' }}>{joiningRoles.includes(r) ? `✓ ${r} (SELECIONADO)` : r}</option>)}
                          </optgroup>
                          <optgroup label="✍️ Escrita e Poesia">
                            {["Poeta","Escritor","Compositor","Cronista","Contista","Roteirista","Narrador","Letrista","Declamador","Slammer","Contador de Histórias","Criador Literário","Guardião das Palavras","Tecelão de Histórias"].map(r => <option key={r} value={r} style={{ background: '#e3f2fd', color: '#1565c0' }}>{joiningRoles.includes(r) ? `✓ ${r} (SELECIONADO)` : r}</option>)}
                          </optgroup>
                          <optgroup label="🎵 Música">
                            {["Compositor Musical","Músico","Cantor","Instrumentista","Produtor Musical","Beatmaker","DJ","Arranjador","Intérprete Musical","Criador Sonoro","Maestro","Regente","Pesquisador Musical"].map(r => <option key={r} value={r} style={{ background: '#fff3e0', color: '#e65100' }}>{joiningRoles.includes(r) ? `✓ ${r} (SELECIONADO)` : r}</option>)}
                          </optgroup>
                          <optgroup label="🎭 Teatro e Performance">
                            {["Ator","Atriz","Performista","Diretor Teatral","Dramaturgo","Cenógrafo","Figurinista","Coreógrafo","Dançarino","Intérprete","Artista Cênico","Mestre de Cerimônias"].map(r => <option key={r} value={r} style={{ background: '#fce4ec', color: '#c62828' }}>{joiningRoles.includes(r) ? `✓ ${r} (SELECIONADO)` : r}</option>)}
                          </optgroup>
                          <optgroup label="🎬 Audiovisual e Digital">
                            {["Cineasta","Videomaker","Editor de Vídeo","Animador","Motion Designer","Designer","Criador Digital","Diretor Criativo","Produtor Audiovisual","Streamer","Criador de Conteúdo","Documentarista"].map(r => <option key={r} value={r} style={{ background: '#e8eaf6', color: '#283593' }}>{joiningRoles.includes(r) ? `✓ ${r} (SELECIONADO)` : r}</option>)}
                          </optgroup>
                          <optgroup label="👑 Direção">
                            {["Fundador","Cofundador","Diretor Geral","Vice-Diretor"].map(r => <option key={r} value={r} style={{ background: '#fff9c4', color: '#f57f17' }}>{joiningRoles.includes(r) ? `✓ ${r} (SELECIONADO)` : r}</option>)}
                          </optgroup>
                          <optgroup label="📋 Gestão">
                            {["Coordenador Geral","Coordenador de Núcleo","Gestor de Projetos","Administrador","Supervisor"].map(r => <option key={r} value={r} style={{ background: '#e0f7fa', color: '#00695c' }}>{joiningRoles.includes(r) ? `✓ ${r} (SELECIONADO)` : r}</option>)}
                          </optgroup>
                          <optgroup label="🤝 Comunidade">
                            {["Gestor de Pessoas","Moderador","Mediador","Coordenador de Membros","Mentor"].map(r => <option key={r} value={r} style={{ background: '#f3e5f5', color: '#6a1b9a' }}>{joiningRoles.includes(r) ? `✓ ${r} (SELECIONADO)` : r}</option>)}
                          </optgroup>
                          <optgroup label="⚙️ Operações">
                            {["Organizador","Coordenador de Eventos","Gestor de Operações","Responsável por Parcerias"].map(r => <option key={r} value={r} style={{ background: '#efebe9', color: '#4e342e' }}>{joiningRoles.includes(r) ? `✓ ${r} (SELECIONADO)` : r}</option>)}
                          </optgroup>
                          <optgroup label="📢 Comunicação">
                            {["Coordenador de Comunicação","Gestor de Redes Sociais","Relações Públicas","Porta-Voz"].map(r => <option key={r} value={r} style={{ background: '#e0f2f1', color: '#00796b' }}>{joiningRoles.includes(r) ? `✓ ${r} (SELECIONADO)` : r}</option>)}
                          </optgroup>
                          <optgroup label="📊 Recursos e Estratégia">
                            {["Gestor Financeiro","Tesoureiro","Coordenador Estratégico"].map(r => <option key={r} value={r} style={{ background: '#fbe9e7', color: '#bf360c' }}>{joiningRoles.includes(r) ? `✓ ${r} (SELECIONADO)` : r}</option>)}
                          </optgroup>
                        </select>
                        <select 
                          className="phantom-input center-text phantom-select" 
                          value={joiningType} 
                          onChange={e => setJoiningType(e.target.value)}
                        >
                          <option value="" disabled>SELECIONAR O PROJETO</option>
                          {APPS.map(app => (
                            <option key={app.id} value={app.fullName}>{app.fullName}</option>
                          ))}
                        </select>
                        <button 
                          className="guide-page-btn btn-next btn-grey"
                          style={{ marginTop: '10px', width: '100%' }}
                          onClick={() => {
                            if (joiningName.trim() && joiningRoles.length > 0 && joiningType.trim()) {
                              setPendingRequests(prev => [...prev, { name: joiningName, role: joiningRoles.join(" & "), type: joiningType }]);
                              setJoiningName("");
                              setJoiningRoles([]);
                              setJoiningType("");
                              setHasRequestedJoin(true);
                            } else {
                              alert("Por favor, preencha seu Nome, selecione pelo menos 1 Função e escolha um Projeto!");
                            }
                          }}
                        >
                          ENVIAR SOLICITAÇÃO ▷
                        </button>
                      </div>
                    </>
                  )}
                </div>

                {/* Horizontal Divider Line */}
                <div style={{ height: '1px', background: 'rgba(255, 101, 132, 0.2)', width: '100%', margin: '20px 0' }}></div>

                {/* 3. Registered Members List (at the bottom) */}
                <div style={{ display: 'flex', flexDirection: 'column', width: '100%', alignItems: 'center' }}>
                  <h3 style={{ fontFamily: 'Orbitron, sans-serif', fontSize: '1rem', color: 'var(--primary)', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '20px', textAlign: 'center' }}>
                    MEMBROS ATIVOS
                  </h3>
                  <div 
                    className="members-list" 
                    style={{ 
                      width: '100%', 
                      maxHeight: '320px', 
                      overflowY: 'auto', 
                      paddingRight: '10px' 
                    }}
                  >
                    {activeMembers.map((member, i) => (
                      <div key={i} className="member-card" style={{ padding: '15px', marginBottom: '10px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '5px' }}>
                          <p style={{ margin: '0', textTransform: 'uppercase', fontSize: '0.85rem', letterSpacing: '2px' }}>{member.role}</p>
                          <span style={{ fontSize: '0.7rem', padding: '2px 8px', borderRadius: '12px' }}>{member.type}</span>
                        </div>
                        <h3 style={{ margin: 0, fontSize: '1.25rem' }}>{member.name}</h3>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 4. Requests Center Button (now at the bottom) */}
                <button 
                  className="guide-page-btn btn-grey" 
                  style={{ fontSize: '0.8rem', padding: '10px 20px', borderStyle: 'dashed', margin: '0 auto', display: 'block' }}
                  onClick={() => setShowPending(true)}
                  title="Abrir Central de Requisições"
                >
                  <span style={{ fontSize: '1.2rem', marginRight: '8px', verticalAlign: 'middle' }}>🗲</span> 𝕊𝖔𝖑𝖎𝖈𝖎𝖙𝖆𝖈̧𝖔̃𝖊𝖘 ℙ𝖊𝖓𝖉𝖊𝖓𝖙𝖊𝖘
                </button>
              </div>

              <footer className="guide-footer-branding" style={{ marginTop: '20px', transform: 'translateY(-2vh)' }}>
                <h2 className="guide-heading" style={{ color: '#ff007f', textShadow: '0 0 15px rgba(255, 0, 127, 0.3)', fontSize: '1.2rem' }}>▽ 𝕁𝖔𝖎𝖓 𝖙𝖍𝖊 ℙ𝖍𝖆𝖓𝖙𝖔𝖒 𝕋𝖗𝖔𝖚𝖕𝖊 △</h2>
              </footer>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Ajudas e Doações Overlay */}
      <AnimatePresence>
        {showDonations && (
          <motion.div 
            className="guide-overlay-container members-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => { setShowDonations(false); setHasRequestedDonation(false); }}
          >
            <div 
              className="guide-inner-wrap" 
              style={{ padding: '40px', transform: 'translateY(-10vh)', position: 'relative' }}
              onClick={e => e.stopPropagation()}
            >
              {/* Close Button */}
              <div 
                className="close-btn-membros" 
                style={{ position: 'absolute', top: '20px', right: '25px', fontSize: '2rem', color: '#ff6584', cursor: 'pointer' }}
                onClick={() => { setShowDonations(false); setHasRequestedDonation(false); }}
              >
                ×
              </div>

              <header className="guide-header-section" style={{ marginBottom: '20px', textAlign: 'center' }}>
                <h2 className="guide-heading" style={{ color: 'var(--primary)', textShadow: '0 0 15px rgba(255, 0, 127, 0.5)' }}>▽ 𝔸𝖏𝖚𝖉𝖆𝖘 𝖊 𝔻𝖔𝖆𝖈̧𝖔̃𝖊𝖘 △</h2>
              </header>

              <div className="guide-unified-content" style={{ maxWidth: '600px', width: '100%', display: 'flex', flexDirection: 'column', gap: '20px', transform: 'translateY(-2vh)' }}>
                
                {/* Info Text about Donations */}
                <p style={{ margin: '0 0 10px 0', fontSize: '0.9rem', lineHeight: '1.5', color: '#333333', textAlign: 'center' }}>
                  A Phantom Troupe é mantida por colaboração mútua. Você pode nos ajudar com equipamentos para oficinas, ferramentas de desenvolvimento ou apoio financeiro direto.
                </p>

                {hasRequestedDonation ? (
                  <div className="join-success-msg" style={{ padding: '25px', textAlign: 'center', background: 'rgba(255, 255, 255, 0.8)', border: '1px dashed #ff6584', borderRadius: '4px' }}>
                    <h4 style={{ fontFamily: 'Orbitron, sans-serif', color: '#ff007f', fontSize: '1.1rem', margin: '0 0 10px 0', letterSpacing: '1px' }}>✓ SOLICITAÇÃO REGISTRADA</h4>
                    <p style={{ margin: 0, fontSize: '0.85rem', color: '#333333', lineHeight: '1.4' }}>
                      Sua proposta de ajuda/doação foi enviada com sucesso! Entraremos em contato em breve para alinhar os detalhes. Agradecemos muito pelo apoio! ❤️
                    </p>
                    <button 
                      className="guide-page-btn btn-grey" 
                      style={{ marginTop: '15px', padding: '8px 20px', fontSize: '0.8rem' }}
                      onClick={() => setHasRequestedDonation(false)}
                    >
                      REALIZAR OUTRA DOAÇÃO
                    </button>
                  </div>
                ) : (
                  <div className="participation-section" style={{ width: '100%', padding: '25px', background: 'rgba(255, 255, 255, 0.5)', border: '1px solid rgba(255, 101, 132, 0.3)', borderRadius: '6px', display: 'flex', flexDirection: 'column', gap: '15px' }}>
                    <h3 style={{ fontFamily: 'Orbitron, sans-serif', fontSize: '1.1rem', color: 'var(--primary)', letterSpacing: '2px', textTransform: 'uppercase', borderBottom: '1px solid rgba(255, 101, 132, 0.2)', paddingBottom: '10px', marginBottom: '10px', textAlign: 'center' }}>
                      REGISTRAR DOAÇÃO
                    </h3>
                    
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', alignItems: 'center', width: '100%' }}>
                      <input 
                        type="text" 
                        placeholder="SEU NOME" 
                        value={donorName}
                        onChange={e => setDonorName(e.target.value)}
                        className="phantom-input center-text" 
                      />
                      
                      <input 
                        type="text" 
                        placeholder="CONTATO (WHATSAPP OU E-MAIL)" 
                        value={donorContact}
                        onChange={e => setDonorContact(e.target.value)}
                        className="phantom-input center-text" 
                      />

                      <select 
                        className="phantom-input center-text phantom-select" 
                        value={donationType} 
                        onChange={e => setDonationType(e.target.value)}
                      >
                        <option value="" disabled>TIPO DE AJUDA / DOAÇÃO</option>
                        <option value="Apoio Financeiro (PIX)">Apoio Financeiro (PIX)</option>
                        <option value="Objetos (Livros, Roupas, etc.)">Objetos (Livros, Roupas, etc.)</option>
                        <option value="Equipamentos (Computadores, etc.)">Equipamentos (Computadores, etc.)</option>
                        <option value="Ferramentas (Trabalho, etc.)">Ferramentas (Trabalho, etc.)</option>
                        <option value="Instrumentos (Música, Som, etc.)">Instrumentos (Música, Som, etc.)</option>
                        <option value="Outros">Outros</option>
                      </select>

                      {donationType === "Apoio Financeiro (PIX)" && (
                        <div className="pix-donation-box" style={{ background: 'rgba(255, 255, 255, 0.85)', border: '1px dashed #ff6584', borderRadius: '6px', padding: '15px', textAlign: 'center', width: '100%', boxSizing: 'border-box', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px' }}>
                          <p style={{ fontSize: '0.85rem', color: '#333333', margin: 0, lineHeight: '1.4' }}>
                            Escaneie o QR Code ou copie a chave CPF abaixo para realizar a transferência via Banco Inter:
                          </p>
                          
                          {/* QR Code Image */}
                          <div style={{ background: '#fff', padding: '8px', borderRadius: '6px', border: '1px solid rgba(255,101,132,0.2)', display: 'flex', justifyContent: 'center', alignItems: 'center', width: '150px', height: '150px', boxShadow: '0 0 10px rgba(0,0,0,0.05)' }}>
                            <img 
                              src="/pix_qrcode.jpg" 
                              alt="Banco Inter PIX QR Code" 
                              style={{ width: '100%', height: '100%', objectFit: 'contain', borderRadius: '4px' }} 
                            />
                          </div>
                          
                          <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', alignItems: 'center', background: 'rgba(255,255,255,0.9)', padding: '8px 12px', borderRadius: '4px', border: '1px solid rgba(255,101,132,0.3)', width: '100%', boxSizing: 'border-box' }}>
                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', maxWidth: '70%', textAlign: 'left' }}>
                              <span style={{ fontSize: '0.65rem', color: '#ff6584', fontWeight: 'bold', fontFamily: 'Orbitron, sans-serif' }}>CHAVE CPF (BANCO INTER)</span>
                              <code style={{ fontSize: '0.9rem', color: '#ff3366', fontFamily: 'monospace', fontWeight: 'bold' }}>478.631.358-00</code>
                            </div>
                            <button 
                              onClick={() => {
                                navigator.clipboard.writeText('47863135800');
                                setCopiedPix(true);
                                setTimeout(() => setCopiedPix(false), 2000);
                              }}
                              style={{ background: '#ff6584', border: 'none', color: '#fff', padding: '8px 15px', borderRadius: '4px', fontSize: '0.75rem', cursor: 'pointer', fontFamily: 'Orbitron, sans-serif', fontWeight: 'bold', alignSelf: 'center' }}
                            >
                              {copiedPix ? "COPIADO!" : "COPIAR"}
                            </button>
                          </div>
                        </div>
                      )}

                      {/* Botão de Adicionar Imagem do Projeto */}
                      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', gap: '6px', marginBottom: '10px' }}>
                        <label 
                          className="guide-page-btn btn-grey" 
                          style={{ cursor: 'pointer', fontSize: '0.8rem', padding: '8px 15px', display: 'flex', alignItems: 'center', gap: '8px', borderStyle: 'dashed', marginTop: 0 }}
                        >
                          ADICIONAR IMAGEM DO PROJETO
                          <input 
                            type="file" 
                            accept="image/*" 
                            style={{ display: 'none' }} 
                            onChange={async (e) => {
                              const file = e.target.files?.[0];
                              if (file) {
                                const base64 = await resizeImage(file);
                                setDonationImage(base64);
                              }
                            }}
                          />
                        </label>
                        <span style={{ fontSize: '0.68rem', color: '#ff6584', fontFamily: 'Orbitron, sans-serif', letterSpacing: '1px', textTransform: 'uppercase' }}>
                          A IMAGEM É OPCIONAL
                        </span>
                        {donationImage && (
                          <div style={{ position: 'relative', width: '80px', height: '80px', border: '1px solid rgba(255, 101, 132, 0.4)', borderRadius: '4px', overflow: 'hidden', background: '#fff', marginTop: '4px' }}>
                            <img src={donationImage} alt="Preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                            <button 
                              onClick={() => setDonationImage(null)}
                              style={{ position: 'absolute', top: '2px', right: '2px', background: 'rgba(0,0,0,0.6)', border: 'none', color: '#fff', borderRadius: '50%', width: '18px', height: '18px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '10px', cursor: 'pointer', padding: 0 }}
                            >
                              ×
                            </button>
                          </div>
                        )}
                      </div>

                      <input 
                        type="text" 
                        placeholder="TÍTULO DA DOAÇÃO" 
                        value={donationTitle}
                        onChange={e => setDonationTitle(e.target.value)}
                        className="phantom-input center-text" 
                      />

                      <textarea 
                        placeholder="O QUE ESTÁ SENDO DOADO (Itens, quantidades, marca, etc.)" 
                        value={donationItems}
                        onChange={e => setDonationItems(e.target.value)}
                        className="phantom-input center-text" 
                        style={{ height: '70px', padding: '8px', fontFamily: 'inherit', resize: 'none', textAlign: 'center' }}
                      />

                      <textarea 
                        placeholder="DEPOIMENTO DE DOAÇÃO (Deixe uma mensagem para o mural, opcional)" 
                        value={donationTestimonial}
                        onChange={e => setDonationTestimonial(e.target.value)}
                        className="phantom-input center-text" 
                        style={{ height: '60px', padding: '8px', fontFamily: 'inherit', resize: 'none', textAlign: 'center' }}
                      />

                      <button 
                        className="guide-page-btn btn-next btn-grey"
                        style={{ marginTop: '10px', width: '100%' }}
                        onClick={() => {
                          if (donorName.trim() && donorContact.trim() && donationType.trim() && donationTitle.trim() && donationItems.trim()) {
                            // 1. Registrar doação pendente (para o painel administrativo)
                            const donationItem = { 
                              name: donorName, 
                              contact: donorContact, 
                              type: donationType, 
                              title: donationTitle,
                              items: donationItems,
                              testimonial: donationTestimonial,
                              image: donationImage
                            };
                            setPendingDonations(prev => [...prev, donationItem]);

                            // 2. Resetar estados do formulário
                            setDonorName("");
                            setDonorContact("");
                            setDonationType("");
                            setDonationTitle("");
                            setDonationItems("");
                            setDonationTestimonial("");
                            setDonationImage(null);
                            setHasRequestedDonation(true);
                          } else {
                            alert("Por favor, preencha o Nome, Contato, Tipo, Título e Itens a serem doados!");
                          }
                        }}
                      >
                        REGISTRAR DOAÇÃO ▷
                      </button>
                    </div>
                  </div>
                )}
              </div>
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
                        // Fallback para versão web / mobile
                        const isMobile = window.innerWidth <= 768;
                        const url = (isMobile && (selectedApp as any).mobileDownloadUrl) 
                          ? (selectedApp as any).mobileDownloadUrl 
                          : (selectedApp.downloadUrl || "");
                        window.open(url, "_blank");
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
            className="guide-overlay-container pending-requests-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowPending(false)}
            style={{ zIndex: 12000 }}
          >
            <div 
              className="guide-inner-wrap pending-inner-wrap" 
              style={{ padding: '40px', transform: 'translateY(-10vh)', position: 'relative' }}
              onClick={e => e.stopPropagation()}
            >
              {/* Cyberpunk Inner Close Button */}
              <div 
                className="close-btn-pending" 
                onClick={() => setShowPending(false)}
              >
                ×
              </div>

              <header className="guide-header-section" style={{ marginBottom: '30px', textAlign: 'center' }}>
                <h2 className="guide-heading" style={{ color: '#FF007F', textShadow: '0 0 15px rgba(255, 0, 127, 0.5)' }}>▽ 𝕊𝖔𝖑𝖎𝖈𝖎𝖙𝖆𝖈̧𝖔̃𝖊𝖘 ℙ𝖊𝖓𝖉𝖊𝖓𝖙𝖊𝖘 △</h2>
              </header>

              <div className="guide-unified-content" style={{ display: 'flex', flexDirection: 'column', gap: '20px', alignItems: 'center' }}>
                {!isAdminAuth ? (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', alignItems: 'center', width: '100%', maxWidth: '300px' }}>
                    <p style={{ color: '#FF007F', letterSpacing: '2px', fontSize: '0.9rem' }}>ACESSO RESTRITO</p>
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
                    {authError && <span style={{ color: '#FF007F', fontSize: '0.8rem', letterSpacing: '1px' }}>CREDENCIAS INVÁLIDAS</span>}
                  </div>
                ) : (
                  <div style={{ width: '100%', maxWidth: '600px', display: 'flex', flexDirection: 'column', gap: '30px' }}>
                    {/* Seção Membros */}
                    <div style={{ width: '100%' }}>
                      <h3 style={{ fontFamily: 'Orbitron, sans-serif', fontSize: '1rem', color: '#FF007F', letterSpacing: '2px', borderBottom: '1px solid rgba(255, 0, 127, 0.2)', paddingBottom: '8px', marginBottom: '15px', textAlign: 'center' }}>
                        MEMBROS PENDENTES
                      </h3>
                      {pendingRequests.length === 0 ? (
                        <p style={{ color: '#a0a0a0', letterSpacing: '2px', fontSize: '0.9rem', textAlign: 'center' }}>NENHUMA SOLICITAÇÃO DE MEMBRO</p>
                      ) : (
                        <div className="members-list" style={{ width: '100%', maxHeight: '200px', overflowY: 'auto' }}>
                          {pendingRequests.map((req, i) => (
                            <div key={i} className="member-card" style={{ border: '1px solid rgba(255, 0, 127, 0.3)', padding: '12px', marginBottom: '8px', borderRadius: '4px', background: 'rgba(255, 0, 127, 0.05)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                              <div>
                                <div style={{ display: 'flex', gap: '10px', alignItems: 'center', marginBottom: '3px' }}>
                                  <p style={{ color: '#FF007F', margin: '0', textTransform: 'uppercase', fontSize: '0.8rem', letterSpacing: '2px' }}>{req.role}</p>
                                  <span style={{ fontSize: '0.65rem', color: '#FF007F', border: '1px solid #FF007F', padding: '1px 4px', borderRadius: '4px' }}>{req.type}</span>
                                </div>
                                <h3 style={{ margin: 0, fontSize: '1.15rem' }}>{req.name}</h3>
                              </div>
                              <button 
                                className="silver-btn" 
                                style={{ padding: '6px 15px', fontSize: '0.75rem' }}
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
                    </div>

                    {/* Seção Doações Pendentes */}
                    <div style={{ width: '100%' }}>
                      <h3 style={{ fontFamily: 'Orbitron, sans-serif', fontSize: '1rem', color: '#FF007F', letterSpacing: '2px', borderBottom: '1px solid rgba(255, 0, 127, 0.2)', paddingBottom: '8px', marginBottom: '15px', textAlign: 'center' }}>
                        SOLICITAÇÕES PENDENTES
                      </h3>
                      {pendingDonations.length === 0 ? (
                        <p style={{ color: '#a0a0a0', letterSpacing: '2px', fontSize: '0.9rem', textAlign: 'center' }}>NENHUMA SOLICITAÇÃO PENDENTE</p>
                      ) : (
                        <div className="members-list" style={{ width: '100%', maxHeight: '200px', overflowY: 'auto' }}>
                          {pendingDonations.map((don, i) => (
                            <div key={i} className="member-card" style={{ border: '1px solid rgba(255, 0, 127, 0.3)', padding: '12px', marginBottom: '8px', borderRadius: '4px', background: 'rgba(255, 0, 127, 0.05)', display: 'flex', flexDirection: 'column', gap: '10px', alignItems: 'stretch' }}>
                              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <div>
                                  <span style={{ fontSize: '0.65rem', color: '#FF007F', border: '1px solid #FF007F', padding: '2px 6px', borderRadius: '4px', textTransform: 'uppercase', letterSpacing: '1px' }}>{don.type}</span>
                                  <h3 style={{ margin: '5px 0 0 0', fontSize: '1.15rem', color: '#ffffff' }}>{don.name}</h3>
                                </div>
                                <div style={{ display: 'flex', gap: '8px', alignSelf: 'center' }}>
                                  <button 
                                    className="silver-btn" 
                                    style={{ padding: '6px 12px', fontSize: '0.7rem', background: '#00ff66', border: '1px solid #00cc55', color: '#000', fontWeight: 'bold' }}
                                    onClick={() => {
                                      // 1. Publicar no mural de Registros público
                                      const newRecord = {
                                        id: Date.now().toString(),
                                        date: new Date().toLocaleDateString('pt-BR'),
                                        name: don.name,
                                        contact: don.contact,
                                        type: don.type,
                                        title: don.title,
                                        items: don.items,
                                        testimonial: don.testimonial,
                                        image: don.image
                                      };
                                      setDonationsList(prev => [...prev, newRecord]);
                                      // 2. Salvar no histórico como aprovada
                                      setDonationsHistory(prev => [...prev, { ...don, status: 'approved', date: new Date().toLocaleDateString('pt-BR') }]);
                                      // 3. Remover das solicitações pendentes
                                      setPendingDonations(prev => prev.filter((_, idx) => idx !== i));
                                    }}
                                  >
                                    APROVAR
                                  </button>
                                  <button 
                                    className="silver-btn" 
                                    style={{ padding: '6px 12px', fontSize: '0.7rem' }}
                                    onClick={() => {
                                      // 1. Salvar no histórico como rejeitada
                                      setDonationsHistory(prev => [...prev, { ...don, status: 'rejected', date: new Date().toLocaleDateString('pt-BR') }]);
                                      // 2. Remover de pendentes
                                      setPendingDonations(prev => prev.filter((_, idx) => idx !== i));
                                    }}
                                  >
                                    REJEITAR
                                  </button>
                                </div>
                              </div>
                              <div style={{ display: 'flex', gap: '15px', alignItems: 'flex-start', flexWrap: 'wrap', borderTop: '1px solid rgba(255, 0, 127, 0.1)', paddingTop: '10px' }}>
                                {don.image && (
                                  <div style={{ width: '60px', height: '60px', border: '1px solid rgba(255, 0, 127, 0.2)', borderRadius: '4px', overflow: 'hidden', background: '#fff', flexShrink: 0 }}>
                                    <img src={don.image} alt={don.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                  </div>
                                )}
                                <div style={{ flex: 1, minWidth: '150px', display: 'flex', flexDirection: 'column', gap: '4px', fontSize: '0.8rem', color: '#ffffff' }}>
                                  <p style={{ margin: 0 }}><strong>Contato:</strong> {don.contact}</p>
                                  <p style={{ margin: 0 }}><strong>Título:</strong> {don.title}</p>
                                  <p style={{ margin: 0 }}><strong>Itens:</strong> {don.items}</p>
                                  {don.testimonial && <p style={{ margin: 0 }}><strong>Depoimento:</strong> {don.testimonial}</p>}
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Botão para ver Histórico de Tentativas */}
                      <button 
                        className="guide-page-btn btn-grey" 
                        style={{ marginTop: '15px', width: '100%', fontSize: '0.8rem', padding: '10px' }}
                        onClick={() => setShowDonationsHistory(!showDonationsHistory)}
                      >
                        {showDonationsHistory ? '▲ OCULTAR HISTÓRICO' : '▼ HISTÓRICO DE TENTATIVAS DE REGISTRO'}
                      </button>

                      {showDonationsHistory && (
                        <div style={{ marginTop: '10px', width: '100%', maxHeight: '250px', overflowY: 'auto' }}>
                          {donationsHistory.length === 0 ? (
                            <p style={{ color: '#a0a0a0', letterSpacing: '1px', fontSize: '0.85rem', textAlign: 'center' }}>NENHUM HISTÓRICO AINDA</p>
                          ) : (
                            [...donationsHistory].reverse().map((h, i) => (
                              <div key={i} style={{ border: `1px solid ${h.status === 'approved' ? 'rgba(0, 255, 102, 0.4)' : 'rgba(255, 60, 60, 0.4)'}`, padding: '10px', marginBottom: '6px', borderRadius: '4px', background: h.status === 'approved' ? 'rgba(0, 255, 102, 0.08)' : 'rgba(255, 60, 60, 0.08)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
                                  <span style={{ fontSize: '0.75rem', fontWeight: 'bold', color: '#ffffff' }}>{h.name}</span>
                                  <span style={{ fontSize: '0.65rem', color: '#cccccc' }}>{h.title} — {h.type}</span>
                                  <span style={{ fontSize: '0.6rem', color: '#999999' }}>{h.date}</span>
                                </div>
                                <span style={{ 
                                  fontSize: '0.65rem', 
                                  fontFamily: 'Orbitron, sans-serif',
                                  letterSpacing: '1px',
                                  padding: '3px 8px', 
                                  borderRadius: '4px', 
                                  background: h.status === 'approved' ? 'rgba(0, 255, 102, 0.2)' : 'rgba(255, 60, 60, 0.2)',
                                  color: h.status === 'approved' ? '#00ff66' : '#ff3c3c',
                                  border: `1px solid ${h.status === 'approved' ? '#00ff66' : '#ff3c3c'}`
                                }}>
                                  {h.status === 'approved' ? 'APROVADA' : 'REJEITADA'}
                                </span>
                              </div>
                            ))
                          )}
                        </div>
                      )}

                      {/* Botão para gerenciar registros publicados no Mural */}
                      <button 
                        className="guide-page-btn btn-grey" 
                        style={{ marginTop: '10px', width: '100%', fontSize: '0.8rem', padding: '10px' }}
                        onClick={() => setShowPublishedDonations(!showPublishedDonations)}
                      >
                        {showPublishedDonations ? '▲ OCULTAR REGISTROS DO MURAL' : '▼ GERENCIAR REGISTROS PUBLICADOS NO MURAL'}
                      </button>

                      {showPublishedDonations && (
                        <div style={{ marginTop: '10px', width: '100%', maxHeight: '250px', overflowY: 'auto' }}>
                          {donationsList.length === 0 ? (
                            <p style={{ color: '#a0a0a0', letterSpacing: '1px', fontSize: '0.85rem', textAlign: 'center' }}>NENHUM REGISTRO PUBLICADO NO MURAL</p>
                          ) : (
                            [...donationsList].reverse().map((rec) => (
                              <div key={rec.id} style={{ border: '1px solid rgba(255, 0, 127, 0.3)', padding: '10px', marginBottom: '6px', borderRadius: '4px', background: 'rgba(255, 255, 255, 0.05)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
                                  <span style={{ fontSize: '0.75rem', fontWeight: 'bold', color: '#ffffff' }}>{rec.title} ({rec.name})</span>
                                  <span style={{ fontSize: '0.65rem', color: '#cccccc' }}>{rec.type} — {rec.date}</span>
                                </div>
                                <button 
                                  className="silver-btn" 
                                  style={{ padding: '4px 10px', fontSize: '0.65rem', background: '#ff3366', border: 'none', color: '#fff' }}
                                  onClick={() => {
                                    setDonationsList(prev => prev.filter(item => item.id !== rec.id));
                                  }}
                                >
                                  REMOVER
                                </button>
                              </div>
                            ))
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>


      {/* World Time Selector Modal */}
      <AnimatePresence>
        {showTimeSelector && (
          <motion.div 
            className="time-selector-overlay"
            initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
            animate={{ opacity: 1, backdropFilter: "blur(15px)" }}
            exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
            onClick={() => setShowTimeSelector(false)}
          >
            <motion.div 
              className="time-selector-content"
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="selector-header">
                <h3>REDE MUNDIAL DE SINCRONIA</h3>
                <p>SELECIONE O PONTO DE REFERÊNCIA TEMPORAL</p>
                <button className="close-selector" onClick={() => setShowTimeSelector(false)}>×</button>
              </div>

              <div className="location-grid">
                {LOCATIONS.map((loc, idx) => {
                  const isSelected = selectedLocation.tz === loc.tz;
                  return (
                    <motion.div 
                      key={idx}
                      className={`location-card ${isSelected ? 'active' : ''}`}
                      whileHover={{ scale: 1.02, backgroundColor: "rgba(255, 0, 127, 0.15)" }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => {
                        setSelectedLocation(loc);
                        setShowTimeSelector(false);
                      }}
                    >
                      <div className="loc-icon">{loc.icon}</div>
                      <div className="loc-info">
                        <span className="loc-name">{loc.name}</span>
                        <span className="loc-time">
                          {currentTime.toLocaleTimeString('pt-BR', { timeZone: loc.tz })}
                        </span>
                      </div>
                      {isSelected && <div className="active-indicator"></div>}
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Fullscreen Image Gallery Modal */}
      <AnimatePresence>
        {fullscreenImage && (
          <motion.div 
            className="fullscreen-modal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setFullscreenImage(null)}
          >
            <div className="fullscreen-close">×</div>
            
            <motion.div 
              className="fullscreen-content"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <img src={fullscreenImage} alt="Fullscreen View" className="fullscreen-img-large" />
              
              {/* Navigation Controls */}
              <div className="gallery-nav left" onClick={() => {
                const currentNum = fullscreenImage.match(/Image(\d)/)?.[1] || "1";
                const nextNum = currentNum === "1" ? "3" : (parseInt(currentNum) - 1).toString();
                const nextFile = nextNum === "1" ? fullscreenImage.replace(/Image\d\.png/, "Image.png") : fullscreenImage.replace(/Image\d?\.png/, `Image${nextNum}.png`);
                setFullscreenImage(nextFile);
              }}>
                ‹
              </div>
              <div className="gallery-nav right" onClick={() => {
                const currentNum = fullscreenImage.match(/Image(\d)/)?.[1] || "1";
                const nextNum = currentNum === "3" ? "1" : (parseInt(currentNum) + 1).toString();
                const nextFile = nextNum === "1" ? fullscreenImage.replace(/Image\d\.png/, "Image.png") : fullscreenImage.replace(/Image\d?\.png/, `Image${nextNum}.png`);
                setFullscreenImage(nextFile);
              }}>
                ›
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Universo Zero Modal Overlay */}
      <AnimatePresence>
        {showUniversoZero && (
          <motion.div 
            className="guide-overlay-container"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{ overflowY: 'auto', padding: '5vh 20px' }}
          >
            <div 
              className="guide-inner-wrap"
              style={{ 
                transform: 'none', 
                maxWidth: '800px', 
                background: 'rgba(5, 5, 5, 0.85)', 
                backdropFilter: 'blur(30px)', 
                border: '1px solid rgba(255, 0, 127, 0.2)',
                padding: '40px 30px', 
                borderRadius: '8px', 
                boxShadow: '0 0 50px rgba(0, 0, 0, 0.9), 0 0 30px rgba(255, 0, 127, 0.1)'
              }}
            >
              <div 
                className="close-btn" 
                onClick={() => setShowUniversoZero(false)}
                style={{ top: '20px', right: '20px', fontSize: '2rem' }}
              >
                ×
              </div>

              <header className="panel-header" style={{ marginBottom: '30px', textAlign: 'center', width: '100%' }}>
                <span className="panel-id" style={{ fontSize: '0.8rem', letterSpacing: '3px' }}>◇ APRESENTAÇÃO COLETIVA ◇</span>
                <h2 className="panel-title" style={{ color: '#FF007F', fontSize: '2.2rem', textShadow: '0 0 20px rgba(255, 0, 127, 0.6)', marginTop: '10px' }}>
                  UNIVERSO ZERO
                </h2>
                <p style={{ color: '#a0a0a0', fontFamily: 'Orbitron, sans-serif', fontSize: '0.8rem', letterSpacing: '1px', marginTop: '5px' }}>
                  Um ecossistema criado por pessoas para pessoas
                </p>
              </header>

              <div 
                className="section-text" 
                style={{ 
                  color: 'rgba(255, 255, 255, 0.85)', 
                  fontSize: '1.05rem', 
                  lineHeight: '1.8', 
                  textAlign: 'left', 
                  fontFamily: 'Inter, sans-serif',
                  maxHeight: '60vh',
                  overflowY: 'auto',
                  paddingRight: '15px',
                  scrollbarWidth: 'thin'
                }}
              >
                <p>Existem pessoas que não sabem onde se encaixam.</p>
                <br />
                <p>Pessoas que carregam problemas que não conseguem explicar. Pessoas com dificuldades sociais, emocionais ou pessoais. Pessoas que se sentem sozinhas mesmo estando cercadas de outras pessoas. Pessoas que têm talento, criatividade, sensibilidade e inteligência, mas nunca encontraram um ambiente onde pudessem realmente desenvolver essas partes de si mesmas.</p>
                <br />
                <p>Algumas precisam conversar.</p>
                <p>Outras precisam ser ouvidas.</p>
                <p>Algumas precisam aprender.</p>
                <p>Outras precisam ensinar.</p>
                <p>Algumas querem criar.</p>
                <p>Outras simplesmente precisam descobrir que ainda existe um lugar onde podem pertencer.</p>
                <br />
                <p>O Universo Zero nasce a partir dessa ideia.</p>
                <br />
                <p>Não como uma solução mágica para os problemas humanos e nem como uma promessa de transformar alguém em outra pessoa.</p>
                <br />
                <p>Mas como uma tentativa de criar espaços onde pessoas possam encontrar pessoas.</p>
                <br />
                <p>Espaços diferentes para necessidades diferentes.</p>
                <br />
                <p>Alguns voltados para expressão. Outros para amizade. Alguns para reflexão emocional, aprendizado, espiritualidade, criatividade ou desenvolvimento de projetos.</p>
                <br />
                <p>Juntos, esses espaços formam uma rede.</p>
                <br />
                <p>Uma rede onde alguém pode chegar procurando apenas uma conversa e, com o tempo, descobrir uma amizade.</p>
                <br />
                <p>Pode entrar para compartilhar um desenho e acabar aprendendo uma nova habilidade.</p>
                <br />
                <p>Pode chegar sem direção e encontrar uma oportunidade de participar da construção de algo.</p>
                <br />
                <p>Pode sentir que não pertence a lugar nenhum e descobrir que existem outras pessoas que também estão tentando encontrar o seu lugar.</p>
                <br />
                <p>O Universo Zero não parte da ideia de que todas as pessoas precisam ser iguais.</p>
                <br />
                <p>Ele parte da ideia de que as diferenças também podem construir conexões.</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
