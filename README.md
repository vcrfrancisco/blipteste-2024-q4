# blipteste-2024-q4
Teste técnico para Chatbot Dev Pleno na Take Blip no quarto tri de 2024

Esse repositório é composto por:

# API

O conteúdo da pasta **./api** é uma aplicação API REST na linguagem Javascript, usando Node.js e o framework Express.

Antes de qualquer operação, é necessário:

```
cd api
npm i
```

Orientações dentro desta seção de API considerarão que esses dois comandos foram executados.

## Testes de unidade

Para executar os testes de unidade:

```
npm run test
```

## Executando de forma local

Para testar de maneira local, é necessário preencher um arquivo .env de acordo com o arquivo `./api/.env.example`. 
Os parâmetros são:

* **GITHUB_TOKEN**: _fine grained token_ pessoal do github para autenticação na API. 
> [!NOTE]  
> Para um fork de uso corporativo, a autenticação deverá ser alterada para usar autênticação com parâmetros de login e senha.

* **PORT**: _port_ a ser usada pela aplicação.

### Iniciando aplicação

```
npm run dev
```

### Deixar api pública

Recomendado usar [ngrok](https://ngrok.com).

```
cd api
npm run dev-api
```

## Aplicação na web

Para executar a pipe de CD e hospedar o aplicativo, foi utilizado a [Aplicação Web da Microsoft Azure](https://azure.microsoft.com/pt-br/products/app-service/web). 

Para replicar, é recomendado criar essa aplicação e substituir, no arquivo `.github\workflows\application_blip-test-2024q4.yml` os parâmetros `client_id`, `tenant-id` e `subscription_id` pelo da aplicação criada.


# Flow

O conteúdo da pasta **./api** é o fluxo do Builder da [Take Blip](https://www.blip.ai). 

Para usá-lo no portal da Blip, basta criar um bot ou usar um bot existente e importar o arquivo .json da pasta em **Builder**>**Configurações**>**Versões**. 

> [!WARNING]  
> Essa operação substituirá qualquer conteúdo existente dentro do bot aberto no portal

# Links úteis

* [Plataforma Blip](https://www.blip.ai) 
* [Serviços de aplicativo Web da Microsoft Azure](https://azure.microsoft.com/pt-br/products/app-service/web)
* [Documentação do express](https://expressjs.com)
* [Documentação do Jest](https://jestjs.io/docs/configuration)
