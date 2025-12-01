# 👾 NestJS Chaos Pet API

> **Aviso:** Este não é um CRUD comum. Este servidor tem pulso.

[![NestJS](https://img.shields.io/badge/Built%20with-NestJS-red)](https://nestjs.com/)
[![License](https://img.shields.io/badge/license-MIT-blue)](LICENSE)

## 📖 Sobre o Projeto

Cansado de criar APIs de "To-Do List", este projeto é um experimento de **Stateful Backend**. Diferente de uma API REST tradicional que apenas reage a chamadas, o **Chaos Pet** possui um ciclo de vida interno independente do usuário.

Utilizando **Task Scheduling** e **WebSockets**, o bichinho virtual existe dentro da memória/banco do servidor. O tempo passa para ele. A fome aumenta. A felicidade cai. Se o servidor estiver rodando, ele está vivendo (e morrendo).

## 🚀 Mecânicas & Desafios Técnicos

O objetivo deste código não é apenas salvar dados, mas gerenciar **Entropia**.

### 1. O Motor de Entropia (Cron Jobs)
Utilizando `@nestjs/schedule`, um "Heartbeat" roda a cada 10 segundos no servidor.
- **Fome:** +2 a cada tick.
- **Energia:** -1 a cada tick.
- **Higiene:** -1 a cada tick (probabilístico).
- **Consequência:** Se qualquer status vital chegar a 0, o evento `DEATH` é disparado e persistido no banco.

### 2. Bloqueio de Interação (Custom Guards)
Você não pode brincar com um pet que está dormindo.
- Implementação de um `IsAwakeGuard` que intercepta requisições.
- Se o status for `SLEEPING`, todas as rotas de interação (`/play`, `/feed`) retornam `403 Forbidden`.

### 3. Comunicação em Tempo Real (Gateways)
O front-end não precisa perguntar se o pet está com fome. O servidor **grita**.
- Uso de `Socket.io` para emitir eventos de `CRITICAL_STATUS`.
- O servidor notifica ativamente quando o pet morre ou adoece.

## 🛠️ Tech Stack

* **Core:** NestJS (Node.js)
* **Scheduling:** `@nestjs/schedule` (Cron)
* **Realtime:** `@nestjs/platform-socket.io`
* **Database:** PostgreSQL (via TypeORM ) - *Para persistência rápida.*
* **Validation:** `class-validator` (Para garantir que você não dê veneno ao pet).

## 🎲 Rotas Principais (Game Loop)

| Método | Rota | Descrição |
| :--- | :--- | :--- |
| `GET` | `/status` | Retorna os stats atuais (HP, Fome, Energia). |
| `POST` | `/interact/feed` | Diminui a fome. Custo: Dinheiro (Simulado). |
| `POST` | `/interact/play` | Aumenta felicidade. Custo: Energia do Pet. |
| `POST` | `/interact/sleep` | Coloca o pet para dormir (Recupera energia, trava ações). |
| `POST` | `/revive` | **Hard Reset**. Custa todos os seus pontos acumulados. |

## 📦 Como Rodar

1.  Clone o repositório:
    ```bash
    git clone [https://github.com/seu-usuario/nestjs-chaos-pet.git](https://github.com/seu-usuario/nestjs-chaos-pet.git)
    ```
2.  Instale as dependências:
    ```bash
    pnpm install
    ```
3.  Inicie o caos:
    ```bash
    pnpm start:dev
    ```
4.  Fique de olho no terminal. Os logs dirão se seu pet está sofrendo.

## 🔮 Roadmap de Funcionalidades (Ideias Futuras)

- [ ] **Sistema de Doenças:** Um Cron Job aleatório que infecta o pet. O usuário precisa descobrir a "cura" (payload específico) nos logs.
- [ ] **Ghost Mode:** Se o pet morrer, o WebSocket continua enviando mensagens assustadoras aleatórias.
- [ ] **Multi-Tenancy:** Poder criar vários pets no mesmo servidor e fazê-los interagir (batalha ou reprodução).
