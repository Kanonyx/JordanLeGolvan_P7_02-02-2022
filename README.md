# JordanLeGolvan_P7_02-02-2022

À propos :
Projet 7 de la formation OpenClassrooms



# JordanLeGolvan_P7_02-02-2022

À propos :
Projet 7 de la formation OpenClassrooms



Prérequis
NodeJs, VSCode, MySQL

INSTALLATION:
Dans le dossier back-end via VSCode :
npm install


Créer une base de donnée avec le nom groupomania via la console MySQL
CREATE DATABASE groupomania;

Créez un fichier .env dans le dossier back
JWT_TOKEN=SECRET-KEY

Créez un fichier db.config.json dans le dossier back
{
   "development": {
      "host": "host_name",
      "database": "VotreDatabase_name",
      "username": "VotreSqlUername",
      "password": "VotreSqlPassword",
      "dialect": "mysql"
   }
}
Dans serveur back-end
npm run server
___________________________________________________
Dans le dossier front-end :
npm install
puis
npm run serve

Compiles and minifies for production
npm run build

Lints and fixes files
npm run lint