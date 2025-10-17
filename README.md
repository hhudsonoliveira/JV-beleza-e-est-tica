# JV Beleza & Estética - Website Oficial

Website profissional desenvolvido para o salão **JV Beleza & Estética**, localizado em São Cristóvão, Salvador - BA.

## 📋 Sobre o Projeto

Site moderno, elegante e totalmente responsivo criado com **HTML5, CSS3 e JavaScript puro (Vanilla JS)**, sem dependências de frameworks ou bibliotecas externas. O objetivo é proporcionar uma presença online profissional que converta visitantes em clientes através de CTAs estratégicos para WhatsApp.

## ✨ Funcionalidades

### 🎨 Design & Interface
- Design elegante e luxuoso com paleta de cores sofisticada
- Layout totalmente responsivo (mobile, tablet, desktop)
- Animações suaves e efeitos hover refinados
- Tipografia moderna com Google Fonts (Playfair Display + Poppins)
- Gradientes e sombras sutis para profundidade visual

### 📱 Navegação
- Menu de navegação fixo com efeito ao rolar
- Menu hamburguer funcional para dispositivos móveis
- Smooth scroll para navegação entre seções
- Botão "voltar ao topo" que aparece ao rolar

### 🚀 Funcionalidades JavaScript
- **Menu Mobile**: Abertura/fechamento suave com overlay
- **Smooth Scroll**: Navegação suave entre seções
- **Scroll Effects**: Header com background ao rolar
- **Intersection Observer**: Animações fade-in ao entrar no viewport
- **Validação de Formulário**: Validação em tempo real dos campos
- **Máscara de Telefone**: Formatação automática (71) 99999-9999
- **Integração WhatsApp**: Envio direto de mensagens do formulário

### 📞 Conversão & Contato
- Botão flutuante de WhatsApp sempre visível
- Múltiplos CTAs estratégicos ao longo do site
- Formulário de contato com validação
- Integração com Google Maps para localização
- Links clicáveis para telefone em dispositivos móveis

### 🔍 SEO Otimizado
- Meta tags completas (title, description, keywords)
- Open Graph tags para preview em redes sociais
- Schema.org LocalBusiness markup
- Estrutura semântica HTML5
- Alt text em todas as imagens
- URLs e âncoras amigáveis

## 📂 Estrutura do Projeto

```
jv-beleza-estetica/
│
├── index.html              # Página principal com estrutura HTML5 semântica
├── css/
│   └── style.css          # Todos os estilos, animações e media queries
├── js/
│   └── script.js          # Todas as funcionalidades JavaScript
├── images/                 # Pasta para imagens (adicione suas fotos aqui)
│   └── placeholder.jpg    # Imagem placeholder para o hero
└── README.md              # Este arquivo
```

## 🎨 Paleta de Cores

```css
--primary-black: #0a0a0a;      /* Preto principal */
--primary-brown: #5c3a1e;      /* Marrom elegante */
--primary-gold: #d4a574;       /* Dourado sofisticado */
--secondary-peach: #e8a080;    /* Pêssego suave */
--accent-yellow: #e6c84a;      /* Amarelo destaque */
--accent-green: #b8a842;       /* Verde oliva */
--text-white: #ffffff;         /* Branco puro */
```

## 🚀 Como Usar

### 1. Instalação
Não há necessidade de instalação! Basta abrir o arquivo `index.html` em qualquer navegador moderno.

```bash
# Clone ou baixe os arquivos
# Abra index.html no navegador
```

### 2. Personalização

#### Trocar Imagens
1. Adicione suas fotos na pasta `images/`
2. No arquivo `index.html`, procure por `background:` no CSS inline da seção hero
3. Substitua o gradiente por sua imagem: `background-image: url('images/sua-foto.jpg');`

#### Alterar Cores
1. Abra `css/style.css`
2. Localize a seção `:root` no início do arquivo
3. Modifique as variáveis de cor conforme necessário

#### Modificar Textos
1. Abra `index.html`
2. Localize a seção desejada (Hero, Sobre, Serviços, etc.)
3. Edite o conteúdo mantendo as tags HTML

#### Alterar Número do WhatsApp
1. Procure por `5571991702820` nos arquivos
2. Substitua pelo novo número no formato: `55` + `DDD` + `número`
3. Locais para alterar:
   - `index.html`: Links e botões
   - `js/script.js`: Função `sendToWhatsApp()`

