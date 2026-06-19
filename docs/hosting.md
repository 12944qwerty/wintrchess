# 🏗️ Hosting WintrChess locally

> This is a guide on how to get WintrChess running on your local machine.

WintrChess is designed to be self-hosted with no external dependencies - no
database, no third-party accounts, no API keys. Clone it, install, build,
and run.

## Prerequisites

- Git
- Node.js 22 or later
- Docker, if you want to host with that

## Setup

### Clone the repository

```sh
git clone https://github.com/wintrcat/wintrchess.git

# Go to the directory
cd wintrchess
```

### Set environment variables

These are the environment variables that you can set when hosting WintrChess.
All of them are optional.

```toml
NODE_ENV="production"
```

The environment that the app is running in. Can be one of two values: `production` (default) and `development`.

```toml
PORT=8080
```

The port that the backend server listens on. Defaults to `8080`.

```toml
EMAIL_ACCOUNT="contact@wintrchess.com"
```

The email address displayed as the contact address in the Terms of Service and Privacy Policy pages.

## Deploy manually

### Install dependencies

```sh
npm install
```

### Build the app

```sh
npm run build
```

You can also compile individual workspaces if you want with the `-w` flag:

```sh
npm run build -w client
npm run build -w server
npm run build -w shared
```

### Start the server

```sh
npm start
```

The server will begin listening on the port that you defined in the environment variables, or `8080` if you have not defined one.

## Deploy with Docker

You might find it easier to run WintrChess in a Docker container.

### Build and start

```sh
docker compose up
```
