# Votação em Plenária

Este é um sistema de votação para reuniões plenárias, onde os participantes podem votar em propostas, 
e administradores podem modificar a pergunta e resetar os votos.

## Funcionalidades

- Votação de Sim ou Não sobre uma pergunta.
- Login para os usuários.
- Admin com permissões especiais:
- Alteração da pergunta de votação.
- Reset de votos.
- Exibição de resultados com a contagem de votos.

## Tecnologias Utilizadas

- HTML para estruturação das páginas.
- CSS para estilização.
- JavaScript para lógica de votação, login e administração.
- localStorage para armazenamento de dados local (ex: contagem de votos e pergunta).

## Pré-requisitos

Antes de começar, verifique se você tem o seguinte instalado:

Navegador Web moderno (Chrome, Firefox, etc.) para executar o site localmente.
Git para clonar o repositório (opcional).

## Instalação

Siga as etapas abaixo para configurar o projeto localmente:

1 Clone o repositório:
'bash
git clone https://github.com/seu-usuario/seu-repositorio.git

2 Acesse o diretório do projeto:
'bash
cd seu-repositorio

3 Abra o arquivo index.html em seu navegador de preferência para visualizar o projeto.

## Como usar

- Login: O usuário precisa realizar login com um nome de usuário e senha. Um administrador (com usuário admin e senha admin123) tem permissões especiais para alterar a pergunta e resetar os votos.
- Votação: Após o login, o usuário pode votar "Sim" ou "Não" na pergunta atual. Os votos são armazenados localmente e contados em tempo real.
- Administração: O administrador pode:
Alterar a pergunta de votação.
Resetar os votos (limpar a contagem de votos).

## Licença

Licença
Este projeto está licenciado sob a MIT License - consulte o arquivo LICENSE para mais detalhes.