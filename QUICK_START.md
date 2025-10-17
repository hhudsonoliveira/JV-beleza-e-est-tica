# 🚀 Guia Rápido de Início - JV Beleza & Estética

## ⚡ Para Começar Agora (5 minutos)

### 1. Abra o Site
```bash
# Simplesmente abra o arquivo no navegador:
# Clique duplo em: index.html
```

Ou arraste o arquivo `index.html` para o seu navegador favorito.

---

## 📸 Primeira Personalização: Adicionar Suas Fotos

### Hero Section (Fundo Principal)
1. Adicione sua melhor foto do salão na pasta `images/`
   - Nome sugerido: `hero-background.jpg`
   - Tamanho ideal: 1920x1080px
   - Formato: JPG ou PNG

2. Abra `css/style.css` e localize a linha **400** (seção `.hero`)

3. Substitua:
```css
/* DE: */
background: linear-gradient(135deg, #5c3a1e 0%, #8b6239 50%, #d4a574 100%);

/* PARA: */
background: linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.3)),
            url('../images/hero-background.jpg');
background-size: cover;
background-position: center;
```

### Adicionar Logo
1. Salve seu logo como `logo.png` na pasta `images/`

2. Abra `index.html` e localize a linha **69** (seção do logo)

3. Substitua:
```html
<!-- DE: -->
<a href="#home" class="nav-logo">
    <span class="logo-text">JV</span> Beleza & Estética
</a>

<!-- PARA: -->
<a href="#home" class="nav-logo">
    <img src="images/logo.png" alt="JV Beleza & Estética" style="height: 50px;">
</a>
```

---

## 🎨 Trocar Cores do Site

Abra `css/style.css` e edite as linhas **7-14**:

```css
:root {
    --primary-black: #0a0a0a;      /* Cor principal escura */
    --primary-brown: #5c3a1e;      /* Cor principal do site */
    --primary-gold: #d4a574;       /* Cor de destaque dourada */
    --secondary-peach: #e8a080;    /* Cor secundária */
    --accent-yellow: #e6c84a;      /* Cor de acento */
    --accent-green: #b8a842;       /* Cor de acento verde */
    --text-white: #ffffff;         /* Branco */
}
```

**Dica:** Use um [Color Picker](https://htmlcolorcodes.com/) para escolher novas cores!

---

## 📱 Testar WhatsApp

### Desktop
1. Abra o site
2. Clique no botão flutuante verde (canto inferior direito)
3. Deve abrir o WhatsApp Web com mensagem pré-preenchida

### Mobile
1. Abra o site no celular
2. Clique em qualquer botão de WhatsApp
3. Deve abrir o app do WhatsApp diretamente

**Número configurado:** (71) 99170-2820

---

## 📍 Atualizar Mapa do Google

1. Acesse [Google Maps](https://www.google.com/maps)

2. Digite seu endereço: `Rua Santo Agostinho, 50, São Cristóvão, Salvador`

3. Clique em **Compartilhar** → **Incorporar mapa**

4. Copie o código

5. Abra `index.html` e localize a linha **587** (seção do mapa)

6. Substitua o código do `<iframe>` pelo novo

---

## ✏️ Editar Textos

Todos os textos estão no arquivo `index.html`. Busque por:

- **Hero:** Linha 97 - Título principal
- **Sobre:** Linha 137 - Texto sobre o salão
- **Serviços:** Linha 196+ - Lista de serviços
- **Contato:** Linha 481+ - Informações de contato

**Dica:** Use `Ctrl + F` para buscar textos específicos!

---

## 🌐 Colocar Online

### Opção 1: Hospedagem Gratuita (Netlify) ⭐ Recomendado

1. Crie conta em [Netlify](https://www.netlify.com/)
2. Arraste a pasta do projeto para o Netlify
3. Pronto! Seu site está no ar em segundos

### Opção 2: GitHub Pages (Grátis)

```bash
# 1. Crie repositório no GitHub
# 2. Faça upload dos arquivos
# 3. Ative GitHub Pages nas configurações
# 4. Acesse: seunome.github.io/jv-beleza
```

### Opção 3: Hospedagem Tradicional

1. Contrate uma hospedagem (Hostinger, HostGator, etc.)
2. Faça upload via FTP de todos os arquivos
3. Configure seu domínio

---

## 🔧 Resolução de Problemas

### Site não abre
- ✅ Certifique-se de que todos os arquivos estão na mesma pasta
- ✅ Verifique se as pastas `css`, `js` e `images` existem
- ✅ Tente abrir em outro navegador

### WhatsApp não funciona
- ✅ Verifique se o número está correto: `5571991702820`
- ✅ Formato: 55 (país) + 71 (DDD) + número
- ✅ Teste em outro dispositivo

### Menu mobile não abre
- ✅ Abra o Console do navegador (F12)
- ✅ Verifique se há erros em vermelho
- ✅ Confirme que o arquivo `js/script.js` está na pasta correta

### Imagens não aparecem
- ✅ Verifique se o caminho está correto: `images/nome-da-foto.jpg`
- ✅ Certifique-se de que as imagens estão na pasta `images/`
- ✅ Nomes de arquivo são case-sensitive (maiúsculas/minúsculas)

---

## 📞 Precisa de Ajuda?

**WhatsApp:** (71) 99170-2820

**Email:** Configure seu email e adicione aqui

---

## ✅ Checklist Antes de Publicar

- [ ] Substitui a imagem placeholder por foto real
- [ ] Testei todos os links
- [ ] Verifiquei o site no celular
- [ ] WhatsApp está funcionando
- [ ] Todos os textos estão corretos
- [ ] Horário de funcionamento está atualizado
- [ ] Endereço e mapa estão corretos
- [ ] Testei o formulário de contato
- [ ] Adicionei favicon personalizado
- [ ] Configurei domínio próprio

---

## 🎯 Próximos Passos Recomendados

### Semana 1
1. [ ] Adicionar fotos reais do salão
2. [ ] Configurar Google My Business
3. [ ] Criar perfil no Instagram
4. [ ] Adicionar link do Instagram no site

### Semana 2
5. [ ] Cadastrar no Google Search Console
6. [ ] Configurar Google Analytics
7. [ ] Solicitar avaliações de clientes
8. [ ] Adicionar seção de depoimentos

### Mês 1
9. [ ] Criar conteúdo para blog
10. [ ] Fazer campanha nas redes sociais
11. [ ] Otimizar SEO com palavras-chave locais
12. [ ] Adicionar galeria de antes/depois

---

## 📚 Documentação Completa

Para mais detalhes, consulte:
- **README.md** - Documentação completa do projeto
- **CHECKLIST.md** - Lista de verificação detalhada

---

## 🎉 Pronto!

Seu site está pronto para receber clientes!

**Lembre-se:**
- Mantenha as informações sempre atualizadas
- Responda rapidamente as mensagens do WhatsApp
- Adicione novas fotos regularmente
- Peça feedback dos clientes

**Boa sorte com seu negócio! 💅✨**

---

*Website desenvolvido com HTML5, CSS3 e JavaScript puro*
*100% responsivo e otimizado para SEO*
