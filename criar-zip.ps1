# Script para criar ZIP do site
# Tudo o que vai para a hospedagem. Nao inclua .git, .claude, os .md de
# documentacao nem os proprios scripts: sao arquivos de trabalho.
$arquivos = @(
    "index.html",
    "galeria.html",
    "robots.txt",
    "sitemap.xml",
    "css",
    "js",
    "images"
)

$destino = "site-cliente.zip"

# Remover ZIP anterior se existir
if (Test-Path $destino) {
    Remove-Item $destino -Force
}

# Criar o arquivo ZIP
Compress-Archive -Path $arquivos -DestinationPath $destino -CompressionLevel Optimal

Write-Host "Arquivo $destino criado com sucesso!" -ForegroundColor Green
Write-Host "Conteúdo incluído:" -ForegroundColor Cyan
foreach ($arquivo in $arquivos) {
    Write-Host "  - $arquivo" -ForegroundColor Yellow
}
