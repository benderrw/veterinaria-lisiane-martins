## Seções da landing – Clínica Veterinária Lisiane Martins

Este documento descreve o objetivo, estrutura de conteúdo e papel na conversão de cada seção da landing page.

---

### 1. Hero (`sections/Hero.tsx`)

- **Objetivo**:
  - Ser o primeiro contato visual do usuário.
  - Comunicar em 1–2 frases o que a clínica faz, para quem e onde.
  - Direcionar imediatamente para o agendamento de consulta.

- **Estrutura de conteúdo**:
  - Background full-screen com imagem (`/hero.jpg`).
  - `h1`:
    - Destaque para “Clínica Veterinária em Pelotas”.
    - Texto leve com parte em `font-light` e parte em `font-semibold`.
  - Parágrafo (`p`) explicando:
    - Tipos de serviço (consultas, vacinação, exames, cirurgias).
    - Foco em atendimento humanizado.
  - CTAs:
    - Botão principal:
      - Texto: “Agende sua consulta”.
      - Link: `NEXT_PUBLIC_WHATSAPP_URL` (ou fallback `wa.me`).
      - Variante: `buttonVariants({ variant: "default", size: "cta" })`.
    - Botão secundário:
      - Texto: “Ver informações de contato”.
      - Link interno: `#contato`.
      - Variante: `buttonVariants({ variant: "secondary", size: "cta" })`.

- **Papel na conversão**:
  - Capturar atenção com imagem e headline.
  - Direcionar para uma ação concreta (WhatsApp).
  - Facilitar o scroll para a seção de contato, para quem quer ver mais detalhes.

- **Layout / responsividade**:
  - Seção ocupa `min-h-[100vh]` (uma dobra inteira).
  - Em telas grandes, grid com espaço reservado para conteúdo à direita.
  - Texto centralizado em mobile, alinhado à direita em desktop.

---

### 2. Nossos serviços (`sections/Services.tsx`)

- **Objetivo**:
  - Apresentar de forma clara os serviços principais oferecidos.
  - Transmitir profissionalismo e amplitude do atendimento.

- **Estrutura de conteúdo**:
  - Título (`h2`): “Nossos serviços”.
  - Grid de cards, cada um com:
    - Ícone (ex.: `Stethoscope`, `Syringe`, `Scissors`, `Heart`, `ShieldCheck`, `PhoneCall`).
    - Título (consultas, vacinação, cirurgias, cardiologia, preventivo, atendimento humanizado).
    - Descrição curta com foco em benefício para o tutor e o pet.

- **Papel na conversão**:
  - Ajudar o usuário a validar se a clínica oferece o que ele precisa.
  - Transmitir abrangência de serviços, incluindo especialidades (cardiologia).
  - Refletir o cuidado preventivo e o atendimento humanizado como diferenciais.

- **Layout / responsividade**:
  - Grid responsivo:
    - `sm:grid-cols-2`.
    - `lg:grid-cols-3`.
  - Cards com:
    - `rounded-2xl`, `border`, `bg-card`, `shadow-sm`.
    - Ícone em container `bg-primary/10` e `text-primary`.

---

### 3. Sobre nós (`sections/About.tsx`)

- **Objetivo**:
  - Contar a história e o posicionamento da clínica.
  - Reforçar a confiança e o aspecto humanizado do atendimento.

- **Estrutura de conteúdo**:
  - Imagem (`/sobre.jpg`) em card com borda e `rounded-2xl`.
  - Título (`h2`): “Sobre nós”.
  - Parágrafo explicando:
    - Atuação em Pelotas.
    - Foco em atendimento humanizado.
    - Oferta de consultas, vacinação, cirurgias e acompanhamento preventivo.
  - Lista de valores (`VALUES`):
    - Cada item com:
      - Título (ex.: “Serenidade”, “Propósito”).
      - Descrição curta reforçando o clima e propósito da clínica.

- **Papel na conversão**:
  - Gerar empatia com o tutor.
  - Posicionar a clínica como um ambiente confiável e acolhedor.
  - Equilibrar informação objetiva (serviços) com narrativa (valores).

- **Layout / responsividade**:
  - `grid` em duas colunas em desktop (imagem + texto/valores).
  - Em mobile, imagem acima e texto/valores abaixo.
  - Usa `SectionWrapper` com `variant="highlight"` e `bg-surface`.

---

### 4. Contato (`sections/Contact.tsx`)

- **Objetivo**:
  - Facilitar o contato do tutor pelos canais principais (endereço, WhatsApp, e-mail).
  - Reforçar a localização física via mapa.