#### Atualizar Endereço no Google Maps
1. Abra `index.html`
2. Localize a seção do mapa (tag `<iframe>`)
3. Acesse [Google Maps](https://www.google.com/maps)
4. Busque seu endereço
5. Clique em "Compartilhar" → "Incorporar mapa"
6. Copie o código e substitua no HTML

### 3. Adicionar Novos Serviços

```html
<!-- Copie este modelo e adicione na seção de serviços -->
<div class="service-card">
    <div class="service-icon">
        <!-- Adicione seu ícone SVG aqui -->
    </div>
    <h4 class="service-title">Nome do Serviço</h4>
    <p class="service-description">Descrição do serviço</p>
</div>
```

### 4. Adicionar Redes Sociais no Footer

```html
<!-- Adicione na seção footer -->
<div class="footer-column">
    <h4 class="footer-heading">Redes Sociais</h4>
    <div class="social-links">
        <a href="https://instagram.com/seu-usuario" target="_blank">
            <svg><!-- Ícone Instagram --></svg>
        </a>
        <a href="https://facebook.com/sua-pagina" target="_blank">
            <svg><!-- Ícone Facebook --></svg>
        </a>
    </div>
</div>
```

## 📱 Responsividade

O site é totalmente responsivo e foi testado nos seguintes breakpoints:

- **Mobile Small**: 320px - 480px
- **Mobile**: 481px - 768px
- **Tablet**: 769px - 1024px
- **Desktop**: 1025px - 1440px
- **Large Desktop**: 1441px+

## 🌐 Navegadores Suportados

- Chrome (últimas 2 versões)
- Firefox (últimas 2 versões)
- Safari (últimas 2 versões)
- Edge (últimas 2 versões)
- Opera (últimas 2 versões)

## ⚡ Performance

### Otimizações Implementadas
- CSS organizado e minificável
- JavaScript modular e eficiente
- Lazy loading de imagens (atributo `loading="lazy"`)
- Intersection Observer para animações otimizadas
- Debounce em eventos de scroll
- Sem dependências externas pesadas
- Código semântico e limpo

### Dicas para Melhorar Performance
1. **Otimize imagens**: Use ferramentas como [TinyPNG](https://tinypng.com/) ou [ImageOptim](https://imageoptim.com/)
2. **Minifique arquivos**: Use ferramentas para minificar CSS e JS antes de publicar
3. **Use CDN**: Hospede em um CDN para carregamento mais rápido
4. **Habilite cache**: Configure cache no servidor
5. **Comprima arquivos**: Habilite GZIP/Brotli no servidor

## 🔧 Manutenção

### Atualizar Horários de Funcionamento
1. Abra `index.html`
2. Localize a seção de contato
3. Modifique os horários no card de informações
4. Atualize também no Schema.org (seção `<script type="application/ld+json">`)

### Adicionar Novos Depoimentos
```html
<div class="testimonial-card">
    <div class="testimonial-image">
        <img src="images/cliente.jpg" alt="Nome do Cliente">
    </div>
    <p class="testimonial-text">"Depoimento do cliente aqui..."</p>
    <h4 class="testimonial-name">Nome do Cliente</h4>
    <div class="testimonial-rating">⭐⭐⭐⭐⭐</div>
</div>
```

## 📊 SEO - Checklist

- ✅ Meta tags otimizadas
- ✅ Open Graph tags
- ✅ Schema.org markup
- ✅ Alt text em imagens
- ✅ Heading hierarchy (H1, H2, H3)
- ✅ URLs semânticas
- ✅ Sitemap (crie com ferramentas online)
- ✅ Robots.txt (configure no servidor)
- ✅ Velocidade otimizada
- ✅ Mobile-friendly

### Próximos Passos para SEO
1. Cadastre no [Google Search Console](https://search.google.com/search-console)
2. Cadastre no [Google My Business](https://business.google.com/)
3. Crie e envie um sitemap.xml
4. Configure o Google Analytics
5. Otimize para palavras-chave locais

## 📞 Informações de Contato

**JV Beleza & Estética**
- 📍 Endereço: Rua Santo Agostinho, nº 50, São Cristóvão - Salvador, BA
- 📱 WhatsApp/Telefone: (71) 99170-2820
- 🕐 Horário: Segunda a Sexta: 09:00 - 18:00 | Sábado: 09:00 - 14:00

## 🎯 Funcionalidades Futuras (Opcionais)

Sugestões de melhorias que podem ser implementadas:

1. **Blog**: Seção com dicas de beleza e cuidados
2. **Galeria**: Antes e depois dos tratamentos
3. **Agendamento Online**: Sistema de reserva integrado
4. **Programa de Fidelidade**: Área do cliente
5. **Chat Online**: Suporte em tempo real
6. **Multi-idioma**: Versão em inglês/espanhol
7. **Dark Mode**: Modo escuro opcional
8. **PWA**: Transformar em Progressive Web App

## 📝 Licença

Este projeto foi desenvolvido exclusivamente para **JV Beleza & Estética**.

## 🤝 Suporte

Para suporte ou dúvidas sobre o website:
- 📱 WhatsApp: (71) 99170-2820
- 📧 Email: contato@jvbelezaestetica.com.br (configure seu email)

---

**Desenvolvido com ❤️ para JV Beleza & Estética**

*Website criado com HTML5, CSS3 e JavaScript puro - 100% responsivo e otimizado*
