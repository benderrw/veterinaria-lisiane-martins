## Qualidade web – Clínica Veterinária Lisiane Martins

Visão geral do estado atual de **semântica**, **acessibilidade básica**, **SEO on-page** e **performance percebida** da landing page.

**Auditoria formal (2026-03-22):** performance (CWV/lab), SEO, rich results e mapeamento para skills [marketingskills](https://skills.sh/coreyhaines31/marketingskills) — ver [AUDITORIA-PERFORMANCE-SEO-RICH-RESULTS.md](AUDITORIA-PERFORMANCE-SEO-RICH-RESULTS.md) (métricas Lighthouse locais, achados P1/P2, backlog).

---

### 1. Semântica e acessibilidade básica

#### 1.1. Estrutura de documento

- `RootLayout`:
  - `<html lang="pt-BR">`:
    - `lang` configurado corretamente para português do Brasil.
    - Scroll suave para âncoras via `app/globals.css`: `scroll-behavior: smooth` quando `prefers-reduced-motion: no-preference`, e `scroll-behavior: auto` em `pointer: coarse` (touch primário) para reduzir conflitos com scroll no mobile.
  - `<body>` aplica fontes e cores via classes globais.

- `Home` (`app/page.tsx`):
  - Usa `<main id="main" tabIndex={-1}>`:
    - `id` permite skip links futuros.
    - `tabIndex={-1}` facilita foco programático.

- Seções:
  - `SectionWrapper` usa `<section>` por padrão, com `id` e `scroll-mt` baseado na altura do header.
  - Seções possuem títulos (`h1`/`h2`) descritivos (“Sobre nós”, “Nossos serviços”, “Contato”, “Perguntas frequentes”, “Depoimentos”).

#### 1.2. Acessibilidade

Pontos positivos:

- `Header`:
  - Link da logo tem `aria-label` descritivo: “Ir para o topo - Clínica Veterinária Lisiane Martins”.
  - Navegação mobile envolve `<nav>` com `aria-label="Menu principal"`.
  - Botão de menu (“hambúrguer”) tem `aria-label="Abrir menu"`.
  - Ícones Lucide são marcados com `aria-hidden` quando meramente decorativos.

- `Footer`:
  - Usa `<footer role="contentinfo">`.
  - Endereço em `<address>` com link clicável para Google Maps.

- `Contact`:
  - Ícones (`MapPin`, `WhatsAppIcon`, `EmailIcon`) com `aria-hidden`.
  - `iframe` do mapa tem `title` descritivo.

- `FaqSection`:
  - `aria-labelledby="faq-heading"` no `SectionWrapper`.
  - Título `h2` com `id` correspondente.
  - `Accordion` provê experiência acessível para expandir/perguntas (herdado do componente UI).

- `FaqIllustration`:
  - Contêiner com `aria-labelledby`.
  - Fallback de imagem com ícone `HelpCircle` e texto de apoio.

Possíveis melhorias futuras:

- Adicionar **skip link** visível ao foco para pular direto para `#main`.
- Revisar a hierarquia de headings completa em todas as seções para garantir ordem estrita (`h1` único, depois `h2`, etc.) em todo o documento.

#### 1.3. Layout e tipografia Bloom

Referência documental: repositório Bloom (`README.md`, secção *Sistema de design*). Neste projeto:

- **Grelha horizontal:** 4 colunas (mobile) → 8 (tablet) → 12 (desktop). Utilitário CSS: classe `.grid-bloom` em `app/globals.css` (`grid-cols-4 md:grid-cols-8 lg:grid-cols-12`, `gap-8`).
- **Espaçamento:** preferir múltiplos de 8px (`gap-8`, `gap-16`, padding em `SectionWrapper` alinhado a essa ideia).
- **Tipografia:** tokens `--type-*`, `--lead-*`, `--track-*` e utilitários `text-bloom-h1` … `text-bloom-body` no mesmo ficheiro; `h1` global e `p` com escala base em `@layer base`. Famílias **Plus Jakarta Sans** (títulos) e **Inter** (corpo) permanecem definidas em `app/layout.tsx` (sem troca para Cinzel/JetBrains da doc Bloom).

---

### 2. SEO on-page

#### 2.1. Metadata e Open Graph

Em `app/layout.tsx`:

- `generateMetadata()`:
  - Calcula `baseUrl` dinamicamente com base em headers (`host`, `x-forwarded-host`, `x-forwarded-proto`).
  - Define:
    - `title`: “Clínica Veterinária Lisiane Martins | Pelotas - RS”.
    - `description`: texto focado em consultas, vacinação, cirurgia, cuidados e atendimento humanizado.
    - `metadataBase` e `alternates.canonical` apontando para `https://www.lisianemartins.vet`.
  - `openGraph`:
    - Título, descrição, URL, `siteName`, `locale`, `type`, `images`.
  - `twitter`:
    - `card: "summary_large_image"`, título, descrição e imagem.

Isso fornece boa base para compartilhamento em redes sociais e pré-visualizações.

#### 2.2. JSON-LD (dados estruturados)

- JSON-LD do tipo `VeterinaryCare`:
  - Nome da clínica.
  - Imagem (`og.png`).
  - URL dinâmica baseada no host.
  - Telefone e e-mail.
  - Endereço com `PostalAddress`.
  - Coordenadas geográficas.
  - `sameAs` para Instagram.
  - `openingHoursSpecification`.

Isso ajuda buscadores a entenderem o negócio local e potencialmente melhorar presença em resultados locais.

#### 2.3. Conteúdo

- Headline e cópia:
  - Focadas em “Clínica veterinária em Pelotas, RS” e serviços (consultas, vacinação, exames, cirurgias, cardiologia, preventivo).
  - Bom alinhamento com uma busca típica de usuário final.

Possíveis melhorias futuras:

- Garantir uma **única `<h1>`** global e headings subsequentes com hierarquia clara.
- Adicionar **texto alternativo significativo** para imagens importantes:
  - `Hero`: atualmente `alt=""`; pode-se considerar `alt` descritivo para reforçar contexto.
  - `FAQ_IMAGE` e outras imagens também podem ganhar `alt` quando não puramente decorativas.
- Criar uma seção **“Como chegar”** ou snippet de texto mencionando o bairro/rua em formato natural para reforçar SEO local.

---

### 3. Performance (visão qualitativa)

Sem rodar ferramentas automáticas aqui, mas observando o código:

Pontos positivos:

- `next/image`:
  - Usado no `Hero`, `About`, `Footer`, `Testimonials` (fotos de perfil), etc.
  - Ajuda na otimização de imagens (lazy loading por padrão, formatos otimizados).
- `Hero`:
  - `priority` definido para a imagem principal (`/hero.jpg`).
  - `sizes="100vw"` correto para background full-bleed.
- `About`:
  - Imagem com `loading="lazy"` e `sizes` responsivo.

- `Contact`:
  - `iframe` do mapa com `loading="lazy"`.

- `Testimonials`:
  - Carrega dados de `/api/reviews` de forma assíncrona, e possui skeleton de “Carregando depoimentos...”.
  - Fallback se não houver dados, evitando erros.

Pontos de atenção / oportunidades:

- Conferir **peso real das imagens** (`/hero.jpg`, `/sobre.jpg`, `/faq-illustration.png`) para garantir que estejam otimizadas (compressão, resoluções adequadas).
- Verificar se o carrossel (`embla-carousel-react`) está sendo carregado apenas na página em que é usado (já parece o caso, pois está isolado em `Testimonials`).
- Garantir que quaisquer scripts externos adicionais (se adicionados no futuro) não prejudiquem TTFB/FCP.

---

### 4. Backlog sugerido de melhorias

Esta seção lista melhorias futuras que podem ser feitas em iterações posteriores (não são críticas para o funcionamento atual).

#### 4.1. Acessibilidade

- Adicionar **skip link** “Ir para o conteúdo principal” focável antes do header.
- Auditar contrastes com ferramenta de a11y para garantir que todas as combinações de `primary`, `secondary`, `muted` e textos atendam WCAG AA.
- Validar a navegação por teclado em todos os componentes interativos (accordion, sheet, carrossel, botões).

#### 4.2. SEO

- Revisar e, se necessário, otimizar:
  - Estrutura de headings global (`h1`, `h2`, `h3`) para refletir a hierarquia lógica do conteúdo.
  - `alt` em imagens, diferenciando decorativas (`alt=""`) de informativas (`alt` com descrição).
- Incluir seções textuais adicionais sobre:
  - Serviços específicos (ex.: “Clínica veterinária no Laranjal em Pelotas”).
  - Tipos de atendimento (emergencial, preventivo).

#### 4.3. Performance

- Rodar um **Lighthouse** ou ferramenta similar para:
  - Medir LCP, INP, CLS.
  - Identificar oportunidades de compressão e caching.
- Se necessário:
  - Otimizar ainda mais imagens (nova compressão, uso de formatos mais leves).
  - Avaliar divisão de bundles, se o projeto crescer.

---

### 5. Resumo

O projeto já apresenta:

- Boa base de **semântica** (uso de `main`, `section`, `footer`, `address`, headings).
- SEO configurado com **metadata**, **Open Graph**, **Twitter card** e **JSON-LD** de negócio local.
- Uso correto de `next/image`, lazy loading e embed de mapa bem configurado.

Os itens listados no backlog servem como guia para elevar ainda mais a qualidade em acessibilidade, SEO e performance conforme o projeto evoluir.

