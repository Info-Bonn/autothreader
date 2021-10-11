# auto-threader

A bot that automatically opens a new thread for every message in a channel.

## Installation and Usage

### Installation

You can either:

- use the prebuilt docker-images on the [Dockerhub](https://hub.docker.com/r/knniff/redditbot) or built it yourself with the Dockerfile in this repo and start the bot with the [docker-compose.yml](https://github.com/Info-Bonn/autothreader/blob/main/docker-compose.yml.example) in this repository

- just run the [index.js](https://github.com/Info-Bonn/autothreader/blob/main/index.js) with node directly

For both options you need a running mongodb instance and set the environment variables set either directly with for example docker-compose or in the [.env](https://github.com/Info-Bonn/autothreader/blob/main/.env.example) file.

### The needed environment variables are

- TOKEN: this is the bot-token that you copy from the discord developer-portal
- CLIENTID: the id of the created bot, right-click on the bot in discord with developer mode enabled and then press "Copy ID"
- GUILDID: if you want your commands to only be valid on a specific server then copy the put the id here, right-click on the server in discord with developer mode enabled and then press "Copy ID", if not present then the commands will work everywhere
- DBCONNECT: the connection string for your mongodb instance

After that execute the [deploy-commands.js](https://github.com/Info-Bonn/autothreader/blob/main/src/deploy-commands.js) script with node either directly in youre shell or inside of the docker-container with "docker exec -it mycontainer node /usr/src/app/src/deploy-commands.js".

### Usage

- /enable
  > enables autothreading in the channel where the command is used
- /disable
  > disables autothreading in the channel where the command is used
- /listchannels
  > lists all autothreading channels on the server

## Requirements

- a standard mongodb instance
- run deploy-commands.js once
- a registered discord application

> Made by [Knniff](https://github.com/Knniff) under the MIT-License.
