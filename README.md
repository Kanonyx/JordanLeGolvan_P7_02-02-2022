### Prérequis

Dans une console Node.js (ou directement avec la console de Visual Studio Code)
1. Accéder au dossier back-end :
   ```sh
   npm install
   ```
2. Accéder au dossier front-end :
   ```sh
   npm install
   ```

### Installation

Une fois Node.js correctement installé (dans le dossier front, mais aussi dans le dossier back). Vous aurez besoin de lancer les serveurs grâce aux commandes suivantes :

1. Créer une base de donnée avec le nom groupomania
   ```sh
   CREATE DATABASE groupomania;
   ```
2. Créer un fichier .env dans le dossier back
   ```js
   JWT_TOKEN=SECRET-KEY
   ```
3. Créer un fichier db.config.json dans le dossier back
   ```json
   {
      "development": {
         "host": "host_name",
         "database": "database_name",
         "username": "username",
         "password": "password",
         "dialect": "mysql"
      }
   }
   ```
4. Lancer le serveur back-end
   ```sh
   nodemon server
   ```
5. Lancer le serveur front-end
   ```sh
   npm run serve
   ```