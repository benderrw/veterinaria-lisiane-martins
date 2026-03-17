## Auditoria de Qualidade Web – Clínica Veterinária Lisiane Martins

### Visão geral

- **Stack**: Next.js (App Router), TypeScript, Vercel Analytics/Speed Insights.
- **Rota principal**: `/` (landing de página única) com seções `Hero`, `Services`, `About`, `Contact`, `FaqSection`, `Testimonials`, além de `Header`, `Footer` e `FloatingWhatsAppButton`.
- **API**: `/api/reviews` consumindo Google Places.
- **Objetivo do site**: apresentar a clínica, transmitir confiança e facilitar contato/agendamento (principalmente via WhatsApp).

---

## 1. Performance

### 1.1 Imagens

- **Hero (`Hero.tsx`)**
  - Usa `next/image` com:
    - `fill`, `sizes="100vw"`, `priority`, overlay com gradiente.
  - **Risco**: o arquivo `public/hero.jpg` parece grande (imagem de fundo full-screen).
    - Impacta principalmente **LCP** em conexões lentas/móveis se o arquivo estiver pouco comprimido.
  - **Boas práticas atendidas**:
    - Uso de `next/image` em vez de `<img>`.
    - `priority` adequado porque é o elemento chave de primeira dobra.

- **Sobre (`About.tsx`)**
  - Imagem `public/sobre.jpg` com:
    - `fill`, `loading="lazy"`, `sizes="(max-width: 1024px) 100vw, 50vw"`.
  - **Muito bom**: lazy loading e `sizes` bem configurados, reduzindo peso fora da dobra.

- **Outras imagens**
  - Logos no `Header` e `Footer` usam `next/image` com `priority` no header (correto para branding acima da dobra).
  - Depoimentos (`Testimonials`) usam `next/image` apenas para `profile_photo_url` dos reviews → imagens pequenas, bem dimensionadas (40x40).
  - Ícone de FAQ (`FaqIllustration`) usa `next/image` com fallback em SVG/ícone se falhar.

**Oportunidades de melhoria (imagens)**

1. **Verificar peso de `hero.jpg` e `hero-2.jpg`**
   - Converter para WebP/AVIF, manter JPEG otimizado se necessário.
   - Garantir dimensões máximas coerentes com o viewport alvo (não usar arquivo 6000px se 1920px já cobre).
   - Se o LCP estiver alto, avaliar reduzir ligeiramente a altura mínima da seção em mobile ou simplificar o background.

2. **Confirmar que `og.png` e `icon.png` estão otimizados**
   - Essas imagens são usadas em social/metadata; se muito pesadas, impactam pouco Core Web Vitals, mas podem aumentar transferências em redes sociais.

### 1.2 Componentes client-side e JavaScript

- **Componentes `use client` principais**
  - `Header`
    - Usa `useEffect` para calcular `--header-height` com `getBoundingClientRect` e atualiza em `resize`.
    - Impacto de JS é pequeno e limitado ao cálculo de uma custom property.
  - `FloatingWhatsAppButton`
    - Usa `usePathname` para ocultar em `/admin`.
    - Interação mínima, JS leve.
  - `FaqSection` / `FaqIllustration`
    - `FaqSection` é client porque usa um `Accordion` interativo (shadcn).
    - `FaqIllustration` usa `useState` apenas para fallback de imagem → custo baixo.
  - `Testimonials`
    - Client-side com `useEffect` para `fetch("/api/reviews")` + `embla-carousel-react`.

**Avaliação**

- A maioria dos componentes client-side realmente precisa ser client (menu mobile, FAQ interativo, carrossel, botão flutuante).
- Não há grandes blocos de lógica pesada ou loops custosos rodando no cliente.

**Oportunidades de melhoria (JS)**

