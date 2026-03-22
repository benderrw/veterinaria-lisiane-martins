## Design System – Clínica Veterinária Lisiane Martins

Este documento descreve os principais **tokens de design** (cores, tipografia, espaçamentos, raios) e **componentes de UI** usados hoje na landing page.

---

### 1. Cores

As cores principais estão definidas em `app/globals.css` usando variáveis CSS com base em `oklch` e hex.

#### 1.1. Paleta clara (padrão)

Definida no seletor `:root` em `app/globals.css`:

- **Backgrounds e superfícies**
  - `--background`: `oklch(1 0 0)` – fundo principal claro.
  - `--surface`: `oklch(0.985 0 0)` – superfícies ligeiramente destacadas.
  - `--elevated`: `oklch(1 0 0)` – superfícies elevadas (cards).
  - `--card`: `oklch(1 0 0)` / `--card-foreground`: `oklch(0.145 0 0)`.
  - `--popover`: `oklch(1 0 0)` / `--popover-foreground`: `oklch(0.145 0 0)`.

- **Texto**
  - `--foreground`: `oklch(0.145 0 0)` – texto principal escuro.
  - `--muted`: `oklch(0.97 0 0)` – superfícies neutras.
  - `--muted-foreground`: `oklch(0.556 0 0)` – texto secundário.

- **Ações / estados principais**
  - `--primary`: `#0F7C7A` – teal (cor principal da clínica).
  - `--primary-foreground`: `#ffffff`.
  - `--secondary`: `#E65A8B` – rosa de apoio.
  - `--secondary-foreground`: `#ffffff`.
  - `--accent`: `oklch(0.97 0 0)` / `--accent-foreground`: `oklch(0.205 0 0)`.
  - `--destructive`: `oklch(0.577 0.245 27.325)` – estados de erro/alerta.

- **Bordas, inputs e anéis de foco**
  - `--border`: `oklch(0.922 0 0)` – bordas suaves.
  - `--input`: `oklch(0.922 0 0)`.
  - `--ring`: `#0F7C7A` – realce de foco coerente com a cor primária.

#### 1.2. Paleta escura (`.dark`)

Definida no seletor `.dark` em `app/globals.css`:

- **Backgrounds e superfícies**
  - `--background`: `oklch(0.145 0 0)`.
  - `--card`: `oklch(0.205 0 0)`.
  - `--popover`: `oklch(0.205 0 0)`.

- **Texto**
  - `--foreground`: `oklch(0.985 0 0)` – texto claro.
  - `--muted`: `oklch(0.269 0 0)`.
  - `--muted-foreground`: `oklch(0.708 0 0)`.

- **Ações**
  - `--primary`: `#2BA8A5` – versão mais clara do teal para contraste em fundo escuro.
  - `--primary-foreground`: `#ffffff`.
  - `--secondary`: `#F07BA3`.
  - `--secondary-foreground`: `#ffffff`.
  - `--accent`: `oklch(0.269 0 0)` / `--accent-foreground`: `oklch(0.985 0 0)`.

- **Bordas e foco**
  - `--border`: `oklch(1 0 0 / 10%)`.
  - `--input`: `oklch(1 0 0 / 15%)`.
  - `--ring`: `#2BA8A5`.

> Em ambos os temas, há também tokens de **sidebar** e **chart** (1–5) que podem ser usados em futuras páginas ou dashboards.

---

### 2. Tipografia

As fontes são carregadas em `app/layout.tsx` usando `next/font/google`:

- **Heading**: `Plus_Jakarta_Sans`
  - Registrada na variável `--font-heading`.
  - Aplicada via classe utilitária:
    - `"[font-family:var(--font-heading),sans-serif]"` em headings e títulos.

- **Texto base**: `Inter`
  - Registrada na variável `--font-sans`.
  - Associada à `font-sans` em `globals.css`:
    - `html { @apply font-sans; }`
  - Usada para parágrafos, rótulos, textos secundários.

Padrão visual observado:

- **Headings principais (`h1` / `h2`)**:
  - Tamanho:
    - Hero: `text-4xl sm:text-5xl lg:text-6xl`.
    - Seções: geralmente `text-4xl sm:text-5xl`.
  - Peso:
    - Muitas vezes `font-light` no container + `font-semibold` em partes da frase.
  - Família:
    - `"[font-family:var(--font-heading),sans-serif]"`.

- **Subtítulos e textos**:
  - `text-lg` para textos de destaque.
  - `text-sm` / `text-base` para descrições e listas.
  - `text-muted-foreground` para conteúdo secundário.

---

### 3. Espaçamentos e raios

Os raios são derivados de `--radius` em `globals.css`:

- `--radius`: `0.625rem` (10px).
- Derivações:
  - `--radius-sm`: `calc(var(--radius) * 0.6)`.
  - `--radius-md`: `calc(var(--radius) * 0.8)`.
  - `--radius-lg`: `var(--radius)`.
  - `--radius-xl`: `calc(var(--radius) * 1.4)`.
  - `--radius-2xl`: `calc(var(--radius) * 1.8)`.
  - `--radius-3xl`: `calc(var(--radius) * 2.2)`.
  - `--radius-4xl`: `calc(var(--radius) * 2.6)`.

Uso comum:

- Cards e imagens importantes utilizam `rounded-2xl`.
- Botões CTA utilizam `rounded-full`.
- Elementos menores usam `rounded-lg` / `rounded-xl`.

Espaçamentos (via classes Tailwind):

- Seções:
  - `SectionWrapper` controla os paddings verticais:
    - `normal`: `py-16 lg:py-24`.
    - `highlight` e `faq`: `py-32`.
  - Padding horizontal padrão:
    - `px-4 sm:px-6 lg:px-8`.

