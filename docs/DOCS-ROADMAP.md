## Roadmap de documentação – Clínica Veterinária Lisiane Martins

Este arquivo resume a documentação criada para o projeto e indica como usá-la no dia a dia, além de apontar próximos passos naturais.

---

### 1. Documentos existentes

- `README.md`
  - Visão geral do projeto.
  - Stack técnica.
  - Como rodar em desenvolvimento e produção.
  - Estrutura principal de pastas.
  - Links para os arquivos de documentação em `docs/`.

- `docs/ARCHITECTURE.md`
  - Descreve:
    - Papel de `app/layout.tsx` (metadata, JSON-LD, layout raiz).
    - Composição de `app/page.tsx` com `Header`, seções, `Footer` e botão de WhatsApp.
    - Função do `SectionWrapper` e dos componentes globais.
    - Integrações externas (WhatsApp, Instagram, Google Maps).
  - Inclui um diagrama mermaid da composição da página.

- `docs/DESIGN-SYSTEM.md`
  - Mapeia:
    - Tokens de cor (claro e escuro) definidos em `app/globals.css`.
    - Tipografia (Plus Jakarta Sans para headings, Inter para texto base).
    - Espaçamentos e raios derivados de `--radius`.
    - Componentes de UI principais:
      - `Button` / `buttonVariants`.
      - `SectionWrapper`.
      - Navegação, sheet, accordion.
    - Ícones e imagens usados nas seções.

- `docs/SECTIONS.md`
  - Detalha seção por seção:
    - Objetivo (o que comunica, em qual parte do funil atua).
    - Estrutura de conteúdo (campos, CTAs, texto).
    - Papel na conversão.
    - Observações de layout/responsividade.
  - Cobre:
    - `Hero`, `Services`, `About`, `Contact`, `FaqSection`, `Testimonials`.
    - Elementos auxiliares como `FloatingWhatsAppButton` e `GalleryBento`.

- `docs/WEB-QUALITY.md`
  - Estado atual de:
    - Semântica e acessibilidade básica.
    - SEO on-page (metadata, JSON-LD, conteúdo).
    - Performance percebida (uso de `next/image`, lazy loading, etc.).
  - Backlog de melhorias de:
    - Acessibilidade.
    - SEO.
    - Performance.

---

### 2. Como usar esta documentação no dia a dia

- **Para entender o projeto rapidamente**:
  - Comece pelo `README.md` e depois leia `ARCHITECTURE.md`.

- **Para alterar ou criar novas seções**:
  - Consulte:
    - `DESIGN-SYSTEM.md` para saber quais tokens, componentes e patterns seguir.
    - `SECTIONS.md` para entender o papel de cada seção e como estruturar conteúdo.

- **Para manter ou elevar a qualidade**:
  - Use `WEB-QUALITY.md` como checklist de:
    - O que já está ok.
    - O que ainda pode ser melhorado em acessibilidade, SEO e performance.

---

### 3. Próximos passos naturais (futuro)

Estes itens **não fazem parte desta fase**, mas são caminhos lógicos a partir da documentação atual:

1. **Extrair um landing-template reutilizável**
   - Usar `DESIGN-SYSTEM.md` e `SECTIONS.md` como base para:
     - Criar um repositório template com seções genéricas.
     - Adaptar a estrutura para outros nichos mantendo a base de componentes.

2. **Aprofundar qualidade web**
   - Rodar ferramentas como Lighthouse/Core Web Vitals.
   - Aplicar ajustes orientados por resultados (principalmente para:
     - Performance.
     - Acessibilidade.
     - SEO local).

3. **Padronizar prompts de geração de novas landings**
   - A partir da documentação atual:
     - Criar um prompt que explique:
       - Design system.
       - Padrão de seções.
       - Boas práticas de copy e UX.
     - Usar esse prompt para acelerar criação de novas LPs mantendo consistência.

Este roadmap serve como guia de continuidade caso o projeto evolua para um kit de templates comerciais ou se torne base para outras páginas institucionais.