3. **Considerar SSR/ISR para depoimentos**
   - Hoje `Testimonials` busca reviews no cliente. Para SEO/performance:
     - Alternativa: mover o fetch para server component usando `fetch` com `next: { revalidate: 3600 }` e renderizar o carrossel com dados pré-carregados.
     - Benefícios: conteúdo aparece mais rápido e indexável por crawlers que não executam JS.
   - Porém, como depoimentos não estão na primeira dobra, o impacto em Core Web Vitals é moderado.

4. **Avaliar necessidade de `use client` em seções que poderiam ser server-only**
   - `FaqSection` poderia ser parcialmente server se o `Accordion` suportasse padrão RSC, mas com shadcn é comum ser client → aceitável.

### 1.3 Recursos externos pesados

- **Google Maps iframe (`Contact.tsx`)**
  - `loading="lazy"`, `title` configurado, `referrerPolicy` definido.
  - A seção de contato está abaixo da dobra, reduzindo impacto imediato em LCP.
  - **Bom equilíbrio**: o iframe só carrega quando o usuário chega mais perto dele, graças ao lazy loading.

**Possível otimização extra**

5. **Placeholder estático para o mapa**
   - Usar uma imagem estática (screenshot) do mapa com botão “Ver no mapa”/“Abrir mapa interativo”.
   - Carregar o iframe apenas após interação (clique) – reduz requests e JS de terceiros.

### 1.4 Configuração Next.js

- **`next.config.ts`**
  - Configura `images.remotePatterns` para `picsum.photos` e `lh3.googleusercontent.com` (necessário para fotos de perfil do Google).
  - Não há outras otimizações específicas, mas o default do Next já cobre compressão e otimização de imagens.

**Avaliação geral de performance**

- Estrutura muito saudável para uma landing:
  - Uso consistente de `next/image` e `next/font`.
  - Lazy loading em imagens não críticas.
  - Iframe com `loading="lazy"`.
  - API `/api/reviews` com cache (`revalidate: 3600`).
- Os principais riscos residem em:
  - Peso das imagens de hero/OG.
  - Client-side fetch de depoimentos (mais impacto em UX/SEO do que em Core Web Vitals).

---

## 2. SEO técnico e conteúdo

### 2.1 Metadata e estrutura de documentos

- **`generateMetadata` em `app/layout.tsx`**
  - `title` e `description` claros, com localização (“Pelotas - RS”) e termos relevantes (“Clínica Veterinária”).
  - `metadataBase` calculado com base no host/protocolo (bom para ambientes diferentes).
  - `alternates.canonical` aponta para `https://www.lisianemartins.vet/`.
  - Open Graph:
    - `og:image` = `/og.png` com tamanho correto (1200x630) e `alt` descritivo.
    - `locale`, `siteName`, `type` configurados.
  - Twitter:
    - `summary_large_image`, com título/descrição coerentes.

**Problema identificado**

6. **Favicons e manifest apontando para `/tmp/...`**
   - `icons.icon`:
     - `/tmp/favicon-16x16.png`, `/tmp/favicon-32x32.png`, `/tmp/favicon.ico`.
   - `apple`:
     - `/tmp/apple-touch-icon.png`.
   - `manifest`:
     - `/tmp/site.webmanifest`.
   - Se esses arquivos não existirem em `public/tmp`, Lighthouse e navegadores irão retornar 404, gerando warnings e pequena perda de qualidade/percepção.

**Recomendação**

- Criar/colocar os ícones reais em `public` (por exemplo: `/favicon-16x16.png`, `/favicon-32x32.png`, `/favicon.ico`, `/apple-touch-icon.png`, `/site.webmanifest`) e atualizar `generateMetadata` para apontar para esses caminhos válidos.

### 2.2 Schema.org / dados estruturados

- **JSON-LD `VeterinaryCare`**
  - Campos preenchidos:
    - `name`, `image`, `url`, `telephone`, `email`.
    - `address` com street/cidade/estado/país.
    - `geo` com latitude/longitude.
    - `sameAs` com Instagram.
  - **Muito bom** para SEO local:
    - Ajuda o Google a associar corretamente a clínica, endereço, telefone e presença em redes sociais.

**Possíveis extensões**

