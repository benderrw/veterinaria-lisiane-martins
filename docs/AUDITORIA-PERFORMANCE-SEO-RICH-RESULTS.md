# Auditoria: performance, SEO e rich results

**Projeto:** Clínica Veterinária Lisiane Martins (Next.js App Router)  
**Data da auditoria original:** 2026-03-22  
**Re-auditoria (lab local):** 2026-03-21 — após **redimensionamento/compressão** de [`public/images/hero.webp`](../public/images/hero.webp).

**Metodologia:** alinhada às skills [seo-audit](https://skills.sh/coreyhaines31/marketingskills), [schema-markup](https://skills.sh/coreyhaines31/marketingskills) e [ai-seo](https://skills.sh/coreyhaines31/marketingskills) (pacote `coreyhaines31/marketingskills`), com medição Lighthouse e revisão de código.

**URL canónica de referência:** `https://www.lisianemartins.vet/`

---

## Resumo executivo

| Área | Estado atual (código + lab recente) | Ainda a fazer / notas |
|------|-------------------------------------|------------------------|
| Performance (lab) | **`hero.webp` ~949 KB** (~53% menos bytes que a versão ~2 MB anterior). Lighthouse **móvel** pós-build: Performance **0,94**, **LCP ~3,0 s** (ainda ligeiramente acima do alvo “bom” 2,5 s em condições de lab). Desktop: Performance **1,00**, **LCP ~0,78 s**. | Confirmar em **campo** com [PageSpeed Insights](https://pagespeed.web.dev/) na URL pública; opcional: mais compressão ou `sizes`/`srcset` finos se LCP móvel real continuar alto. |
| SEO técnico | Sem alterações desde a sincronização anterior: sitemap, robots, canonical, noindex em previews. | Redirect **apex ↔ www** no hosting (se ainda não estiver fechado). |
| Rich results / schema | Inalterado: `LocalBusiness` + `VeterinaryCare`, FAQ em `@graph`. | **Manual:** Rich Results Test + Schema.org Validator em produção. |
| AI SEO / extractabilidade | Inalterado. | **P2 opcional:** política explícita para crawlers de IA em `robots.txt`. |
| Branding / partilha social | Inalterado (`og.png` ~430 KB, OG/Twitter/manifest). | Depuradores sociais quando houver mudança de imagem ou copy. |

Não foram encontrados itens **P0** bloqueantes no código analisado.

---

## 1. Ferramentas e limitações desta execução

| Ferramenta | Resultado |
|------------|-----------|
| [PageSpeed Insights](https://pagespeed.web.dev/) | **Não executada nesta re-auditoria** — recomendado na URL pública após deploy para dados de campo e comparação com o lab. |
| [Rich Results Test](https://search.google.com/test/rich-results) | **Manual** — colar `https://www.lisianemartins.vet/` após deploy. |
| **Lighthouse 11** (re-auditoria) | **Executado** em `http://127.0.0.1:3010/` após `yarn build` + `PORT=3010 yarn start` (Next.js 16.1.6, produção). Mobile: `--form-factor=mobile`. Desktop: `--preset=desktop`. |
| **Peso em disco** | `hero.webp` **971 536 bytes** (~949 KB); `about-team.webp` ~566 KB; `veterinary-consultation.webp` ~86 KB (valores na data da re-auditoria). |

### 1.1 Métricas Lighthouse (histórico — auditoria original, hero JPG ~2,4 MB)

**Desktop:** Performance 0,96 · SEO 1,00 · LCP ~1,34 s · CLS 0 · FCP ~0,35 s  

**Mobile:** Performance 0,87 · SEO 1,00 · LCP ~3,9 s · CLS 0 · TBT ~120 ms  

### 1.2 Métricas Lighthouse (re-auditoria — hero WebP redimensionado, ~949 KB)

**Desktop** (`--preset=desktop`):

- **Performance:** 1,00  
- **SEO:** 1,00  
- **LCP (numérico):** ~0,78 s  
- **CLS:** 0  
- **FCP:** ~0,28 s  
- **TBT:** 0 ms  

**Mobile** (`--form-factor=mobile`):

- **Performance:** 0,94  
- **SEO:** 1,00  
- **LCP (numérico):** ~3,02 s (limite “bom” CWV lab: 2,5 s)  
- **CLS:** 0  
- **FCP:** ~0,99 s  
- **TBT:** ~45 ms  

**Interpretação:** o redimensionamento do hero **reduziu de forma clara** o LCP móvel em lab (~3,9 s → ~3,0 s) e subiu a pontuação de Performance móvel (~0,87 → ~0,94). O **LCP móvel** continua **marginalmente** acima do limiar “bom” nesta máquina/rede — validar em PSI e em dispositivos reais; candidatos a melhoria futura: compressão adicional, formato **AVIF** com fallback, ou revisão de `sizes` se o layout servir larguras menores do que o ficheiro.

---

## 2. Performance (código + assets)

### 2.1 Estado após re-auditoria

1. **Hero / LCP** — [`sections/Hero.tsx`](../sections/Hero.tsx): WebP, `priority`, `sizes="100vw"`. Asset **`hero.webp` ~949 KB** (antes ~2 MB na mesma extensão). **Melhoria confirmada em lab** (§1.2).

2. **Imagens secundárias** — `about-team.webp` e `veterinary-consultation.webp` mantêm-se; sem novas alterações nesta passagem.

3. **JavaScript** — Framer Motion, FAB com `IntersectionObserver`; **gsap** removido. Monitorizar **INP** em campo (Speed Insights).

4. **Terceiros** — Analytics / Speed Insights só em produção — adequado.

### 2.2 Skills de referência

- **seo-audit:** CWV, peso de imagem LCP.  
- **core-web-vitals:** iterar LCP móvel com dados de campo.

---

## 3. SEO (rastreio, indexação, on-page)

### 3.1 Achados e estado

1. **Sitemap e robots** — [`app/sitemap.ts`](../app/sitemap.ts), [`app/robots.ts`](../app/robots.ts), previews com `noindex`.

2. **Canonical** — [`SITE_URL`](../lib/site.ts); redirect apex/www no hosting recomendado.

3. **Meta `keywords`**, **headings**, **alt do hero** — sem mudanças; mantêm-se conforme auditoria anterior.

### 3.2 Skills de referência

- **seo-audit:** crawlability, canonicalização, on-page.  
- **ai-seo:** FAQ; opcional robots para IA.

### 3.3 Open Graph, Twitter Card, favicon e PWA leve

Inalterado face à sincronização anterior — ver secção correspondente na versão anterior do relatório; [`app/layout.tsx`](../app/layout.tsx) com `manifest`, OG, Twitter; `og.png` ~430 KB.

---

## 4. Rich snippets e dados estruturados

Inalterado: `@graph` com `["LocalBusiness","VeterinaryCare"]` + `FAQPage` em [`app/layout.tsx`](../app/layout.tsx); paridade com [`lib/faq-data.ts`](../lib/faq-data.ts).

**Pendente (manual):** Rich Results Test + Schema.org Validator em produção.

---

## 5. Backlog (atualizado após re-auditoria)

| ID | Estado | Notas |
|----|--------|--------|
| B1 | **Concluído (lab)** | Redimensionamento/compressão do hero refletido em **~949 KB** e melhoria de métricas (§1.2). **Acompanhar** PSI/campo pós-deploy. |
| B2 | **Concluído** | Sitemap, robots, noindex previews. |
| B3 | **Pendente (manual)** | Rich Results + Schema.org na URL pública. |
| B4 | **Pendente (manual)** | PageSpeed Web; Search Console / Speed Insights opcional. |
| B5 | **Concluído** | `gsap` removido. |
| B6 | **Concluído / manter** | Secundárias em WebP; `og.png` comprimido — rever peso se o ficheiro for trocado. |
| B7 | **Parcial** | Alt do hero feito; política bots IA opcional. |
| B8 | **Quando aplicável** | Depuradores sociais. |
| B9 | **P2 opcional** | Se LCP móvel em campo continuar limítrofe: AVIF, mais compressão WebP, ou afinação de `sizes`/larguras geradas. |

---

## 6. Rastreabilidade skills → achados

| Skill (marketingskills) | Uso nesta auditoria |
|-------------------------|---------------------|
| **seo-audit** | CWV; peso LCP; crawlability; meta sociais. |
| **schema-markup** | `@graph`, FAQPage, LocalBusiness + nicho. |
| **ai-seo** | FAQ; robots para IA (P2). |

Implementação técnica futura pode seguir as agent skills Bloom: **`seo`**, **`core-web-vitals`**, **`web-quality-audit`** (ver `DOCS/agent-skills.md` no repositório BLOOM).
