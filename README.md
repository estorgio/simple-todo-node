# Simple TODO

A simple TODO app made with Express.

## Live demo

- [https://simple-todo-node-dot-estorgio-demo.uw.r.appspot.com](https://simple-todo-node-dot-estorgio-demo.uw.r.appspot.com)
- [https://simple-todo-node.onrender.com](https://simple-todo-node.onrender.com)

## Running the app

### Local

```bash
# Install dependencies
$ npm install

# Configure settings
$ cp .env-example .env
$ nano .env

# Launch app
$ npm run dev
```

### Google App Engine (GAE)

```bash
# Configure App Engine settings
$ cp app.yaml-example app.yaml
$ nano app.yaml

# Deploy to GAE
$ gcloud app init
$ gcloud app create
$ gcloud app deploy

# Open in browser
$ gcloud app browse -s simple-todo
```