7. **Adicionar campos opcionais úteis**
   - `openingHoursSpecification` (horários de atendimento).
   - `priceRange` (ex.: `"R$"` ou `"R$R$"`).
   - `aggregateRating` se houver reviews suficientes e política de uso apropriada.

### 2.3 Conteúdo on-page e links

- **Headings e copy**
  - `Hero`:
    - `h1` explicando claramente o valor (“Cuidado e carinho para o seu pet em Pelotas”).
  - Seções:
    - `Services`, `About`, `Contact`, `FaqSection`, `Testimonials` usam `h2` coerentes com o conteúdo.
  - Estrutura de headings é consistente e favorece escaneabilidade por buscadores e usuários.

- **Links**
  - Navegação interna por âncoras:
    - `#servicos`, `#sobre`, `#contato`, `#faq`, `#hero`.
    - IDs batem com as seções reais.
  - Links externos:
    - Google Maps (endereço), WhatsApp, Instagram, e-mail.
    - Com `rel="noopener noreferrer"` onde necessário.

**Avaliação geral de SEO**

- Implementação de metadata e dados estruturados está **acima da média** para uma landing simples.
- Pontos a ajustar:
  - Caminhos dos ícones/manifest.
  - Eventuais campos extras no JSON-LD para enriquecer o snippet local.

---

## 3. Acessibilidade (WCAG – principais práticas)

### 3.1 Estrutura semântica e navegação por teclado

- **Layout principal**
  - `RootLayout`:
    - `<html lang="pt-BR">`.
    - Skip link “Pular para o conteúdo principal” apontando para `#main`, com estilos de foco adequados.
  - `page.tsx`:
    - Usa `<main id="main" tabIndex={-1}>...</main>` → boa prática para receber foco após usar o skip link.
  - `Footer`:
    - `<footer role="contentinfo">` com seções rotuladas (`aria-labelledby`).

- **Header e navegação**
  - Logo:
    - Link com `aria-label` explicando: “Ir para o topo - Clínica Veterinária Lisiane Martins”.
  - Menu mobile:
    - Botão com `aria-label="Abrir menu"`.
    - `Sheet` (componente de drawer) provavelmente já gerencia foco e `aria-modal` internamente.

### 3.2 ARIA, labels e contraste

- **Botões e CTAs**
  - Vários links de ação têm `aria-label` descritivo:
    - Hero CTA: “Agendar consulta pelo WhatsApp”.
    - Botão flutuante: “Contato por WhatsApp”.
    - Botões em `FaqIllustration`: “Fale conosco pelo WhatsApp”, “Siga-nos no Instagram”.
  - FAQ:
    - `SectionWrapper` com `aria-labelledby="faq-heading"` + `h2` com `id="faq-heading"`.
  - Footer:
    - Seções de “Localização” e “Contato” têm headings que funcionam bem como pontos de navegação.

- **Contraste**
  - Como a paleta vem de um design system (provavelmente shadcn + tema customizado), é provável que a maioria dos pares de cores esteja dentro do contraste recomendado.
  - Não há textos claros sobre fundos claros sem contraste suficiente no que vimos.

### 3.3 Componentes interativos

- **Accordion (FAQ)**
  - Baseado em `@/components/ui/accordion` (padrão shadcn), normalmente já implementa:
    - `role="button"`, `aria-expanded`, `aria-controls`.
    - Foco de teclado correto (Enter/Espaço).

- **Carrossel (`Testimonials`)**
  - Usa `embla-carousel-react`. Na implementação atual:
    - Carrossel é arrastável (`watchDrag: true`).
    - Não há botões explícitos de “próximo/anterior” ou indicadores na marcação fornecida.
  - **Potencial melhoria**:
    - Adicionar botões “Anterior”/“Próximo” com `aria-label` e foco de teclado, principalmente para desktop.
    - Opcionalmente indicar a posição atual (ex.: “Depoimento 1 de N”).

**Avaliação geral de acessibilidade**

