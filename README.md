# AI Chatbot

A minimal full-stack chatbot: an Express backend that calls the Anthropic API, and a
plain HTML/CSS/JS frontend.

## Features
- Clean chat UI with streaming-style "thinking" indicator
- Conversation history kept client-side 
- Configurable system prompt (bot personality) via `.env`
- Ready to deploy anywhere Node.js runs

## Project structure
```
ai-chatbot/
├── server.js          # Express server + /api/chat endpoint
├── package.json
├── .env.example        # Copy to .env and add your API key
├── .gitignore
└── public/
    ├── index.html      # Chat UI markup
    ├── style.css        # Styling
    └── script.js        # Frontend chat logic (fetch calls to /api/chat)
```

## 1. Local setup

```bash
git clone <your-repo-url>
cd ai-chatbot
npm install
cp .env.example .env
```

Open `.env` and add your Anthropic API key (get one at
https://console.anthropic.com/settings/keys):

```
ANTHROPIC_API_KEY=sk-ant-...
```

Run it:

```bash
npm start
```

Visit **http://localhost:3000**.

For auto-restart on file changes during development:
```bash
npm run dev
```

## 2. Customize your bot
Edit `SYSTEM_PROMPT` in `.env` to change the bot's personality, e.g.:
```
SYSTEM_PROMPT=You are a sarcastic pirate who answers every question reluctantly.
```

To change the model, edit the `model` field in `server.js`.

## 3. Deploying (optional)
This runs on any Node host (Render, Railway, Fly.io, a VPS, etc.). Set the
`ANTHROPIC_API_KEY` environment variable in your host's dashboard — same as `.env`,
just configured through their UI instead of a file.

## License
MIT 
