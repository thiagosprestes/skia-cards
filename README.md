<h1 align="center">
<br>
  <img src="https://user-images.githubusercontent.com/306134/146549218-b7959ad9-0107-4c1c-b439-b96c780f5230.png" width="auto" height="120" alt="skia-cards">
<br>
<br>
<b>
Skia cards 💳
</b>
</h1>

<p align="center">
App desenvolvido para aprender sobre skia e como integrar ele com o React Native
</p>

# 📋 Índice

- [Telas](#-Telas)
- [Sobre o projeto](#-Sobre-o-projeto)
  - [Funcionalidades](#-Funcionalidades)
- [Tecnologias utilizadas](#-Tecnologias-utilizadas)
- [Rodando o projeto](#-Rodando-o-projeto)
  - [Pré-requisitos](#-Pré-requisitos)
  - [Rodando o app](#-Rodando-o-app)

## 🎨 Telas

<img src=".github/visa.gif" />
<img src=".github/elo.gif" />

## 📃 Sobre o projeto

A ideia de criação do projeto surgiu após o lançamento da sdk 46 do expo, que trouxe suporte ao skia.

Skia é uma lib que permite a renderização de gráficos de alta performance 2D no dispositivo, permitindo que você possa desenhar a interface da maneira que quiser.

A ideia inicial do projeto era somente fazer um form para preenchimento dinamico de dados de um cartão, esse cartão é inteiramente desenhado com skia e suas animações são feitas com react native reanimated.

Durante o desenvolvimento do projeto o <a href="https://github.com/rBressans">rBressans</a> deu a ideia de adicionar a leitura de cartões via antena NFC do dispositivo, assim preenchendo o número e data de expiração do cartão automaticamente, sem a necessidade de digitação.

### 💳 Funcionalidades

- Preencher dados do cartão no form
- Ler cartões através da antena NFC

## 🛠 Tecnologias utilizadas

- ⚛ **React Native** - Aplicativo
- 🎨 **React Native Skia** - Desenho do cartão
- 🎇 **React Native Reanimated** - Animações do cartão
- 💳 **React Native NFC Manager** - Leitura de cartão através da antena NFC
- 💻 **Node TLV** - Leitura de dados codificados
- 💭 **React Native Snackbar** - Mensagens de validação do form

## 🚀 Rodando o projeto

### Pré-requisitos

- Git
- Yarn
- Conhecimento prévio de como rodar projetos com React Native

### 📲 Rodando o app

Com a máquina devidamente configurada para rodar projetos com React Native, clone o repositório

```bash

# Clona o repositório
git clone https://github.com/thiagosprestes/skia-cards.git

```

Navegue até a pasta do projeto clonado e execute os comandos abaixo

```bash

# Entra na pasta do app
cd skia-cards

# Instala as dependências
yarn

```

Após concluir a instalação das dependências, ainda no terminal da pasta do app com o emulador aberto ou device físico conectado via adb execute o comando abaixo

```bash

# Instala a aplicação no device
yarn android

```

Após concluir a instalação, execute o seguinte comando para rodar o app

```bash

# Inicia a aplicação
yarn start

```