- Base muito boa: skip link, estrutura semântica, labels claros, ARIA coerente nos principais pontos.
- Pontos a reforçar:
  - Melhorar controle de acessibilidade no carrossel (botões e anúncios de posição).
  - Garantir, via testes manuais, que o foco é gerido corretamente no `Sheet` do menu em mobile (espera-se que sim, pois é biblioteca consolidada).

---

## 4. UX/UI

### 4.1 Fluxo principal do usuário

- Jornada típica:
  - Chega na **Hero** → entende rapidamente que é uma clínica veterinária em Pelotas (quem/onde/o que).
  - Pode rolar para **Serviços** → entende escopo de atuação.
  - Vai para **Sobre** → reforço de confiança e propósito.
  - Vai para **Contato** → endereço, telefone, WhatsApp, mapa.
  - Em vários pontos há CTAs para WhatsApp e redes sociais.

**Pontos fortes**

- Mensagem da hero é direta e focada no benefício emocional (“Cuidado e carinho…”).
- CTA único e forte para WhatsApp (sem distrações).
- Seções são bem delimitadas e com espaçamento confortável.

**Oportunidades de refinamento**

8. **Refinar microcopy de confiança**
   - Adicionar pequenos trechos que reforcem diferenciais:
     - Ex.: “Atendimento por horário marcado”, “Foco em cães e gatos”, “Clínica no bairro Laranjal”.
   - Isso pode ser feito em `About` ou logo abaixo da hero.

9. **Integração visual mais forte dos depoimentos**
   - Quando a API de reviews está ativa, destacar que são avaliações reais do Google (“Avaliações dos tutores no Google”).
   - Isso aumenta a percepção de prova social e confiabilidade.

### 4.2 Hierarquia visual e consistência

- Uso consistente de:
  - Tipografia leve para títulos (`font-light`, `tracking-tight`).
  - `SectionWrapper` para padronizar largura, paddings e `scroll-mt`.
  - Cards de serviços/depoimentos/FAQ com `rounded-2xl`, borda e sombra leve → linguagem visual unificada.

**Avaliação**

- A hierarquia é clara: cada seção começa com um título forte (`h1`/`h2` bem dimensionado) seguido de textos de apoio.
- A navegação por âncoras do header conversa bem com os IDs das seções.

### 4.3 Confiança e provas sociais

- **Depoimentos**
  - Integrados via Google Places, o que traz autenticidade.
  - Comportamento quando não há dados:
    - Mensagem amigável “Em breve você poderá ver aqui as avaliações dos nossos clientes.”
  - Ponto extra:
    - Mostrar a origem (“Avaliações no Google”) e, se possível, nota média (ex.: “4,9 de 5 estrelas”).

- **Contato e endereço**
  - Endereço completo visível em `Contact` e no `Footer`, com link direto para Google Maps.
  - Telefone/WhatsApp sempre presente e de fácil clique.

---

## 5. Lista de problemas/oportunidades e priorização

### 5.1 Itens identificados

1. **Favicons/manifest apontando para `/tmp/...` (SEO/percepção)**
   - Impacto: **médio** (avisos em Lighthouse, ícones faltando em alguns contextos).
   - Esforço: **baixo**.

2. **Peso potencialmente alto de `hero.jpg` / `og.png` / `hero-2.jpg` (LCP e transferência)**
   - Impacto: **médio/alto** (principalmente em mobile/3G).
   - Esforço: **baixo/médio** (recompressão/conversão de formato).

3. **Depoimentos carregados apenas via JS no cliente**
   - Impacto: **médio** em SEO/UX da seção (conteúdo não aparece se JS falhar; menos indexável).
   - Esforço: **médio** (refatorar para data fetching server-side com revalidate).

4. **Carrossel sem controles explícitos de acessibilidade (botões e indicação de posição)**
   - Impacto: **baixo/médio** (principalmente para usuários de teclado/leitores de tela).
   - Esforço: **médio**.

5. **JSON-LD sem horários (`openingHoursSpecification`) e `priceRange`**
   - Impacto: **baixo/médio** (melhora snippet local e compreensão pelo Google).
   - Esforço: **baixo**.

