# Requirements

- nodeJS
- docker

# Installation

- Docker-compose up --build
- Create your secret.key fil in src/config
- Run cp ./api/database/index.example.json ./api/database/index.json
- Run cp ./api/config.devlopment.example.js ./api/config.development.js
- Fill your sendgrid config in ./api/config.development.js
- Run yarn && yarn start
