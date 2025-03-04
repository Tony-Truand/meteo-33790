# Météo 33790

La météo de vos endroits préférés.

Ce repo à pour but d'initier à react-router, tailwind, vite, prisma

Le but, chaque utilisateur est idéntifié de manière unique, a l'aide d'un formulaire il peut recherche un endroit dans le monde, l'ajouter à sa liste de préférence, et le serveur ira proposer la météo de ses endroits préférés, toutes les heures.


```bash 
## Installation des packages (seulement après changements) / Mise à jour de la base de donnée (et création)
npm run i 
npm run db:deploy 

## Lancement du serveur
npm run dev

## Après changement du modèle de donnée (https://www.prisma.io/docs/orm/prisma-schema/overview)
## Génération du fichier de migration (et regénération des modele typescript BDD)
npm run db:mig

## Regénération des modele typescript BDD
npm run db:gen

```