6. **Microcopy de diferenciais pode ser reforçado**
   - Impacto: **médio** em conversão/confiança.
   - Esforço: **baixo**.

7. **Mapa interativo sempre carregado (mesmo que lazy)**
   - Impacto: **baixo/médio** (JS de terceiros adicional).
   - Esforço: **médio** se optar por padrão “clique para carregar mapa”.

### 5.2 Top 5 recomendações imediatas

1. **Corrigir favicons e manifest**
   - Criar/validar arquivos em `public` e ajustar `generateMetadata` para não apontar para `/tmp/**`.
2. **Otimizar `hero.jpg` (e `og.png`/`hero-2.jpg` se usados)**
   - Garantir compressão agressiva, possível uso de WebP/AVIF e dimensões adequadas.
3. **Enriquecer o JSON-LD com `openingHoursSpecification` e `priceRange`**
   - Ajuda bastante em SEO local com esforço mínimo.
4. **Melhorar acessibilidade do carrossel `Testimonials`**
   - Adicionar botões “Anterior/Próximo” com `aria-label` + descrição simples da posição.
5. **Reforçar provas sociais e diferenciais na interface**
   - Deixar claro que os depoimentos são do Google e destacar 1–2 diferenciais da clínica em hero/sobre.

---

## 6. Próximos passos sugeridos

- **Lote 1 – Ajustes rápidos e alto impacto**
  - Corrigir caminhos de favicons/manifest.
  - Otimizar imagens principais (`hero.jpg`, `og.png`).
  - Atualizar JSON-LD com horários e faixa de preço.

- **Lote 2 – UX/Acessibilidade**
  - Melhorar acessibilidade do carrossel (controles e mensagens).
  - Refinar microcopy e reforçar diferenciais em hero/sobre/depoimentos.

- **Lote 3 – Perf/SEO adicionais**
  - Avaliar migração do fetch de reviews para SSR/ISR se quiser maximizar indexabilidade.
  - Considerar padrão de mapa estático + “clique para carregar” caso se observe impacto relevante em performance real de usuários.

---

## 7. Checklist contínuo para novas páginas/seções

- **Estrutura semântica**
  - Usar sempre `<main>`, `<header>`, `<nav>`, `<footer>` e `<section>` quando fizer sentido.
  - Garantir apenas **um `h1`** por página (nas demais seções, usar `h2`/`h3` em ordem).
  - Quando uma seção tiver título, preferir `section` com `aria-labelledby` apontando para o heading.

- **Conteúdo e controles**
  - Toda imagem informativa precisa de `alt` descritivo; imagens puramente decorativas usam `alt=""` + `aria-hidden`.
  - Links/botões de ícone devem ter rótulo acessível (`aria-label`) se o texto visível não for suficiente.
  - Formulários: cada campo com `<label>` associado e mensagens de erro ligadas por `aria-describedby` e, quando necessário, `role="alert"` ou `aria-live`.

- **Foco, teclado e contraste**
  - Manter `:focus-visible` com estilo bem visível e contraste adequado.
  - Verificar navegação por teclado em todas as interações (menus, acordeões, carrosséis, modais): TAB/Shift+TAB/Enter/Espaço/Escape devem funcionar como esperado.
  - Usar a paleta de cores de forma a garantir contraste mínimo recomendado (4.5:1 para texto normal, 3:1 para texto grande).

- **React/Next.js**
  - Usar **Server Components** por padrão; aplicar `"use client"` apenas onde há estado, efeitos ou APIs de navegador.
  - Preferir `next/image` para imagens e `next/link` para navegação interna.
  - Evitar waterfalls de `fetch`: quando houver múltiplas chamadas independentes, usar `Promise.all` em Server Components ou rotas.

- **Validação**
  - Antes de publicar uma nova feature, rodar Lighthouse (Accessibility) na página principal e verificar se não surgiram novos erros críticos.
  - Fazer um teste rápido de teclado na nova seção/fluxo.

