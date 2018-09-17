# Requirements

- nodeJS
- docker

# Installation

- Docker-compose up --build
- Create your secret.key fil in src/config
- Create your config.[development, production].js file
- Fill your config file based on the config.example.js file. (I use sendGrid for mail)
- Run yarn && NODE=[development, production] yarn start