- Grids:
  - `gap-6`, `gap-8`, `gap-12`, `gap-20` são frequentes em seções como `About`, `Services`, `Contact`, `FaqSection`.

---

### 4. Componentes de UI

#### 4.1. Botões (`components/ui/button.tsx`)

Implementação:

- Baseado em `@base-ui/react/button` com variantes gerenciadas por `class-variance-authority` (`cva`).
- Exporta:
  - `Button`: componente pronto para uso.
  - `buttonVariants`: função utilitária para montar classes (usado em `<a>`s, por exemplo).

Variantes principais (`variant`):

- `default`:
  - Fundo `bg-primary`, texto `text-primary-foreground`.
  - Efeitos:
    - Hover com leve `-translate-y` e `shadow-md`.
    - `active` com pequena inversão (`translate-y-px`).
  - Uso: **CTA principal** (ex.: “Agende sua consulta”).

- `secondary`:
  - `bg-secondary`, `text-secondary-foreground`.
  - Mesmo padrão de animação suave que o `default`.
  - Uso: CTA secundário (ex.: “Ver informações de contato”).

- `outline`:
  - `border-border`, `bg-background`.
  - Ideal para botões mais discretos.

- `ghost`:
  - Sem fundo definido, foco em hover leve.

- `destructive`:
  - Para estados de erro/remoção.

- `link`:
  - Texto com sublinhado ao passar o mouse.

Tamanhos principais (`size`):

- `default`: altura `h-8`.
- `xs`, `sm`, `lg`: variações menores/maiores.
- `cta`:
  - `h-12`, `min-w-[220px]` (desktop maior).
  - `rounded-full`.
  - Usado em CTAs de destaque (ex.: Hero).
- `icon`, `icon-xs`, `icon-sm`, `icon-lg`: para botões com ícone.

Boas práticas observadas:

- Uso de `buttonVariants` diretamente em `<a>` para manter estilo consistente em links que funcionam como botões.
- Uso da classe `focus-visible` para acessibilidade (`focus-visible:ring-*`).

#### 4.2. SectionWrapper (`components/SectionWrapper.tsx`)

Função:

- Componente de layout que centraliza:
  - Largura máxima (`max-w-7xl`).
  - Paddings verticais por `variant`.
  - Paddings horizontais responsivos.
  - Offset para scroll suave com header fixo.

API:

- `variant: "normal" | "highlight" | "faq"`:
  - `normal`: seções padrão (ex.: `Services`, `Testimonials`).
  - `highlight`: seções com mais respiro visual (ex.: `About`, `Contact`).
  - `faq`: mesmo padding de `highlight`, pensado para FAQ.
- `as`: `section` (default) ou `div`.
- `id`: usado para âncoras (`#sobre`, `#servicos`, etc.).
- `className`: complementa estilos (bordas, fundos específicos).

Padrão de uso:

- Sempre envolver o conteúdo principal de uma seção com `SectionWrapper`, em vez de controlar margens e paddings diretamente nas seções.

#### 4.3. Navegação, accordion e sheet

Principais componentes reutilizados:

- `components/ui/navigation-menu`:
  - Usado em `Header` para o menu desktop, com:
    - Trigger.
    - Content.
    - Links com ícone.

- `components/ui/sheet`:
  - Usado em `Header` para o menu mobile:
    - `SheetTrigger` com `Button` (`variant="ghost"`, `size="icon"`).
    - `SheetContent` lateral (`side="right"`).

- `components/ui/accordion`:
  - Usado em:
    - `FaqSection` (lista de perguntas e respostas).
    - `Header` (menu mobile agrupando “Informações”).

---

### 5. Ícones e ilustrações

#### 5.1. Ícones de terceiros

- Biblioteca: `lucide-react`.
- Usos principais:
  - Navegação (`Menu`, `Stethoscope`, `Mail`, `Info`, `HelpCircle`).
  - Seções (`MapPin`, `Star`, etc.).

#### 5.2. Ícones customizados (`components/icons/*`)

- `WhatsAppIcon.tsx`
- `EmailIcon.tsx`
- `InstagramIcon.tsx`
- `GoogleIcon.tsx`
- `FaqIcon.tsx`

São SVGs em React que seguem `currentColor`, facilitando o uso com as cores do tema.

#### 5.3. Imagens

- `Hero`:
  - `HERO_IMAGE = "/hero.jpg"` como background full-bleed.
- `About`:
  - `ABOUT_IMAGE = "/sobre.jpg"` em card com borda e `rounded-2xl`.
- `FaqSection`:
  - `FAQ_BG_IMAGE = "/faq-side-placeholder.png"` (`next/image`), fundo full-bleed à direita no desktop; bloco empilhado no mobile.

---

### 6. Animações e interações

- `framer-motion`:
  - Usado em `Hero`, `About`, `Services`, `Contact`, `FaqSection`:
    - Animações de entrada (`opacity` + `translateY`) ao entrar na viewport.
    - `viewport={{ once: true, amount: 0.3–0.4 }}` para animação suave no scroll.

- Animação customizada WhatsApp:
  - Definida em `globals.css`:
    - `@keyframes whatsapp-pulse-keyframes` com `box-shadow` pulsante.
    - Classe `.whatsapp-pulse` aplica o efeito.

---

### 7. Diretrizes de uso (internas)

- Usar **sempre**:
  - `SectionWrapper` para seções.
  - `Button` / `buttonVariants` para elementos de ação.
  - Tokens de cor e tipografia já definidos (evitar cores e fontes “avulsas”).

- Preferir:
  - `lucide-react` ou ícones customizados em `components/icons`.
  - `framer-motion` para animações de entrada, mantendo padrões similares entre seções.

Este design system é uma fotografia do estado atual da landing e pode servir de base para evoluções futuras e extração para um template reutilizável.