---

## 8. Rodadas recentes de correção (Lighthouse em produção)

- **Contexto**
  - Lighthouse executado em build de produção (`yarn build && yarn start`) apontou:
    - Problemas de `label-content-name-mismatch` em CTAs de WhatsApp/Instagram.
    - Contraste insuficiente em um botão de Instagram.
    - Oportunidades de otimização para `/logo.png` e `/hero.jpg`.
    - Ausência/fragilidade de alguns headers de segurança (CSP, HSTS, COOP, etc.).

- **Correções aplicadas no código**
  - Acessibilidade:
    - Ajustados os links/botões de WhatsApp e Instagram para que o nome acessível corresponda ao texto visível:
      - `Hero` (`Hero.tsx`): removido `aria-label` redundante do CTA principal, mantendo o texto “Agende sua consulta” como nome acessível.
      - `FaqIllustration` (`sections/faq/FaqIllustration.tsx`): removidos `aria-label` redundantes dos botões de WhatsApp e Instagram.
      - `Footer` (`components/Footer.tsx`): removidos `aria-label` redundantes de WhatsApp e Instagram, deixando número e handle como nome acessível.
  - Contraste:
    - Botão de Instagram em `FaqIllustration`:
      - Alterado de `bg-secondary`/`text-secondary-foreground` para `bg-primary`/`text-primary-foreground` com borda `border-primary`, garantindo contraste adequado (≥ 4.5:1) sem perder identidade visual.
  - Imagens:
    - Logo:
      - Mantido uso de `next/image` no `Header` com dimensões explícitas.
      - No `Footer`, substituído `fill` por `width`/`height` explícitos (`144x40`) e classe `h-full w-auto object-contain`, alinhando melhor o uso ao tamanho real do logo.
    - Hero:
      - Mantido `next/image` com `fill`, `sizes="100vw"` e `priority` em `Hero.tsx`, garantindo que o elemento principal de dobra continue otimizado via pipeline do Next.
    - **Ação pendente fora do código**:
      - Recomenda-se recomprimir fisicamente `public/logo.png` (largura alvo ~240–320px, formato otimizado/possivelmente WebP) e `public/hero.jpg` (largura máxima ~1600–1920px, compressão agressiva ~70–75, idealmente WebP) para reduzir ainda mais os bytes reportados pelo Lighthouse.
  - Segurança:
    - Criado `middleware.ts` na raiz para adicionar headers de segurança:
      - `Content-Security-Policy` com `default-src 'self'`, restrições para imagens, scripts, styles, fonts, conexões e `frame-ancestors 'none'`.
      - `Referrer-Policy: strict-origin-when-cross-origin`.
      - `X-Frame-Options: DENY`.
      - `X-Content-Type-Options: nosniff`.
      - `Cross-Origin-Opener-Policy: same-origin`.
      - `Cross-Origin-Resource-Policy: same-origin`.
      - `Permissions-Policy` desabilitando câmera/microfone/geolocalização, permitindo fullscreen apenas para `self`.
      - `Strict-Transport-Security` ativado somente em produção com HTTPS (`max-age=31536000; includeSubDomains; preload`).
  - Vercel Analytics / Speed Insights:
    - Em `app/layout.tsx`, `Analytics` e `SpeedInsights` agora só são renderizados quando `process.env.NODE_ENV === "production"`, evitando 404 e ruído em auditorias locais, sem afetar o comportamento em produção.

- **Orientação para próximas auditorias**
  - Sempre rodar:
    - `yarn build && yarn start`
    - Executar Lighthouse na URL de produção local (`http://localhost:3000`) ou no deploy em produção.
  - Verificar especialmente:
    - Se não surgiram novos avisos de `label-content-name-mismatch` após futuras alterações em CTAs.
    - Se as novas versões otimizadas de `/logo.png` e `/hero.jpg` reduziram os `wastedBytes` de imagem.
    - Se os headers de segurança aparecem corretamente em `Network > Response Headers` sem bloquear recursos legítimos.