- **Estrutura de conteúdo**:
  - Título (`h2`): “Contato”.
  - Blocos de informação:
    - Endereço:
      - Texto com rua, bairro, cidade e estado.
      - Link para Google Maps (`MAPS_LINK`).
      - Ícone `MapPin`.
    - Telefone / WhatsApp:
      - Texto com número `PHONE`.
      - Link para `NEXT_PUBLIC_WHATSAPP_URL` ou fallback.
      - Ícone `WhatsAppIcon`.
    - E-mail:
      - Texto `EMAIL`.
      - Link `mailto:EMAIL`.
      - Ícone `EmailIcon`.
  - Coluna com `iframe` do Google Maps:
    - `aspect-[4/3]`, `rounded-2xl`, `border`.
    - `loading="lazy"`.

- **Papel na conversão**:
  - Fechar o ciclo de confiança: dados concretos de contato e endereço.
  - Reduzir atrito para quem já decidiu agendar ou visitar.

- **Layout / responsividade**:
  - Grid com duas colunas em desktop (texto + mapa).
  - Em mobile, texto seguido do mapa.
  - Usa `SectionWrapper` com `variant="highlight"`.

---

### 5. Perguntas frequentes (`sections/faq/FaqSection.tsx`)

- **Objetivo**:
  - Reduzir dúvidas e objeções comuns antes do contato.
  - Esclarecer temas recorrentes (horários, primeira consulta, emergências, pagamento).

- **Estrutura de conteúdo**:
  - Título (`h2`): “Perguntas frequentes”.
  - Accordion (`Accordion` de `components/ui/accordion`):
    - Itens com `question` e `answer` (horário, primeira consulta, emergências, formas de pagamento).
  - Coluna de apoio com `FaqIllustration`:
    - Título “Ainda tem dúvidas?”.
    - Texto incentivando contato via WhatsApp/Instagram.
    - Botão CTA para WhatsApp.
    - Botão CTA para Instagram.

- **Papel na conversão**:
  - Tirar “barreiras mentais” comuns:
    - “Preciso agendar?”.
    - “Atendem emergência?”.
    - “Como funciona pagamento?”.
  - Direcionar quem ainda está inseguro a tirar dúvidas em canais diretos.

- **Layout / responsividade**:
  - Em desktop:
    - Accordion ocupa `lg:col-span-4`.
    - Ilustração ocupa `lg:col-span-2`.
  - Em mobile:
    - Accordion acima, ilustração abaixo.
  - Usa `SectionWrapper` com `variant="faq"` e `bg-surface`.

---

### 6. Depoimentos (`sections/Testimonials.tsx`)

- **Objetivo**:
  - Exibir avaliações reais dos tutores (prova social).
  - Aumentar confiança e reduzir incerteza.

- **Estrutura de conteúdo**:
  - Título (`h2`): “Depoimentos”.
  - Subtítulo explicando que as avaliações vêm do Google.
  - Carrossel de depoimentos:
    - Integrado via `embla-carousel-react`.
    - Cada slide contém:
      - Avaliação (ícones `Star` com preenchimento proporcional ao rating).
      - Texto do depoimento (`review.text`).
      - Nome do autor (`review.author_name`).
      - Foto de perfil se disponível (`profile_photo_url`), com fallback em círculo com inicial do nome.
  - Mensagens de estado:
    - “Carregando depoimentos...” enquanto busca `/api/reviews`.
    - Mensagem fallback se não houver avaliações.

- **Papel na conversão**:
  - Fornecer evidência social da qualidade do atendimento.
  - Diferenciar a clínica de outras opções na região.

- **Layout / responsividade**:
  - Slides com largura flexível:
    - Em mobile, ~85% da largura.
    - Em telas maiores, ~45% ou 32% da largura do carrossel.
  - Controles de navegação com botões de seta.
  - Dica de uso em mobile (“Arraste para o lado…”).

---

### 7. Outras seções/elementos relevantes

#### 7.1. GalleryBento (`sections/GalleryBento.tsx`)

- Arquivo existe, mas atualmente está vazio (`export {}`).
- Idealizado para uma futura seção de galeria de fotos da clínica/pacientes.

#### 7.2. FloatingWhatsAppButton (em `components/FloatingWhatsAppButton.tsx`)

- Não detalhado neste documento, mas:
  - Exibe um botão flutuante fixo no canto da tela.
  - Usa animação `.whatsapp-pulse` definida em `globals.css`.
  - Linka para o WhatsApp com a mesma URL do restante do site.
- Papel na conversão:
  - Prover um ponto de contato rápido a qualquer momento do scroll.

---

### 8. Resumo por funil de conversão

Mapeando as seções em termos de funil:

- **Topo (atração)**:
  - `Hero`: headline, benefits rápidos, imagem forte.

- **Meio (consideração)**:
  - `Services`: o que exatamente a clínica oferece.
  - `About`: quem somos, valores, posicionamento.
  - `Testimonials`: prova social (quando ativado).

- **Fundo (decisão)**:
  - `FaqSection`: tira dúvidas e reduz objeções.
  - `Contact`: informações concretas para agendar/visitar.
  - `FloatingWhatsAppButton`: atalho de decisão ao longo da página.

Esse mapeamento ajuda a entender como cada parte da landing contribui para a jornada do usuário até o contato com a clínica.

