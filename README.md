## Clínica Veterinária Lisiane Martins – Landing Page

Projeto de landing page institucional para a **Clínica Veterinária Lisiane Martins**, localizada em Pelotas/RS.  
Construído com foco em conversão, clareza de informações e boa experiência em dispositivos móveis.

### Stack técnica

- **Framework**: Next.js (App Router)
- **Linguagem**: TypeScript
- **UI**:
  - Componentes React próprios em `components/` e `sections/`
  - Ícones `lucide-react` e ícones customizados em `components/icons`
- **Fonts**:
  - `Plus_Jakarta_Sans` para headings (`--font-heading`)
  - `Inter` para texto base (`--font-sans`)
- **Analytics**:
  - `@vercel/analytics/react`
  - `@vercel/speed-insights/next`

### Como rodar o projeto

Instale as dependências (exemplo com `yarn`):

```bash
yarn
```

Suba o servidor de desenvolvimento:

```bash
yarn dev
```

Depois, acesse `http://localhost:3000` no navegador.

Build de produção:

```bash
yarn build
yarn start
```

### Estrutura principal de pastas

- `app/`
  - `layout.tsx`: layout raiz da aplicação, definição de metadata (SEO, Open Graph, Twitter) e JSON-LD de `VeterinaryCare`.
  - `page.tsx`: composição das seções principais da landing (hero, sobre, serviços, depoimentos, FAQ, contato, etc.).
- `components/`
  - `Header.tsx`: cabeçalho fixo com navegação (desktop/mobile).
  - `Footer.tsx`: rodapé com logo, endereço, contatos e redes sociais.
  - `components/ui/*`: componentes de UI reutilizáveis (botões, navegação, accordions, etc.).
- `sections/`
  - `Hero.tsx`, `About.tsx`, `Services.tsx`, `GalleryBento.tsx`, `Testimonials.tsx`, `Contact.tsx`, `faq/FaqSection.tsx`.

### Documentação adicional

A documentação detalhada do projeto está em `docs/`:

- `docs/ARCHITECTURE.md`: visão de arquitetura e fluxo da página.
- `docs/DESIGN-SYSTEM.md`: cores, tipografia, espaçamentos e componentes de UI atuais.
- `docs/SECTIONS.md`: descrição das seções da landing (objetivos, estrutura e papel na conversão).
- `docs/WEB-QUALITY.md`: estado atual de semântica, SEO on-page, acessibilidade e performance.
- `docs/DOCS-ROADMAP.md`: resumo da documentação e próximos passos sugeridos.

Use esses arquivos como referência ao evoluir o projeto ou ao reutilizar padrões em novos sites.
