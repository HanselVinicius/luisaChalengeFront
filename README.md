# Desafio Técnico LuizaLabs
Este repositório contém a implementação do Desafio Técnico proposto pela LuizaLabs.
---

## 1. Introdução  
A tecnologia escolhida para o desenvolvimento deste projeto foi **Next.js**, um framework para React que permite criar aplicações web otimizadas e escaláveis. O uso de **TypeScript** proporciona **tipagem estática**, maior segurança no código e melhor experiência de desenvolvimento.  
---

## 2. Arquitetura  

A aplicação segue a estrutura recomendada pelo **Next.js**, aproveitando seu backend integrado para fornecer APIs exclusivas ao frontend. A abordagem busca **modularidade, separação de responsabilidades e facilidade de manutenção**.

### 🔹 **Principais conceitos aplicados**  

- **Backend exclusivo para o frontend**  
  - Rotas dentro de `app/api/` fornecem dados e manipulações apenas para a aplicação frontend, evitando dependências externas desnecessárias.  

- **Componentização com ShadCN UI**  
  - Foi utilzado **ShadCN UI**, garantindo um conjunto de componentes acessíveis, estilizados e fáceis de manter.  

- **Testes automatizados**  
  - Testes unitários  implementados utilizando **Jest.js**, garantindo maior confiabilidade do código e evitando regressões.  

---

## 3. Ferramentas Utilizadas  

O projeto foi desenvolvido utilizando as seguintes tecnologias:  

- **Next.js** → Framework para React, otimizando performance e permitindo backend integrado.  
- **TypeScript** → Tipagem estática para maior robustez e escalabilidade.  
- **ShadCN UI** → Biblioteca de componentes estilizados e acessíveis.  
- **Jest.js** → Framework de testes automatizados.  
- **Docker** → Facilita a execução do projeto de forma isolada.  
---

## 4. Como Executar o Projeto  

Existem duas formas principais de rodar o projeto:  

### **4.1. Usando Docker Compose**  

Para rodar o projeto de forma rápida utilizando **Docker Compose**, siga os passos abaixo:  

1. Crie um arquivo `.env` com base no exemplo disponível em `.env.example`.  
2. Execute o seguinte comando para iniciar os containers:  

```bash
docker compose up -d
```
OBS: Deixar tanto o frontend quanto o Backend no mesmo diretório para que funcione com êxito e o container pode demorar um pouco para ser construído na primeira execução.

4.2. Rodando Localmente
Se preferir rodar o projeto localmente, siga os passos abaixo:

Instale as dependências:
```bash
npm install
```

Inicie a aplicação:
```bash
npm run dev
```
A aplicação estará disponível em http://localhost:3000.
