# Requirements

- nodeJS
- docker

# Installation

- Docker-compose up --build
- Create your secret.key fil in src/config
- Create your config.[development].js file
- Fill your config file based on the config.development.example.js file (I use sendGrid for mails)
- Create your index.json database config file in api/database/config
- Fill your index.json config file based on api/database/config/index.example.json
- Run yarn && yarn start
