#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Script para criar ZIP do site JV Beleza e Estética
"""

import zipfile
import os
import sys

def criar_zip():
    """Cria arquivo ZIP com os arquivos do site"""

    # Nome do arquivo ZIP
    zip_filename = 'site-cliente.zip'

    # Arquivos e pastas a incluir
    # Tudo o que vai para a hospedagem. Nao inclua .git, .claude, os .md de
    # documentacao nem os proprios scripts: sao arquivos de trabalho.
    items = [
        'index.html',
        'galeria.html',
        'robots.txt',
        'sitemap.xml',
        'css',
        'js',
        'images'
    ]

    try:
        # Remove ZIP anterior se existir
        if os.path.exists(zip_filename):
            os.remove(zip_filename)
            print(f'Arquivo {zip_filename} anterior removido.')

        # Cria o arquivo ZIP
        with zipfile.ZipFile(zip_filename, 'w', zipfile.ZIP_DEFLATED) as zipf:
            for item in items:
                if os.path.isfile(item):
                    # Adiciona arquivo
                    zipf.write(item)
                    print(f'Adicionado: {item}')
                elif os.path.isdir(item):
                    # Adiciona pasta e todo seu conteúdo
                    for root, dirs, files in os.walk(item):
                        for file in files:
                            file_path = os.path.join(root, file)
                            zipf.write(file_path)
                            print(f'Adicionado: {file_path}')

        print(f'\nOK: arquivo {zip_filename} criado com sucesso!')
        print(f'\nConteúdo incluído:')
        for item in items:
            print(f'  - {item}')

        return True

    except Exception as e:
        print(f'ERRO ao criar ZIP: {e}')
        return False

if __name__ == '__main__':
    criar_zip()
